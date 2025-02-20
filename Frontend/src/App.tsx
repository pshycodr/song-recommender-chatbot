import React from 'react';
import {ChatBox} from './components/ChatBox';

const App: React.FC = () => (
  <div className="flex flex-col items-center">
    <h1 className='font-bold text-4xl m-3'>🎼 Song Recommender Chatbot</h1>
    <ChatBox />
  </div>
);

export default App;
