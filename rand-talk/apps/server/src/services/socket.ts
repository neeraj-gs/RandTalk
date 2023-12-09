import { Server } from "socket.io";

class SocketService{
    private _io:Server; //class instance varaible
    constructor(){
        console.log("INIT socket server")
        this._io = new Server({
            cors:{
                allowedHeaders:["*"],
                origin:"*"
            }
        }); //intilaised a socket io server
    }

    public initListeners(){
        //all event listeners or users are initlised 
        const io = this.io;
        console.log("Initiliased Socket Listeners")
        io.on('connect',socket=>{
            console.log("New Socket conencted",socket.id)

            //on this socket , we can setup event listeniners
            socket.on('event:message',async ({message}:{message:string})=>{
                console.log("New Message Recieved",message)
            })

        })
    }

    get io(){
        return this._io; //getter fucntoin to ge tthe fucntion
    }

}

export default SocketService