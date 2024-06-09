import { Provider } from 'react-redux'

import { chatReducer } from '@/store/chat-reducer'
import { createRoot } from 'react-dom/client'
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { thunk } from 'redux-thunk'

import { App } from './App'

const rootReducer = combineReducers({ chat: chatReducer })
const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)

export type AppStateType = ReturnType<typeof rootReducer>
