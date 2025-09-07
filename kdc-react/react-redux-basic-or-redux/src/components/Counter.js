import React from 'react';
// import { useEffect, useState } from 'react';
//이렇게 redux를 사용하면 초기값 쓸필요없음
// useDispatch 버튼 클릭, 이벤트 등에서 Redux 상태를 변경할 때 사용 useSelector Redux store의 상태(state)를 React 컴포넌트에서 읽을 때 사용
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, selectCount } from '../counterSlice';

// 부모 CounterRoot.js에서 전달 받은 changeCount 함수를 받아서 사용했으나 Redux로 상태를 관리하면 부모에게 값을 전달할 필요가 없어 { changeCount } 필요없음
const Counter = () => {
  // const [number, setNumber] = useState(0);
  // useEffect(() => {
  //   changeCount(number);
  // }, [number, changeCount]); // number가 바뀔 때만 실행 changeCount 함수는 부모로 부터 받은 함수이기에 의존성 배열에 넣어줌
  // number가 바뀌면 effect 실행 → 부모에 새 값 전달 , changeCount 함수가 바뀌면 effect 실행 → 안전하게 최신 함수 참조 사용
  // changeCount(number); // 다시 부모 App.js로 전달 React는 렌더링 중에 부모 상태를 바로 바꾸는 것을 허용하지 않음(무한 렌더링 됨) 그래서 useEffect(특정하게만) 사용
  const number = useSelector(selectCount); //초기값가져오기 (state) => state.counter.value)를 앞에 selectCount로 담아둬 가져왔으니 그걸씀
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Counter</h2>
      <button type='button' aria-label='Increment value' onClick={() => dispatch(decrement())}>
        -
      </button>
      <input type='text' readOnly value={number}></input>
      <button type='button' aria-label='Decrement value' onClick={() => dispatch(increment())}>
        +
      </button>
    </div>
  );
};
export default Counter;
