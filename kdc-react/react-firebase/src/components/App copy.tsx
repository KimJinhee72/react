// App.tsx → isLoggedIn 상태 관리 (true/false)
import React, { useEffect, useState } from 'react';
import { AppRouter } from './AppRouter';
import { authService } from '../firebase';

// getAuth는 Firebase Authentication 모듈에서 로그인/회원가입, 사용자 정보 관리를 하기 위해 쓰는 함수
// onAuthStateChanged 현재 로그인한 사용자 가져오기
import { getAuth, onAuthStateChanged } from 'firebase/auth';

console.log(authService);

export const App: React.FC = () => {
  // 로그인 진행(회원확인중) 중 임을 알리는 메시지 설정을 위한 정의
  const [initialize, setInitialize] = useState(false);

  // 로그인 정보 유무 설정 , isLoggedIn → 현재 로그인 상태,useState(false) → 초기 상태를 false (로그아웃 상태)로 설정, 만약에 있다면 여기서는 AppRouter에 전달
  // 로그인 따라 상황바뀌게 설정,setIsLoggedIn는 저장 데이타에 있으면 setIsLoggedIn → 로그인 상태를 변경하는 함수 위해
  // 로그인정보가 없으면(false) auth나와 승인을 받아야 하고 ture 로그인 data 있으면(true) home이 나오게 됨(삼항연산자로)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
useEffect(() => {
  // 현재 로그인한 사용자 가져오기-firebase에 가져옴(회원가입을 하면 자동으로 로그인이 됨)
  const auth = getAuth(); //초기화 해둠
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in되어 setIsLoggedIn 상태를 바꿀수 있는 함수를 이용하여 로그인됨(true)설정
      setIsLoggedIn(true);
    } else {
      // User is signed out=로그아웃이ㄴ;
      setIsLoggedIn(false);
    }
    //회원가입이 되어있다면
    setInitialize(true);
  });

    // Cleanup: 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, []);

  // 로그인 정보 유무 설정 , 만약에 있다면 여기서는 AppRouter isLoggedIn={isLoggedIn}에 전달
  // 앞isLoggedIn AppRouter 컴포넌트에서 받을 prop 이름   뒤쪽 {isLoggedIn} → App 컴포넌트 안에서 선언한 상태 변수(위에 const선언한) 값
   // JSX 반환은 컴포넌트 함수에서 직접
  return (
    <>
      {initialize ? (
        <AppRouter isLoggedIn={isLoggedIn} />
      ) : (
        '회원정보 확인중...'
      )}
    </>
  );

}

