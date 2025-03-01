import axios from 'axios';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { chatAtom } from '../store/atom/chatAtom';
import { LoadingAtom } from '../store/atom/LoadingAtom';
import { BACKEND_URL } from '../config';

const InputBox: React.FC = () => {
  const [message, setMessage] = useState('');
  const [disableButton, setDisableButton] = useState(false)
  const setChat = useSetRecoilState(chatAtom);
  const setLoading = useSetRecoilState(LoadingAtom);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDisableButton(true)
    setMessage('');
    if (message === '') {
      setDisableButton(false)
      return alert('Please enter a message')
    };

    setLoading(true);
    setChat((prevChat) => [...prevChat, { bot: false, message }]);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/client/user-query/`,
        { message },
        { withCredentials: true }
      );

      console.log(response.data);


      if (response.data['error']) {
        setChat((prevChat) => [
          ...prevChat,
          { bot: true, message: response.data.message, songs: response.data.songs, pageLink: 'http://localhost:5173/auth', text: "Signin Here" },
        ]);
      } else if (response.data['search_song']) {
        setChat((prevChat) => [
          ...prevChat,
          { bot: true, message: response.data.message, songs: response.data.songs },
        ]);
      } else if (response.data['create_album']) {
        setChat((prevChat) => [
          ...prevChat,
          { bot: true, message: response.data.message, songs: response.data.songs, pageLink: response.data.playlist.playlist_link, text: "🎵 Open Playlist on Spotify" },
        ]);
      } else {
        setChat((prevChat) => [
          ...prevChat,
          { bot: true, message: response.data.message },
        ]);
      }


      setDisableButton(false)
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch response:', error);
      alert('Failed to get response from the server');
    }
  };

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
        <div className="flex justify-center w-full">
          <input
            type="text"
            className="w-full p-3 mx-2 rounded-lg font-semibold bg-spotify-light text-spotify-dark placeholder-spotify-dark"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className={` p-3 rounded-lg mx-2 bg-spotify-green text-spotify-dark hover:bg-spotify-light transition-all ${disableButton ? "cursor-not-allowed opacity-50" : "cursor-pointer"}  `}
            disabled={disableButton}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputBox;