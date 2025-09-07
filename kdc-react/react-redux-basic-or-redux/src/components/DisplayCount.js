// 스토어에 있는 내용으로 받아오기로 변경
import { useSelector } from 'react-redux'
// export const selectCount했기에 쓸 수 있다
import { selectCount } from "../counterSlice";

// 부모로 부터 {count}더이상 받지 않아도 됨
const DisplayCount = ()=>{
  const number = useSelector(selectCount);
  return (
    <div>
      <h2>Display Counter</h2>
      {/*  readOnly 읽기 전용으로*/}
      <input type='text' value={number} readOnly></input>
    </div>
  );
}
export default DisplayCount;

