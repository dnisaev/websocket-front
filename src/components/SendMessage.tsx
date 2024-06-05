import { ChangeEvent, useState } from 'react'

export const SendMessage = ({ isActive, socket }: Props) => {
  const [message, setMessage] = useState<string>('')

  const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.currentTarget.value)
  const sendMessage = () => {
    socket.emit('client-message-sent', message)
    setMessage('')
  }

  return (
    <div>
      <input onChange={onChangeMessage} placeholder={'Введите сообщение'} value={message}></input>
      <button disabled={isActive} onClick={sendMessage}>
        Отправить
      </button>
    </div>
  )
}

type Props = {
  isActive: boolean
  socket: any
}
