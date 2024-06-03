import { useState } from 'react'
import './App.css'

export function App() {
  const [messages, setMessages] = useState([
    { message: 'hello!', id: '1', user: { id: '1', name: 'dnisaev' } },
    { message: 'everybody!', id: '2', user: { id: '1', name: 'dnisaev' } },
    { message: 'hi!', id: '3', user: { id: '2', name: 'comrus' } },
  ])

  function handleClick() {
    setMessages([...messages, { message: 'ok!', id: '3', user: { id: '2', name: 'comrus' } }])
  }

  return (
    <>
      <div>
        {messages.map((m, index) => (
          <div key={index}>
            <b>{m.user.name}:</b> {m.message}
            <hr />
          </div>
        ))}
      </div>
      <textarea style={{ display: 'block' }}></textarea>
      <button onClick={handleClick}>Отправить</button>
    </>
  )
}
