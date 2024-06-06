import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { socket } from '@/api/api'
import { Chat } from '@/components/Chat/Chat'
import { SaveName } from '@/components/SaveName/SaveName'
import { SendMessage } from '@/components/SendMessage/SendMessage'
import { chatReducer, createConnectionTC, destroyConnectionTC } from '@/store/chat-reducer'
import { Card } from '@mui/material'
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { thunk } from 'redux-thunk'

import s from './App.module.scss'

const rootReducer = combineReducers({ chat: chatReducer })
const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store

export function App() {
  const messages = useSelector((state: AppStateType) => state.chat.messages)

  const dispatch: any = useDispatch()

  // const [messages, setMessages] = useState<Messages>([])
  const [isActive, setActive] = useState(true)
  const [isAutoScrollActive, setIsAutoScrollActive] = useState(true)
  const [lastScrollTop, setLastScrollTop] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const changeActive = () => setActive(false)

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
  }, [isAutoScrollActive, messages])

  return (
    <div className={s.app}>
      <Chat messages={messages} messagesEndRef={messagesEndRef} onScrollHandler={onScrollHandler} />
      <Card className={s.card}>
        <SaveName changeActive={changeActive} socket={socket} />
        <SendMessage isActive={isActive} socket={socket} />
      </Card>
    </div>
  )
}

type User = {
  id: string
  name: string
}
export type Message = {
  id: string
  message: string
  user: User
}
export type Messages = Message[]
export type AppStateType = ReturnType<typeof rootReducer>
