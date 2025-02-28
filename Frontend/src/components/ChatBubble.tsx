import React from 'react';
import ChatBubbleProps from '../types/ChatBubbleProps.types';
import SongList from './SongList';

const ChatBubble: React.FC<ChatBubbleProps> = ({ bot, message, songs }) => {
  return (
    <>
      {bot ? (
        <div className="flex justify-start">
          <div>
            <div className="bg-spotify-green p-3 rounded-lg m-2 text-wrap:wrap text-spotify-dark">
              {message}
            </div>
            <SongList songs={songs || []} />
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <div className="bg-spotify-light p-3 rounded-lg m-2 text-wrap:wrap text-spotify-dark">
            {message}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBubble;