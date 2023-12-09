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
}


const SocketContext=React.createContext<ISocketContext | null>((null));


export const useSocket = () =>{
    const state = useContext(SocketContext)
    if(!state) throw new Error(`state is undefined`)

    return state;
}


export const SocketProvider: React.FC<SocketProviderProps> = ({children})=>{

    const [socket,setSocket] = useState<Socket>()

    const sendMsg: ISocketContext['sendMsg'] = useCallback((msg)=>{
        console.log("SEND MESSage",msg)
        if(socket){
            socket.emit("event:message",{message:msg})
        }
    },[])

    useEffect(()=>{
        const _socket = io('http://localhost:8000') //helps in connecteion
        setSocket(_socket)

        return ()=>{ //cleaer fucnoitn si returned
            _socket.disconnect();
            setSocket(undefined)
        };
    },[])


    return(
        <SocketContext.Provider value={{sendMsg}}>
            {children}
        </SocketContext.Provider>
    )
}


