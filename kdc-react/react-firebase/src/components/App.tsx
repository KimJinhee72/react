import React, { useState } from 'react';
import { AppRouter } from './Router';
import { authService } from '../firebase';
console.log(authService);


export const App: React.FC = () => {
  // 로그인 정보 유무 설정 , 만약에 있다면 여기서는 AppRouter에 전달
  // 로그인 따라 상황바뀌게 설정,setIsLoggedIn는 저장 데이타를 사용하기 위해
  // 로그인정보가 없으면(false) auth나와 승인을 받아야 하고 ture 로그인 data 있으면(true) home이 나오게 됨(삼항연산자로)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return <AppRouter isLoggedIn={isLoggedIn}></AppRouter>;
};


