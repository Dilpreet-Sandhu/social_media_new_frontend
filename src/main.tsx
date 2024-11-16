import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom'
import { SocketProvider } from './socket/Socket.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <SocketProvider>
    <Provider store={store}>
    <App />
    <ToastContainer/>
    </Provider>
    </SocketProvider>
    </BrowserRouter>
  </StrictMode>,
)
