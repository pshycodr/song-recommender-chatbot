import React from 'react';
import { ChatResponse } from '../types';
import { FaMusic } from 'react-icons/fa';

interface Props {
  response: ChatResponse;
}

const SongSuggestions: React.FC<Props> = ({ response }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mt-4">
    {response.suggestions.length === 0 ? (
      <p className="text-gray-500 italic">No suggestions available. 🎧</p>
    ) : (
      <ul className="space-y-2">
        {response.suggestions.map((song, idx) => (
          <li
            key={idx}
            className="flex items-center bg-gray-100 rounded-lg p-2 hover:bg-gray-200 transition"
          >
            <FaMusic className="text-blue-500 mr-2" />
            <div>
              <p className="font-medium text-gray-800">{song.title}</p>
              <p className="text-sm text-gray-600">by {song.artist}</p>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default SongSuggestions;
