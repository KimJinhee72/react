import { useState } from 'react';
import './App.css';
import CounterRoot from './components/CounterRoot';
import DisplayCountRoot from './components/DisplayCountRoot';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className='App'>
      <h1>Root</h1>
      <CounterRoot
        changeCount={(count) => {
          // setCount(count);
          console.log('Count in App.js:', count);
          setCount(count);
        }}
      />
      <DisplayCountRoot count={count} />
    </div>
  );
}

export default App;
