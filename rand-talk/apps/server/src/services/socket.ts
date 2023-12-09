import { Server } from "socket.io";

class SocketService{
    private _io:Server; //class instance varaible
    constructor(){
        console.log("INIT socket server")
        this._io = new Server(); //intilaised a socket io server
    }

    get io(){
        return this._io; //getter fucntoin to ge tthe fucntion
    }

}

export default SocketService