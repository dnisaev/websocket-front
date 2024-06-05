import { useCallback, useEffect, useState } from 'react'

import { Chat } from '@/components/Chat/Chat'
import { SaveName } from '@/components/SaveName/SaveName'
import { SendMessage } from '@/components/SendMessage/SendMessage'
import { Card } from '@mui/material'
import { io } from 'socket.io-client'

import s from './App.module.scss'

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
export type Messages = Message[]

export function App() {
  const [messages, setMessages] = useState<Messages>([])
  const [isActive, setActive] = useState<boolean>(true)

  const changeActive = useCallback(() => setActive(false), [])

  useEffect(() => {
    socket.on('init-messages-published', (messages: Messages) => setMessages(messages))
    socket.on('new-message-sent', (message: Message) => setMessages(() => [...messages, message]))
  }, [messages])

  return (
    <div className={s.root}>
      <Chat messages={messages} />
      <Card className={s.card}>
        <SaveName changeActive={changeActive} socket={socket} />
        <SendMessage isActive={isActive} socket={socket} />
      </Card>
    </div>
  )
}
