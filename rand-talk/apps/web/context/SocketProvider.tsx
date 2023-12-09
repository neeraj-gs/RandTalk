'use client'

//frontend 
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {io,Socket} from 'socket.io-client'
// import { Socket } from 'socket.io-client/debug';

//as it is mounted tries to connect a socket connection
interface SocketProviderProps {
    children?:React.ReactNode
}


interface ISocketContext {
    sendMsg: (msg:string) => any;
    messages:string[]
}


const SocketContext=React.createContext<ISocketContext | null>((null));


export const useSocket = () =>{
    const state = useContext(SocketContext)
    if(!state) throw new Error(`state is undefined`)

    return state;
}


export const SocketProvider: React.FC<SocketProviderProps> = ({children})=>{

    const [socket,setSocket] = useState<Socket>()
    const [messages,setMessages] = useState<string[]>([])

    const sendMsg: ISocketContext['sendMsg'] = useCallback((msg)=>{
        console.log("SEND MESSage",msg)
        if(socket){
            socket.emit("event:message",{message:msg})
        }
    },[socket])


    const onMessageRec = useCallback((msg:string)=>{
        console.log("Recviedved Message from Server",msg)
        const {message} = JSON.parse(msg) as {message: string};
        setMessages((prev) => [...prev,message])
    },[])

    useEffect(()=>{
        const _socket = io('http://localhost:8000'); //helps in connecteion
        _socket.on('message',onMessageRec)
        setSocket(_socket)

        return ()=>{ //cleaer fucnoitn si returned
            _socket.disconnect();
            _socket.off('message',onMessageRec)
            setSocket(undefined)
        };
    },[])


    return(
        <SocketContext.Provider value={{sendMsg,messages}}>
            {children}
        </SocketContext.Provider>
    )
}


