import React from 'react';
import ChatBubbleProps from '../types/ChatBubbleProps.types';
import SongList from './SongList';
import PlaylistLink from './PlaylistLink';

const ChatBubble: React.FC<ChatBubbleProps> = ({ bot, message, songs, playlist_link }) => {
  return (
    <>
      {bot ? (
        <div className="flex justify-start">
          <div>
            <div className="bg-spotify-green font-metropolis max-w-md p-3 rounded-lg m-2 text-wrap:wrap text-spotify-dark">
              {message}
            </div>

            {songs && <SongList songs={songs} />}

            {playlist_link && <PlaylistLink playlist_link={playlist_link} />}

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