import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Board from './components/Board'
import { Counter } from './components/Counter'

function App() {

  return (
    <div className='flex flex-col'>
      <Counter/>
      <Board/>
    </div>
  )
}

export default App
