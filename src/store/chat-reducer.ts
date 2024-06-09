import { Message, Messages } from '@/App'
import { api } from '@/api/api'
import { Dispatch } from 'redux'

const initialState = {
  messages: [],
}

export const chatReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'MESSAGES-RECEIVED': {
      return { ...state, messages: action.messages }
    }
    case 'NEW-MESSAGE-RECEIVED': {
      return { ...state, messages: [...state.messages, action.message] }
    }
    default: {
      return state
    }
  }
}

export const messagesReceivedAC = (messages: Messages) => ({ messages, type: 'MESSAGES-RECEIVED' })
export const newMessageReceivedAC = (message: Message) => ({
  message,
  type: 'NEW-MESSAGE-RECEIVED',
})

export const createConnectionTC = () => (dispatch: Dispatch) => {
  api.createConnection()
  api.subscribe(
    messages => dispatch(messagesReceivedAC(messages)),
    message => dispatch(newMessageReceivedAC(message))
  )
}

export const destroyConnectionTC = () => () => {
  api.destroyConnection()
}

export const saveNameTC = (name: string) => () => {
  api.saveName(name)
}

export const sendMessageTC = (message: string) => () => {
  api.sendMessage(message)
}
