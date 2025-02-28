import React from 'react';
import ChatBubbleProps from '../types/ChatBubbleProps.types';
import SongList from './SongList';
import PageLink from './PageLink';

const ChatBubble: React.FC<ChatBubbleProps> = ({ bot, message, songs, pageLink, text }) => {
  return (
    <>
      {bot ? (
        <div className="flex justify-start">
          <div>
            <div className="bg-spotify-green font-metropolis max-w-md p-3 rounded-lg m-2 text-wrap:wrap text-spotify-dark">
              {message}
            </div>

            {songs && <SongList songs={songs} />}

            {pageLink && <PageLink pageLink={pageLink}  text={text || ""} />}

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