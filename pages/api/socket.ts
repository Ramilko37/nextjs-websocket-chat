import { NextApiRequest } from "next";
import NextApiResponseServerIO from "../../types/next";
import { Server as ServerIO, Socket } from "socket.io";
import { Server as NetServer } from "http";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handleConnection = (socket: Socket) => {
  console.log("A user has connected!");

  // handle disconnection
  socket.on("disconnect", () => {
    console.log("A user has disconnected!");
  });

  // handle incoming message
  socket.on("chat:message", (data) => {
    console.log("New message:", data);
    socket.broadcast.emit("chat:message", data);
  });
};

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socket",
    });
    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
    // handle new connections
    io.on("connection", handleConnection);
  } else {
    // handle new connections
    res.socket.server.io.on("connection", handleConnection);
  }
  res.end();
};
