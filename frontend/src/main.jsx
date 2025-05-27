import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterApp } from "../src/router/RouterApp";
import TodoList from './components/TodoList';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoList />
  </StrictMode>,
)
