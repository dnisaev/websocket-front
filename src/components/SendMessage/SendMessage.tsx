import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import { sendMessageTC } from '@/store/chat-reducer'
import SendSharpIcon from '@mui/icons-material/SendSharp'
import { Box, Button, TextField } from '@mui/material'

import s from './SendMessage.module.scss'

export const SendMessage = ({ isActive }: Props) => {
  const dispatch: any = useDispatch()
  const [message, setMessage] = useState<string>('')

  const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.currentTarget.value)
  const onKeyDownHandler = (e: any) => {
    if (e.keyCode === 13) {
      dispatch(sendMessageTC(message))
      setMessage('')
    }
  }
  const sendMessage = () => {
    dispatch(sendMessageTC(message))
    setMessage('')
  }

  return (
    <Box className={s.box}>
      <TextField
        className={s.textField}
        disabled={isActive}
        label={'Введите сообщение'}
        onChange={onChangeMessage}
        onKeyDown={onKeyDownHandler}
        value={message}
      />
      <Button
        className={s.button}
        disabled={isActive}
        endIcon={<SendSharpIcon />}
        onClick={sendMessage}
        size={'small'}
        variant={'contained'}
      >
        Отправить
      </Button>
    </Box>
  )
}

type Props = {
  isActive: boolean
}
