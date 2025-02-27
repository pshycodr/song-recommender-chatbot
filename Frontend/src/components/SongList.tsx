import React from 'react'
import SongProps from '../types/SongProps.types'


const SongList: React.FC<{ songs: SongProps[]}> = ({ songs }) => {
    console.log("FROM SONGLIST ===> ", songs)
  return (
    <div>
        {songs.length ? <div className='bg-gray-300 p-2 rounded-lg m-2 text-wrap:wrap '>
            <ol>
            {songs.map((song, index) => (
                <li 
                className='m-1 font-semibold transition hover:scale-105 hover:text-rose-900 transform duration-200 ease-in-out'
                key={index}>"{song.name}" - <span className='font-normal'>{song.artist}</span></li>
            ))}
            </ol>

        </div> : ""}
    </div>
  )
}

export default SongList