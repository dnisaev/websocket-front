import { useState } from 'react'

export function App() {
  const [messages, setMessages] = useState([
    { id: '1', message: 'hello!', user: { id: '1', name: 'dnisaev' } },
    { id: '2', message: 'everybody!', user: { id: '1', name: 'dnisaev' } },
    { id: '3', message: 'hi!', user: { id: '2', name: 'comrus' } },
  ])

  function handleClick() {
    setMessages([...messages, { id: '3', message: 'ok!', user: { id: '2', name: 'comrus' } }])
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
