import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  linkWithCredential,
  fetchSignInMethodsForEmail,
  AuthCredential,
} from 'firebase/auth';

export const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [newJoin, setNewJoin] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const auth = getAuth();

  // 입력값 처리
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  // 회원가입 / 로그인
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      if (newJoin) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('회원가입 성공:', userCredential.user);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('로그인 성공:', userCredential.user);
      }
    } catch (error: any) {
      console.error(error.code, error.message);
      setErrorMsg(error.message);
    }
  };

  const toggleJoinaccount = () => setNewJoin((prev) => !prev);

  // 소셜 로그인 (Google + GitHub)
  const onSocialLoginClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    let provider: GoogleAuthProvider | GithubAuthProvider;

    if (name === 'google') provider = new GoogleAuthProvider();
    else if (name === 'github') provider = new GithubAuthProvider();
    else return;

    try {
      const result = await signInWithPopup(auth, provider);
      const credential =
        name === 'google'
          ? GoogleAuthProvider.credentialFromResult(result)
          : GithubAuthProvider.credentialFromResult(result);

      console.log(`${name} 로그인 성공`, result.user, credential?.accessToken);
    } catch (error: any) {
      // 계정 충돌 처리
      if (error.code === 'auth/account-exists-with-different-credential') {
        const pendingCred: AuthCredential = error.credential;
        const email = error.customData?.email;

        if (!email) {
          setErrorMsg('이미 다른 계정으로 가입되어 있습니다.');
          return;
        }

        const methods = await fetchSignInMethodsForEmail(auth, email);
        console.log('기존 로그인 방법:', methods);

        // 클릭한 provider가 기존 가입 방법과 일치하면 그냥 로그인
        if (
          (name === 'google' && methods.includes('google.com')) ||
          (name === 'github' && methods.includes('github.com'))
        ) {
          const loginResult =
            name === 'google'
              ? await signInWithPopup(auth, new GoogleAuthProvider())
              : await signInWithPopup(auth, new GithubAuthProvider());
          console.log('기존 계정으로 로그인 성공', loginResult.user);
        } else {
          // 다른 소셜이면 계정 연결 시도
          try {
            let existingProvider: GoogleAuthProvider | GithubAuthProvider;
            if (methods.includes('google.com')) existingProvider = new GoogleAuthProvider();
            else if (methods.includes('github.com')) existingProvider = new GithubAuthProvider();
            else {
              setErrorMsg(
                `${email} 이메일은 이미 Google 계정으로 가입되어 있습니다. Google 로그인 버튼을 눌러 로그인하세요`
              );
              return;
            }

            const loginResult = await signInWithPopup(auth, existingProvider);
            await linkWithCredential(loginResult.user, pendingCred);
            console.log('자동 계정 연결 완료', loginResult.user);
          } catch (linkError: unknown) {
            console.error('계정 연결 실패:', linkError);
            setErrorMsg('자동 계정 연결 중 문제가 발생했습니다.');
          }
        }
      } else {
        console.error(`${name} 로그인 에러:`, error.code, error.message);
        setErrorMsg(error.message);
      }
    }
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <form onSubmit={onSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input
          type='email'
          name='email'
          placeholder='Email 필수'
          required
          value={email}
          autoComplete='email' // <- 추가
          // style={{ padding: '5px' }}
          onChange={onChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password 필수'
          required
          value={password}
          autoComplete='current-password' // <- 추가
          onChange={onChange}
        />
        <Button type='submit' variant={newJoin ? 'primary' : 'success'}>
          {newJoin ? 'Sign up' : 'Log in'}
        </Button>

        {!newJoin && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              type='button'
              name='google'
              // variant='outline-primary'
              style={{
                width: '35px',
                height: '35px',
                border: 'none',
                background: 'none',
                padding: '1px',
              }}
              onClick={onSocialLoginClick}
            >
              <img src='/Mask group.svg' alt='구글이미지' style={{ width: '100%' }} />
            </button>
            <button
              type='button'
              name='github'
              // variant='outline-secondary'
              style={{
                width: '35px',
                height: '35px',
                border: 'none',
                background: 'none',
                padding: '1px',
              }}
              onClick={onSocialLoginClick}
            >
              <img src='/image 137.svg' alt='깃허브이미지' style={{ width: '100%' }} />
            </button>
          </div>
        )}
      </form>
      {/* 로그인 에러메시지 */}
      {errorMsg && (
        <p style={{ color: 'red', whiteSpace: 'break-spaces', margin: '10px 0' }}>{errorMsg}</p>
      )}

      <div
        onClick={toggleJoinaccount}
        style={{ textDecoration: 'underline', cursor: 'pointer', marginTop: '20px' }}
      >
        {newJoin ? '이미 계정이 있다면 로그인' : '회원가입 원하면 클릭'}
      </div>
    </div>
  );
};
