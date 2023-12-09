import http from 'http'
import SocketService from './services/socket';

async function init(){


    const socketService = new SocketService();

    const httpServer = http.createServer();
    const PORT = process.env.PORT ? process.env.PORT:  8000

    socketService.io.attach(httpServer) //integrated socket io with our server and a socket server is created

    httpServer.listen(PORT,()=>{
        console.log(`Http server started at http://localhost:${PORT}`)
    });
}

init();