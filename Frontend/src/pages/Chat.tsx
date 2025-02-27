import React from 'react'
import ChatBox from '../components/ChatBox'

const Chat: React.FC = () => {
    return (
       <div className='h-screen w-scren bg-slate-700 p-3  flex justify-center'>
         <ChatBox />
       </div>
    )
}

export default Chat