import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Chat } from '@/components/Chat/Chat'
import { SaveName } from '@/components/SaveName/SaveName'
import { SendMessage } from '@/components/SendMessage/SendMessage'
import { AppStateType } from '@/main'
import { createConnectionTC, destroyConnectionTC } from '@/store/chat-reducer'
import { Card } from '@mui/material'

import s from './App.module.scss'

export function App() {
  const messages = useSelector((state: AppStateType) => state.chat.messages)
  const typingUsers = useSelector((state: AppStateType) => state.chat.typingUsers)
  const dispatch: any = useDispatch()

  const [isActive, setActive] = useState(true)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const onScrollHandler = (e: any) => {
    const element = e.currentTarget
    const maxScrollPosition = element.scrollHeight - element.clientHeight

    if (element.scrollTop > lastScrollTop || Math.abs(maxScrollPosition - element.scrollTop) < 10) {
      setIsAutoScrollActive(true)
    } else {
      setIsAutoScrollActive(false)
    }

    setLastScrollTop(element.scrollTop)
  }

  useEffect(() => {
    dispatch(createConnectionTC())

    return () => {
      dispatch(destroyConnectionTC())
    }
  }, [dispatch])

  useEffect(() => {
    if (isAutoScrollActive) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isAutoScrollActive, messages, messagesEndRef])

  return (
    <div className={s.app}>
      <Chat
        messages={messages}
        messagesEndRef={messagesEndRef}
        onScrollHandler={onScrollHandler}
        typingUsers={typingUsers}
      />
      <Card className={s.card}>
        <SaveName changeActive={() => setActive(false)} />
        <SendMessage isActive={isActive} />
      </Card>
    </div>
  )
}

export type User = {
  id: string
  name: string
}
export type Message = {
  id: string
  message: string
  user: User
}
export type Messages = Message[]
