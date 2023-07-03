import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import NewLogin from './NewLogin'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
    <App />
    {/* <NewLogin/> */}
    </BrowserRouter>
  </React.StrictMode>,
)
