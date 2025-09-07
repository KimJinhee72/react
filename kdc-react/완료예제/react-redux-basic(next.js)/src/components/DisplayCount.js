import { useSelector } from 'react-redux'
import { selectCount } from "../counterSlice";

const DisplayCount = ({count})=>{
  const number = useSelector(selectCount);
  return(
    <div>
      <h2>Display Counter</h2>  
      <input type="text" value={number} readOnly></input>
    </div>
  ) 
}
export default DisplayCount;

