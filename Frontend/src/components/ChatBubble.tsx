import React from 'react'
import ChatBubbleProps from '../types/ChatBubbleProps.types'
import SongList from './SongList'


const ChatBubble: React.FC<ChatBubbleProps> = ({ bot, message, songs }: ChatBubbleProps) => {
  console.log("FROM CHATBUBBLE ==>> ", songs)
  return (
    <>
      {bot ? (<div className='flex justify-start'>
        <div >
          <div className='bg-gray-300 p-2 rounded-lg m-2 text-wrap:wrap'>
          {message}
          </div>
          <SongList songs={songs || []} />
        </div>
      </div>)
        :
        (<div className='flex justify-end  '>
          <div className='bg-blue-300 p-2 rounded-lg m-2 text-wrap:wrap'>
            {message}
          </div>
        </div>)
      }
    </>
  )
}

export default ChatBubble