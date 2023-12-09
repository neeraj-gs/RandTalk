'use client'

//frontend 
import React, { useCallback, useEffect } from 'react'
import {io} from 'socket.io-client'

interface SocketProviderProps {
    children?:React.ReactNode
}


interface ISocketContext {
    sendMsg: (msg:string) => any;
}


const SocketContext=React.createContext<ISocketContext | null>((null));

export const SocketProvider: React.FC<SocketProviderProps> = ({children})=>{

    const sendMsg: ISocketContext['sendMsg'] = useCallback((msg)=>{
        console.log("SEND MESSage")
    },[])

    useEffect(()=>{
        const _socket = io('http://localhost:8000') //helps in connecteion

        return ()=>{ //cleaer fucnoitn si returned
            _socket.disconnect();
        };
    },[])


    return(
        <SocketContext.Provider value={{sendMsg}}>
            {children}
        </SocketContext.Provider>
    )
}


