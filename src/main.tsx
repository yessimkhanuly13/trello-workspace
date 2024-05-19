import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Board from './components/Board.tsx'
import {NextUIProvider} from '@nextui-org/react'  

const router = createBrowserRouter([
  {
    path: "/",
    element : <App/>
  },
  {
    path: "/board/:id",
    element: <Board/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </NextUIProvider>
  </React.StrictMode>,
)
