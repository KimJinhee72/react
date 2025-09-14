// Router.tsx에서 isLoggedIn ?:삼항연산자로 로그인되면 Home 처음들어오거나 로그인안되면 Auth로 설정되어 있어 여기에 사용자가 입력할 이메일 password양식을 만듦
import React, { useState } from 'react';
// getAuth는 Firebase Authentication 모듈에서 로그인/회원가입, 사용자 정보 관리를 하기 위해 쓰는 함수
// onAuthStateChanged 현재 로그인한 사용자 가져오기
// createUserWithEmailAndPassword 비밀번호가 있는 신규 사용자 회원가입을 위한 함수, signInWithEmailAndPassword 이메일 주소와 비밀번호로 사용자 로그인을 위한 함수
import {
  getAuth,
  onAuthStateChanged,//
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export const Auth: React.FC = () => {
  // input value 값 정의하기(useState() 입력값을 정의 할때 씀)
  const [email, setEmail] = useState<string>(''); //초기값: '' (빈 문자열 string 타입-(이메일, 비밀번호, 닉네임 등))
  const [password, setPassword] = useState<string>('');

  //이메일과 비번으로 회원가입하는 방법
  const [newJoin, setNewJoin] = useState<boolean>(true); //초기값: true (boolean 타입 true/false만 가능 "상태 플래그" (토글, 모드 전환 등))

  //로그인 에러시 메시지 출력 정의
  const [errorMsg, setErrorMsg] = useState(''); //아래의 errorMessage이용 예정

  // 정보관리를 위해 설정-firebase에 가져옴 (위에 임폴트해둠)
  const auth = getAuth(); //초기화 해둠

  // onChang의 onChange함수 정의 각각 다르면 onChange={(e)=>{e.preEventDafeult 등}}바로 입력해도 됨
  // e로 설정하는 이유는 입력값이 뭔지를 받아와야 하니 매개변수가 필요(HTMLInputElement에 ChangeEvent 입력값 변경이벤트)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name); //이메일이든 비밀번호든  아래 input의 이름 나옴 둘다 타겟됨 이메일이면 이메일이름나옴
    // const name = e.target.name; //인풋의 name
    // const value = e.target.value; //인풋의 value(직접입력값)
    const { name, value } = e.target; //이렇게 한번에 써도 가능
    if (name === 'email') {
      //email 처리로직(setEmail이용)
      setEmail(value);
    } else if (name === 'password') {
      // password 처리로직(setPassword 이용)
      setPassword(value);
    }
    console.log(name, value);
  };

  // form 제출이벤트 onSubmit함수 정의 입력값을 정의 내리려 매개변수로 e로 받기(HTMLFormElement FormEvent 폼에 폼이벤트로 제출함수 정의)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 제출은 회원가입 되어있느냐의 여부에 따라야하니 newJoin(true)을 확인해야함
    if (newJoin) {
      //새로운 가입자이니 회원가입 진행(비밀번호 기반 계정 만들기－firebase에서 가져오기)
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
        })
        // 가입이 안된 사용자 에러메시지
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          //setErrorMsg 이용하여 에러메시지를 빈배열에서 나온 메시지로 상태변경함->아래에 원래 return 안에서 {errorMsg}로 나오게함
          setErrorMsg(errorMessage);
        });
    } else {
      // 기존 가입자니 로그인 진행(비밀번호인증->이메일 주소와 비밀번호로 사용자 로그인-firebase에서 가져옴)
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setErrorMsg(errorMessage);
        });
    }
    return {};
  };

  // 클릭에 따라 회원가입/로그인 버튼
  const toggleJoinaccount = () => setNewJoin((prev) => !prev); //setNewJoin으로 newjoin 값이 변경(이전값이 뭐든 반대로 나오게 상태변경)

  return (
    <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
      {/* form 제출이벤트*/}
      <form onSubmit={onSubmit}>
        {/* value가 있어야 사용자기 입력한 내용이 그대로 반영됨 `value` 쓰면서 `onChange` handler 쓰지 않으면 read-only밖에 되지 않아 써줘야 함 */}
        <input
          type='email'
          name='email'
          placeholder='Email 필 수'
          required
          value={email}
          onChange={onChange}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          required
          value={password}
          onChange={onChange}
        />
        {/* newJoin 따라 Log in(false) 또는 Sing up(true) 페이지가 정해짐 */}
        <button>{newJoin ? 'Sing up' : 'Log in'}</button>
        {/* 회원가입이 없는 사람일때 메시지 */}
        {errorMsg}
      </form>
      <div onClick={toggleJoinaccount} style={{textDecoration:'underline', cursor:'pointer'}}>{newJoin ? '이미 계정을 있다면' : '회원가입 원하면' }</div>
    </div>
  );
};
