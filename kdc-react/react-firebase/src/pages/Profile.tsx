//profile.tsx
import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  // 프로필에서 로그아웃후 내비게이터로 홈이동 정의먼저
  const navigate = useNavigate();

  // 로그아웃 버튼클릭이벤트
  const logOutClick = async () => {
    alert('정말 로그아웃 하시겠습니까?');
    // firebase 로그아웃
    const auth = getAuth();
    // 홈으로 돌아가게 정의
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/');
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <Button variant='outline-secondary' onClick={logOutClick}>
      Log Out
    </Button>
  );
};
