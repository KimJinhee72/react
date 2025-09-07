
// import { useState } from 'react';
import './App.css';
import Counter from './components/Counter';
import DisplayCount from './components/DisplayCount';

function App() {
  // const [count, setCount] = useState(0);
  return (
    <div className="App">
      <h1>Root</h1>
      <Counter></Counter>
      <DisplayCount/>
    </div>
  );
}

export default App;
