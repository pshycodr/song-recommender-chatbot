import axios from 'axios'
import React, { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { chatAtom } from '../store/atom/chatAtom'
import { LoadingAtom } from '../store/atom/LoadingAtom'

const InputBox: React.FC = () => {

  const [message, setMessage] = useState('')
  const [chat, setChat] = useRecoilState(chatAtom)
  const setLoading = useSetRecoilState(LoadingAtom)

  const handleSend = async () => {
    if (message === '') return alert('Please enter a message')
    setLoading(true)
    setChat(prevChat => [...prevChat, { bot: false, message }])

    try {
      const response = await axios.post('http://localhost:3000/api/client/user-query/', { message })


      console.log(response.data['search_song'])

      if (response.data['search_song']) {
        setChat(prevChat => [...prevChat, { bot: true, message: response.data.message, songs: response.data.songs }])
      } else{
        setChat(prevChat => [...prevChat, { bot: true, message: response.data.message }])
      }

      setMessage('')
      setLoading(false)

      console.log("INPUTBOX ===>> ", response.data)  
      console.log(chat)

    } catch (error) {
      console.error('Failed to fetch response:', error)
      alert('Failed to get response from the server')
    }
  }

  return (
    <div>
      <div className='flex justify-center w-full'>
        <input
          type="text"
          className='w-full p-2 mx-2 rounded-lg'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type='submit'
          className='bg-blue-300  p-2 rounded-lg mx-2'
          onClick={handleSend}

        >Send </button>
      </div>
    </div>
  )
}

export default InputBox