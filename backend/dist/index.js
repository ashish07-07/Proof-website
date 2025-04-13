"use strict";
// import express from 'express';
// import { createServer } from 'http';
// import { WebSocketServer, WebSocket } from 'ws';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// const server = createServer(app);
// const wss = new WebSocketServer({ server });
// interface ExtendedWebSocket extends WebSocket {
//   siteId?: string;
// }
// const activeUsers: Record<string, number> = {};
// wss.on('connection', (ws: ExtendedWebSocket, req) => {
//   const siteId = new URL(req.url || '', `http://${req.headers.host}`).searchParams.get('siteId');
//   if (!siteId) {
//     ws.close(1008, 'Missing siteId');
//     return;
//   }
//   ws.siteId = siteId;
//   activeUsers[siteId] = (activeUsers[siteId] || 0) + 1;
//   broadcastUserCount(siteId);
//   ws.on('close', () => {
//     if (ws.siteId && activeUsers[ws.siteId]) {
//       activeUsers[ws.siteId] = Math.max(activeUsers[ws.siteId] - 1, 0);
//       broadcastUserCount(ws.siteId);
//     }
//   });
// });
// function broadcastUserCount(siteId: string) {
//   const count = activeUsers[siteId] || 0;
//   const message = JSON.stringify({ event: 'update_user_count', siteId, count });
//   wss.clients.forEach((client) => {
//     const extClient = client as ExtendedWebSocket;
//     if (extClient.readyState === WebSocket.OPEN && extClient.siteId === siteId) {
//       extClient.send(message);
//     }
//   });
// }
// server.listen(8080, () => {
//   console.log('Server is running on port 8080');
// });
// import express from 'express'
// import { WebSocketServer, WebSocket } from 'ws';
// const app= express()
// const server = app.listen(8080,function()
// {
//     console.log('server listening on port 8080')
// })
// const wss= new WebSocketServer({server});
// wss.on('connection',function(socket)
// {
//       console.log("a client connected")
//       socket.send("welcome to my server dude")
//       socket.on("message",function (message:any)
//     {
//           console.log(`message recieved from the client${message}`);
//           console.log(`the siteid is ${message.siteId}`)
//     })
// })
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const server = app.listen(8080, function () {
    console.log(`server is listening on port 3000`);
});
const wss = new ws_1.WebSocketServer({ server });
wss.on('connection', function (socket) {
    console.log('A client connected to me');
    socket.on('message', function (message) {
        console.log(`the message i recieved is ${message}`);
        socket.send("Thank you for sending me a message bro");
    });
    socket.send("Thank you for connecting me bro");
});
