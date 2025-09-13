// Router.tsx에서 isLoggedIn ?:삼항연산자로 로그인되면 Home 처음들어오거나 로그인안되면 Auth로 설정되어 있어 여기에 사용자가 입력할 이메일 password양식을 만듦
import React, { useState } from "react";

export const Auth:React.FC = () =>{
  // input value 값 정의하기(useState() 입력값을 정의 할때 씀)
  const [email, setEmail] = useState<string>(''); //초기값: '' (빈 문자열 string 타입-(이메일, 비밀번호, 닉네임 등))
  const [password, setPassword] = useState<string>('');

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

  //이메일과 비번으로 회원가입하는 방법
  const [newJoin, setNewJoin] = useState<boolean>(true); //초기값: true (boolean 타입 true/false만 가능 "상태 플래그" (토글, 모드 전환 등))

  // form 제출이벤트 onSubmit함수 정의 입력값을 정의 내리려 매개변수로 e로 받기(HTMLFormElement FormEvent 폼에 폼이벤트로 제출함수 정의)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 제출은 회원가입 되어있느냐의 여부에 따라야하니 newJoin을 확인해야함
    if (newJoin){
      //새로운 가입자이니 회원가입 진행

    }else{
      // 기존 가입자니 로그인 진행
    }
    return{
      
    }
  };

  return (
    <div>
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
      </form>
    </div>
  );
}
