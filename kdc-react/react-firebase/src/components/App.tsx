  import React, { useEffect, useState } from 'react';
  import { AppRouter } from './AppRouter';
  import { authService } from '../firebase';
  import { onAuthStateChanged } from 'firebase/auth';

  console.log('로그인 유저:', authService.currentUser);

  export const App: React.FC = () => {
    // 로그인 정보 확인 중 표시 상태 인증 상태 확인 중 표시
    const [checkingAuth, setCheckingAuth] = useState(true);

    // 로그인 정보 유무 설정 , isLoggedIn → 현재 로그인 상태,useState(false) → 초기 상태를 false (로그아웃 상태)로 설정, 만약에 있다면 여기서는 AppRouter에 전달
    // 로그인 따라 상황바뀌게 설정,setIsLoggedIn는 저장 데이타에 있으면 setIsLoggedIn → 로그인 상태를 변경하는 함수 위해
    // 로그인정보가 없으면(false) auth나와 승인을 받아야 하고 ture 로그인 data 있으면(true) home이 나오게 됨(삼항연산자로)
    //로그인 상태
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const start = Date.now(); // 확인 시작 시간 기록

      // 현재 로그인한 사용자 가져오기-firebase에 가져옴(회원가입을 하면 자동으로 로그인이 됨) Firebase 인증 상태 구독
      const unsubscribe = onAuthStateChanged(authService, (user) => {
        // user가 있으면 true(로그인)로, 없으면 false(로그아웃)로 변환 !!는 논리 부정(Not)을 두 번 적용하는 것(if else)
        setIsLoggedIn(!!user);

        // 최소 0.5초 메시지 보장
        const elapsed = Date.now() - start;
        const delay = Math.max(500 - elapsed, 0);

        //회원가입이 되어있다면  // 최소 0.5초 delay 후 확인중 종료
        setTimeout(() => setCheckingAuth(false), delay);
      });

      // Cleanup: 컴포넌트 언마운트 시 구독 해제
      return () => unsubscribe();
    }, []);

    // 로그인 정보 유무 설정 , 만약에 있다면 여기서는 AppRouter isLoggedIn={isLoggedIn}에 전달
    // 앞isLoggedIn AppRouter 컴포넌트에서 받을 prop 이름   뒤쪽 {isLoggedIn} → App 컴포넌트 안에서 선언한 상태 변수(위에 const선언한) 값
    // JSX 반환은 컴포넌트 함수에서 직접
    return <>{checkingAuth ? '회원정보 확인중...' : <AppRouter isLoggedIn={isLoggedIn} />}</>;
  };
