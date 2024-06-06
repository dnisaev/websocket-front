import { Message, Messages } from '@/App'

const initialState = {
  messages: [],
}

export const chatReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'MESSAGES-RECEIVED': {
      return { ...state, messages: action.messages }
    }
    case 'NEW-MESSAGE-RECEIVED': {
      return { ...state, messages: [...state.messages, action.messages] }
    }
    default: {
      return state
    }
  }
}

export const messageReceivedAC = (messages: Messages) => ({ messages, type: 'MESSAGES-RECEIVED' })
export const newMessageReceivedAC = (message: Message) => ({
  message,
  type: 'NEW-MESSAGE-RECEIVED',
})

export const createConnectionTC = () => (dispatch: any) => {}

export const destroyConnectionTC = () => (dispatch: any) => {}
