import { ChangeEvent, useState } from 'react'

import { AccountCircle } from '@mui/icons-material'
import SaveAltSharpIcon from '@mui/icons-material/SaveAltSharp'
import { Box, Button, TextField } from '@mui/material'

import s from './SaveName.module.scss'

export const SaveName = ({ changeActive, socket }: Props) => {
  const [name, setName] = useState<string>('')

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)
  const onKeyDownHandler = (e: any) => {
    if (e.keyCode === 13) {
      saveName()
      e.target.blur()
    }
  }
  const saveName = () => {
    socket.emit('client-name-sent', name)
    changeActive()
  }

  return (
    <Box className={s.box}>
      <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
      <TextField
        className={s.textField}
        id={'input-with-sx'}
        label={'Введите имя'}
        onChange={onChangeName}
        onKeyDown={onKeyDownHandler}
        value={name}
        variant={'standard'}
      />
      <Button
        className={s.button}
        endIcon={<SaveAltSharpIcon />}
        onClick={saveName}
        size={'small'}
        variant={'contained'}
      >
        Сохранить
      </Button>
    </Box>
  )
}

type Props = {
  changeActive: () => void
  socket: any
}
