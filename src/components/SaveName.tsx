import { ChangeEvent, useState } from 'react'

export const SaveName = ({ changeActive, socket }: Props) => {
  const [name, setName] = useState<string>('')

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)
  const saveName = () => {
    socket.emit('client-name-sent', name)
    changeActive()
  }

  return (
    <div>
      <input onChange={onChangeName} placeholder={'Введите имя'} type={'text'} value={name} />
      <button onClick={saveName}>Сохранить</button>
    </div>
  )
}

type Props = {
  changeActive: () => void
  socket: any
}
