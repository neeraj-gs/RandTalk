import { Server } from "socket.io";
import {Redis} from 'ioredis'


const pub = new Redis({

    host:process.env.REDIS_HOST,
    port:23394,
    username:process.env.REDIS_USERNAME,
    password:process.env.REDIS_PASSWORD
});
const sub = new Redis({
    host:process.env.REDIS_HOST,
    port:23394,
    username:process.env.REDIS_USERNAME,
    password:process.env.REDIS_PASSWORD
});


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


        sub.subscribe('MESSAGES')
    }

    public initListeners(){
        //all event listeners or users are initlised 
        const io = this.io;
        console.log("Initiliased Socket Listeners")
        io.on('connect',socket=>{
            console.log("New Socket conencted",socket.id)

            //on this socket , we can setup event listeniners
            socket.on("event:message",async ({message}:{message:string})=>{
                console.log("New Message Recieved",message)
                //as we recieve a messge to server , we need to publish on redis so taht all users ge tthe messagae

                await pub.publish('MESSAGES',JSON.stringify({message}))
                //user ends msg to server, server sends to redis and tehn for multple servers , taht server pullst hte msg and send to all servers


            })

        })

        sub.on('message',(channel,message)=>{
            if(channel === 'MESSAGES'){
                console.log("New Message Broadcast From Redis",message)
                io.emit('message',message);
            }
        })

        
    }

    get io(){
        return this._io; //getter fucntoin to ge tthe fucntion
    }

}

export default SocketService