import { RefObject } from 'react'

import { Messages } from '@/App'
import { Card } from '@mui/material'

import s from './Chat.module.scss'

export const Chat = ({ messages, messagesEndRef }: Props) => {
  return (
    <Card className={s.card}>
      {messages.map(m => (
        <div key={m.id}>
          <b>{m.user.name}:</b> {m.message}
          <hr />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </Card>
  )
}

type Props = {
  messages: Messages
  messagesEndRef: RefObject<HTMLDivElement>
}
