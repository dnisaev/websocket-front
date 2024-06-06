import { useEffect, useRef, useState } from 'react'

import { Chat } from '@/components/Chat/Chat'
import { SaveName } from '@/components/SaveName/SaveName'
import { SendMessage } from '@/components/SendMessage/SendMessage'
import { Card } from '@mui/material'
import { io } from 'socket.io-client'

import s from './App.module.scss'

const socket = io('http://localhost:3009/')
// const socket = io('https://websocket-back-dnisaev.amvera.io/')

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
  const [isActive, setActive] = useState(true)
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)
  const [lastScrollTop, setLastScrollTop] = useState(0)

  const onWheelHandler = (e: any) => {
    const element = e.currentTarget
    const maxScrollPosition = element.scrollHeight - element.clientHeight

    console.log(maxScrollPosition)
    console.log(e)
    console.log('------------------')

    element.scrollTop > lastScrollTop && Math.abs(maxScrollPosition - element.scrollTop) < 10
      ? setIsAutoScrollActive(true)
      : setIsAutoScrollActive(false)

    setLastScrollTop(element.scrollTop)
  }
  const changeActive = () => setActive(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    socket.on('init-messages-published', (messages: Messages) => setMessages(messages))
    socket.on('new-message-sent', (message: Message) => setMessages(() => [...messages, message]))
  }, [messages])

  useEffect(() => {
    if (isAutoScrollActive) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isAutoScrollActive, messages])

  return (
    <div className={s.app} onWheel={onWheelHandler}>
      <Chat messages={messages} />
      <Card className={s.card}>
        <SaveName changeActive={changeActive} socket={socket} />
        <SendMessage isActive={isActive} socket={socket} />
      </Card>
      <div ref={messagesEndRef} />
    </div>
  )
}
