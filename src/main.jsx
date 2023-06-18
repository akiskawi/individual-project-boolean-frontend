import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import WorkoutView from './components/WorkoutView.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WorkoutView />
  </React.StrictMode>,
)
