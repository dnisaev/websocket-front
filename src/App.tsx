import { ChangeEvent, useEffect, useState } from 'react'

import { io } from 'socket.io-client'

const socket = io('http://localhost:3009/')

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
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Messages>([])

  const onClickHandler = () => {
    socket.emit('client-message-sent', message)
    setMessage('')
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.currentTarget.value)

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
        onChange={onChangeHandler}
        style={{ display: 'block' }}
        type={'text'}
        value={message}
      />
      <button onClick={onClickHandler}>Отправить</button>
    </>
  )
}
