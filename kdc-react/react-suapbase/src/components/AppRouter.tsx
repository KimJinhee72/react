// Router.tsx → props로 받은 isLoggedIn 값에 따라 다른 화면 보여줌 true → Home 컴포넌트 보여줌 false → Auth 컴포넌트 보여줌
import React, { type JSX } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Auth } from '../pages/Auth';
import { Home } from '../pages/Home';
import { Nav } from './Nav';
import { Profile } from '../pages/Profile';
import { Outlet } from 'react-router-dom';

// App.tsx에서 인수로 보낸 isLoggedIn을 TypeScript에서 props의 타입을 정의한 거 AppRouter가 isLoggedIn이라는 boolean 값을 props로 받을 거라고 타입을 알려줌
// interface 영어로 연결장치라는 뜻
interface AppRouterProps {
  isLoggedIn: boolean | null;
  userObj: string | null;
}
export const AppRouter: React.FC<AppRouterProps> = ({ isLoggedIn, userObj }) => {
  const Layout = () => (
    <>
      <Nav />
      <Outlet />
    </>
  );

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    return isLoggedIn ? children : <Navigate to='/' />;
  };

  return (
    <>
      <h1 style={{ fontWeight: 'bold' }}>Post Board</h1>
      <Routes>
        {isLoggedIn ? (
          <Route element={<Layout />}>
            <Route path='/' element={<Home userObj={userObj} />} />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
        ) : (
          <Route path='/' element={<Auth />} />
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
