import { configureStore } from '@reduxjs/toolkit'
// Reducer 상태변화를 처리하는 함수 counterSlice를 counterReducer이름으로 바꿔서 사용해도 됨
import counterReducer from './counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer, // store에서 key를 counter로 사용
  },
});

// configureStore는 Redux Toolkit의 일부로----아래와 같이 Redux Toolkit을 사용하지 않고 기존의 Redux 방식으로 스토어를 설정할 수도 있습니다 한꺼번에 쓸수도 있음
// import { createStore, combineReducers } from 'redux';
// import counterReducer from './counterSlice'; // Redux Toolkit 슬라이스 파일이 아닌 순수 Redux 리듀서 파일이 필요합니다.

// // 여러 리듀서를 하나로 합치는 함수
// const rootReducer = combineReducers({
//   counter: counterReducer,
//   // 여기에 다른 리듀서들을 추가할 수 있습니다.
// });

// // 스토어 생성
// const store = createStore(rootReducer);

// export default store;
