import { useEffect, useState } from 'react'

import { io } from 'socket.io-client'

// const socket = io('http://localhost:3009/')
const socket = io('https://websocket-back-dnisaev.amvera.io/')

type User = {
  id: string
  name: string
}
type Message = {
  id: string
  message: string
  user: User
}
type Messages = Message[]

export function App() {
  const [message, setMessage] = useState<string>('')
  const [name, setName] = useState<string>('')

  const [messages, setMessages] = useState<Messages>([])

  useEffect(() => {
    socket.on('init-messages-published', (messages: Messages) => setMessages(messages))
    socket.on('new-message-sent', (message: Message) => setMessages(() => [...messages, message]))
  }, [messages])

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
      <input
        onChange={e => setName(e.currentTarget.value)}
        placeholder={'Введите имя'}
        type={'text'}
        value={name}
      />
      <button onClick={() => socket.emit('client-name-sent', name)}>Отправить</button>
      <br />
      <input
        onChange={e => setMessage(e.currentTarget.value)}
        placeholder={'Введите сообщение'}
        value={message}
      ></input>
      <button
        onClick={() => {
          socket.emit('client-message-sent', message)
          setMessage('')
        }}
      >
        Отправить
      </button>
    </>
  )
}
