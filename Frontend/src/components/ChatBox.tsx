import React from 'react';
import ChatBubble from './ChatBubble';
import InputBox from './InputBox';
import { useRecoilValue } from 'recoil';
import { chatAtom } from '../store/atom/chatAtom';
import Loading from './Loading';
import { LoadingAtom } from '../store/atom/LoadingAtom';

const ChatBox: React.FC = () => {
  const messages = useRecoilValue(chatAtom);
  const loading = useRecoilValue(LoadingAtom);

  return (
    <div className="relative min-h-screen flex justify-center items-center overflow-hidden bg-black ">
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/assets/chat-bg.jpg"
          alt="Chat Background"
          className="w-full h-full object-cover blur-md"
        />
      </div>
      <div className="absolute inset-0  bg-gray-500 opacity-10"></div>

      <div className="relative z-10  w-full max-w-4xl h-[90vh] flex flex-col items-center justify-between bg-spotify-dark bg-opacity-20 backdrop-blur-lg  rounded-lg shadow-2xl overflow-hidden ">
        <div className="w-full h-full p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-spotify-green scrollbar-track-spotify-dark">
          { messages.map((message, index) => (
              <ChatBubble
                bot={message.bot}
                message={message.message}
                key={index}
                songs={message.songs}
                pageLink={message.pageLink}
                text={message.text}
              />
            ))}
            {loading && <Loading />}

        </div>

        <div className="w-full p-4 bg-spotify-dark  border-t border-spotify-green">
          <InputBox />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;