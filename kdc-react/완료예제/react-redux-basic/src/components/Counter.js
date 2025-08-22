//import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment,selectCount } from "../counterSlice";

const Counter = ({changeCount})=>{
  // const [number, setNumber] = useState(0);
  const number = useSelector(selectCount);
  const dispatch = useDispatch();
  //changeCount(number);
  return(
    <div>
      <h2>Counter</h2>    
      <button type="button" onClick={()=>{
          dispatch(decrement())
        }        
      }>-</button>
      <input type="text" readOnly value={number} ></input>
      <button type="button" onClick={()=>{
         dispatch(increment())
        }        
      }>+</button>
    </div>
  )
}
export default Counter;