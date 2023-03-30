import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0) //typescript infers a number because it's obvious

  function addCount(event: React.MouseEvent<HTMLButtonElement>){
    console.log(event.currentTarget.value)
    setCount(prev => prev + 1);
  }
  return (
    <div className="App">
      
      <button value={count} onClick={addCount}>
        count is {count}
      </button>
        
    </div>
  )
}

export default App
