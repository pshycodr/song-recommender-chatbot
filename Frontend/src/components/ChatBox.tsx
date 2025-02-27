import React from 'react'
import ChatBubble from './ChatBubble'
import InputBox from './InputBox'
import { useRecoilValue } from 'recoil'
import { chatAtom } from '../store/atom/chatAtom'
import Loading from './Loading'
import { LoadingAtom } from '../store/atom/LoadingAtom'

const ChatBox: React.FC = () => {

  const messages = useRecoilValue(chatAtom)
  const loading = useRecoilValue(LoadingAtom)
  console.log("FROM CHATBOX ===> ", messages)
  console.log("FROM CHATBOX LOADING ===> ", loading)

  return (
    <>
      <div className='w-1/2 flex flex-col items-center justify-center'>
        <div className='h-full w-full border border-white flex flex-col justify-start overflow-y-auto '>
          {
           loading ? <Loading/> : messages.map((message, index) => (
              <ChatBubble bot={message.bot} message={message.message} key={index} songs={message.songs}/>
            ))
          }
        </div>

        <div className='w-full m-5'>
          <InputBox />
        </div>
      </div>

    </>
  )
}

export default ChatBox