'use client'

//frontend 
import React, { useCallback, useContext, useEffect } from 'react'
import {io} from 'socket.io-client'

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


