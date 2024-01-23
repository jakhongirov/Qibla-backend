const socketIO = require('socket.io');
const { fetch } = require('./postgres')

let io;

function initializeSocket(server) {
   io = socketIO(server);

   io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('incrementZikrCount', async (zikr_id) => {
         const incrementZikrCountQuery = `
            UPDATE public_zikr
            SET zikr_current_count = zikr_current_count + 1
            WHERE zikr_id = $1
            RETURNING *;
         `;

         try {
            const updatedCount = await fetch(incrementZikrCountQuery, zikr_id);

            if (updatedCount?.zikr_count == updatedCount?.zikr_current_count) {
               const updateFinishingQuery = `
                  UPDATE public_zikr
                  SET zikr_finishing = true
                  WHERE zikr_id = $1
                  RETURNING *;
               `;

               await fetch(updateFinishingQuery, zikr_id);
            }
         } catch (error) {
            console.error('Error updating zikr count:', error);

         }
      });
   });


   return io;
}

function getIO() {
   if (!io) {
      throw new Error('Socket.io not initialized!');
   }
   return io;
}

module.exports = {
   initializeSocket,
   getIO,
};
