import React from 'react';
import SongProps from '../types/SongProps.types';

const SongList: React.FC<{ songs: SongProps[] }> = ({ songs }) => {
  return (
    <div>
      {songs && (
        <div className="bg-spotify-green bg-opacity-20 p-4 rounded-lg m-2 text-wrap:wrap border border-spotify-green">
          <ol>
            {songs.map((song, index) => (
              <li
                className="m-2 p-2 bg-spotify-dark rounded-lg text-spotify-light font-semibold transition hover:scale-105 hover:bg-spotify-green hover:text-spotify-dark transform duration-200 ease-in-out cursor-pointer"
                key={index}
              >
                "{song.name}" - <span className="font-normal">{song.artist}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default SongList;