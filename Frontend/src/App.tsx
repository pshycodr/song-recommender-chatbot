import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chat from './pages/Chat'
import Auth from './pages/Auth'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth/>} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App