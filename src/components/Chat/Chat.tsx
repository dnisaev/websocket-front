import { Messages } from '@/App'

export const Chat = ({ messages }: Props) => {
  return (
    <div>
      {messages.map((m, index) => (
        <div key={index}>
          <b>{m.user.name}:</b> {m.message}
          <hr />
        </div>
      ))}
    </div>
  )
}

type Props = {
  messages: Messages
}
