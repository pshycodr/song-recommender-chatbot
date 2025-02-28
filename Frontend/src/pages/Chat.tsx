import React, { useEffect } from 'react'
import ChatBox from '../components/ChatBox'
import axios from 'axios'

const Chat: React.FC = () => {

  useEffect(() => {
    const getSession = async () => {
      const response = await axios.get('http://localhost:3000/csrf/', { withCredentials: true });
      const csrfToken = response.data.csrfToken;
  
      axios.defaults.headers.post['X-CSRFToken'] = csrfToken;
    }

    getSession()
  }, [])

    return (
      //  <div className='h-screen w-scren  flex justify-center'>
         <ChatBox />
      //  </div>
    )
}

export default Chat