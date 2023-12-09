'use client'

import { useState } from "react";
import { useSocket } from "../context/SocketProvider"

export default function Page(){

  const {sendMsg} = useSocket();
  const [msg,setMsg] = useState('')

  return(
    <div>
      <div>
        <h1>All Messages</h1>
      </div>
      <div>
        <input onChange={e=>setMsg(e.target.value)} type="text" placeholder="Enter Message Here.." />
        <button onClick={e => sendMsg(msg)}>Send</button>
      </div>
    </div>
  )
}