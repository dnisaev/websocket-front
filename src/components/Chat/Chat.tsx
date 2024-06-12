import { LegacyRef } from 'react'

import { Messages, User } from '@/App'
import { Card } from '@mui/material'

import s from './Chat.module.scss'

export const Chat = ({ messages, messagesEndRef, onScrollHandler, typingUsers }: Props) => {
  return (
    <Card className={s.chat}>
      <div className={s.wrapper} onScroll={onScrollHandler}>
        {messages.map(m => (
          <div key={m.id}>
            <b>{m.user.name}:</b> {m.message}
            <hr />
          </div>
        ))}
        {typingUsers.map(u => (
          <div className={s.userTyping} key={u.id}>
            {u.name} печатает...
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </Card>
  )
}

type Props = {
  messages: Messages
  messagesEndRef: LegacyRef<HTMLDivElement> | undefined
  onScrollHandler: (e: any) => void
  typingUsers: User[]
}
