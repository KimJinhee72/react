// import { useSelector } from 'react-redux'
// import { selectCount } from "../counterSlice";

const DisplayCount = ({count})=>{
  return (
    <div>
      <h2>Display Counter</h2>
      {/*  readOnly 읽기 전용으로*/}
      <input type='text' value={count} readOnly></input>
    </div>
  );
}
export default DisplayCount;

