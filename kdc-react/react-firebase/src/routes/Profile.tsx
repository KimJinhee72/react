//profile.tsx
import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  // 프로필에서 로그아웃후 내비게이터로 홈이동 정의먼저
  const navigate = useNavigate()

  // 로그아웃 버튼클릭이벤트
  const logOutClick = async () => {
    // firebase 로그아웃
    const auth = getAuth();
    // 홈으로 돌아가게 정의
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert('로그아웃 되었습니다');
        navigate('/');
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return <button onClick={logOutClick}>Log Out</button>;
};
