import { Messages } from '@/App'
import { io } from 'socket.io-client'

export const socket = io('http://localhost:3009/')
// export const socket = io('https://websocket-back-dnisaev.amvera.io/')

socket.on('init-messages-published', (messages: Messages) => setMessages(messages))
socket.on('new-message-sent', (message: Message) => setMessages(() => [...messages, message]))
