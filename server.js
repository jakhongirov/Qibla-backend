require('dotenv').config()
const express = require("express");
// const http = require('http');
const cors = require("cors");
const path = require('path')
const fs = require('fs');
const app = express();
// const server = http.createServer(app);
const { PORT } = require("./src/config");
const router = require("./src/modules");
const socket = require('./src/lib/socket')

const publicFolderPath = path.join(__dirname, 'public');
const imagesFolderPath = path.join(publicFolderPath, 'images');

if (!fs.existsSync(publicFolderPath)) {
   fs.mkdirSync(publicFolderPath);
   console.log('Public folder created successfully.');
} else {
   console.log('Public folder already exists.');
}

if (!fs.existsSync(imagesFolderPath)) {
   fs.mkdirSync(imagesFolderPath);
   console.log('Images folder created successfully.');
} else {
   console.log('Images folder already exists within the public folder.');
}

app.use(cors({ origin: "*" }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.resolve(__dirname, 'public')))
app.use('/files', express.static(path.resolve(__dirname, 'files')))
app.use("/api/v1", router);


server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});

const io = socket.initializeSocket(server);