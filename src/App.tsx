import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Home from './components/Home'
import { Counter } from './components/Counter'

function App() {

  return (
    <div className='flex flex-col'>
      <Counter/>
      <Home/>
    </div>
  )
}

export default App
