import { Message, Messages, User } from '@/App'
import { Socket, io } from 'socket.io-client'

export const api = {
  createConnection() {
    this.socket = io('http://localhost:3009/')
    // this.socket = io('https://websocket-back-dnisaev.amvera.io/')
  },
  destroyConnection() {
    this.socket?.disconnect()
    this.socket = null
  },
  saveName(name: string) {
    this.socket?.emit('client-name-sent', name)
  },
  sendMessage(message: string) {
    this.socket?.emit('client-message-sent', message)
  },
  socket: null as Socket | null,
  subscribe(
    initMessages: (messages: Messages) => void,
    newMessagesSent: (message: Message) => void,
    userTyping: (user: User) => void
  ) {
    this.socket?.on('init-messages-published', initMessages)
    this.socket?.on('new-message-sent', newMessagesSent)
    this.socket?.on('user-typing', userTyping)
  },
  typeMessage() {
    this.socket?.emit('client-typed')
  },
}
