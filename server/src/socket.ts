import { Server,Socket } from "socket.io";
import prisma from "./config/db.config.js";
import { produceMessage } from "./helper.js";

interface CustomSocket extends Socket {
    room?: string;
  }


export function setupSocket(io:Server){
    io.use((socket: CustomSocket, next) => {
        const room = socket.handshake.auth.room || socket.handshake.headers.room;
        if (!room) {
          return next(new Error("Invalid room"));
        }
        socket.room = room;
        next();
      });

    io.on('connection', (socket: CustomSocket) => {
      // * Join the room
       socket.join(socket.room);
        console.log('The socket connected..',socket.id);

        socket.on("message", async(data) => {
          console.log('====================================');
          console.log("server side message",data);
          console.log('====================================');
          try {
            await produceMessage("chats", data);
          } catch (error) {
            console.log("The kafka produce error is", error);
          }
          socket.to(socket.room).emit("message", data);
        })
        
        socket.on("disconnect", () => {
            console.log("A user disconnected:", socket.id);
          });
        
      });
}