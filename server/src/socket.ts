import { Server,Socket } from "socket.io";

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
        console.log('The socket connected..',socket.id);
        
        socket.on("disconnect", () => {
            console.log("A user disconnected:", socket.id);
          });
        
      });
}