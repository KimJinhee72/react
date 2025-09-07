// import { useState } from 'react';
import './App.css';
import Counter from './components/Counter';
import DisplayCount from './components/DisplayCount';

function App() {
  // const [count, setCount] = useState(0);
  return (
    <div className='App'>
      <h1>Root</h1>
      {/* redux로 바로 받을수 있어서
      <CounterRoot
        changeCount={(count) => {
          // setCount(count);
          console.log('Count in App.js:', count);
          setCount(count);
        }}
      />
      <DisplayCountRoot count={count} /> */}
      <Counter></Counter>
      <DisplayCount></DisplayCount>
    </div>
  );
}

export default App;
