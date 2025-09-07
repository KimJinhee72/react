import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { decrement, increment,selectCount } from "../counterSlice";

// 부모 CounterRoot.js에서 전달 받은 changeCount 함수를 받아서 사용
const Counter = ({changeCount})=>{
  const [number, setNumber] = useState(0);
  useEffect(() => {
    changeCount(number);
  }, [number, changeCount]); // number가 바뀔 때만 실행 changeCount 함수는 부모로 부터 받은 함수이기에 의존성 배열에 넣어줌
  // number가 바뀌면 effect 실행 → 부모에 새 값 전달 , changeCount 함수가 바뀌면 effect 실행 → 안전하게 최신 함수 참조 사용
  // changeCount(number); // 다시 부모 App.js로 전달 React는 렌더링 중에 부모 상태를 바로 바꾸는 것을 허용하지 않음(무한 렌더링 됨) 그래서 useEffect(특정하게만) 사용
  return (
    <div>
      <h2>Counter</h2>
      <button
        type='button'
        onClick={() => {
          // 감소 버튼 number는 함수로 바로 접근이 불가능 하여 변수num에 담아서 사용
          let num = number;
          setNumber(--num);
        }}
      >
        -
      </button>
      {/* 더 권장함 임시로 변수 담을 필요 없음, 업데이트 겹쳐도 안전하게 전달
      <button onClick={() => setNumber(prev => prev - 1)}>-</button>
      */}
      <input type='text' readOnly value={number}></input>
      <button
        type='button'
        onClick={() => {
          let num = number;
          setNumber(++num);
        }}
      >
        +
      </button>
      {/* <button onClick={() => setNumber(prev => prev + 1)}>+</button> */}
    </div>
  );
}
export default Counter;
