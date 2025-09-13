import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Auth } from '../routes/Auth';
import { Home } from '../routes/Home';

// App.tsx에서 인수로 보낸 isLoggedIn을 TypeScript에서 props의 타입을 정의한 거 AppRouter가 isLoggedIn이라는 boolean 값을 props로 받을 거라고 타입을 알려줌
// interface 영어로 연결장치라는 뜻
interface AppRouterProps {
  isLoggedIn: boolean;
}

export const AppRouter: React.FC<AppRouterProps> = ({ isLoggedIn }) => {
  return (
    <Routes>
      {isLoggedIn ? (
        //<></>안에 더 많은 내용을 넣게 만들어 둠
        <>
          <Route path='/' element={<Home />} />
        </>
      ) : (
        <>
          <Route path='/' element={<Auth />} />
        </>
      )}
    </Routes>
  );
};
