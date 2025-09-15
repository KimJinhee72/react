// Router.tsx → props로 받은 isLoggedIn 값에 따라 다른 화면 보여줌 true → Home 컴포넌트 보여줌 false → Auth 컴포넌트 보여줌
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Auth } from '../routes/Auth';
import { Home } from '../routes/Home';
import { Nav } from './Nav';
import { Profile } from '../routes/Profile';

// App.tsx에서 인수로 보낸 isLoggedIn을 TypeScript에서 props의 타입을 정의한 거 AppRouter가 isLoggedIn이라는 boolean 값을 props로 받을 거라고 타입을 알려줌
// interface 영어로 연결장치라는 뜻
interface AppRouterProps {
  isLoggedIn: boolean;
}

export const AppRouter: React.FC<AppRouterProps> = ({ isLoggedIn }) => {
  return (
    // JSX에서는 형제 요소를 바로 나란히 쓸 수 없고, 반드시 하나의 부모 요소로 감싸야, JSX 반환 시 최상위 요소가 반드시 하나여야 해서 div처럼 하나로 감사야함
    // 그리고 <Nav />,<Routes> 두개이니 묶어줘야함
    <>
      {/* Nav는 공통 UI라서 Route 안에 두지 않고 바깥에서 조건부 렌더링- 로그인 상태일 때만 Nav 출력 ,  &&(AND 연산자)는 자바스크립트 기본 문법
      : 조건을 체크하고 왼쪽 값(isLoggedIn)이 true면 → 오른쪽(<Nav />)을 반환, 왼쪽 값(isLoggedIn)이 false면 → 아무것도 반환하지 않음(null) */}
      {isLoggedIn && <Nav />}
      <Routes>
        {/* isLoggedIn 설정상태 관계없이 삼항연산자는 true면 앞에 false면 뒤에 내용을 두면 됨 */}
        {isLoggedIn ? (
          //<></>안에 더 많은 내용을 넣게 만들어 둠(하나면 없어도 됨) element={<Nav />}이 경로에서는 <Nav />라는 React 컴포넌트를 렌더링해라는 뜻
          <>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={isLoggedIn ? <Profile /> : <Navigate to='/' />} />
          </>
        ) : (
          <>
            <Route path='/auth' element={isLoggedIn ? <Auth /> : <Navigate to='/' />} />
          </>
        )}
      </Routes>
    </>
  );
};
// 2️⃣ export const AppRouter: React.FC<AppRouterProps> = ({ isLoggedIn }) => {
//   const Layout = () => (
//     <>
//       <Nav />
//       <Outlet /> {/* 자식 Route가 여기에 렌더링됨 */}
//     </>
//   );

//   return (
//     <Routes>
//       {isLoggedIn ? (
//         <Route element={<Layout />}>
//           <Route path='/' element={<Home />} />
//         </Route>
//       ) : (
//         <Route path='/' element={<Auth />} />
//       )}
//     </Routes>
//   );
// };
