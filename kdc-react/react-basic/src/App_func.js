import './App.css';
import React from 'react';  // React 라이브러리에서 React를 가져옵니다.
// import React, { Component } from 'react';  // React와 Component를 가져옵니다. (Component는 더 이상 사용하지 않음)
// import React, { useState } from 'react';  // useState 훅을 가져옵니다. (현재 사용하지 않음)
// import React, { useEffect } from 'react';  // useEffect 훅을 가져옵니다. (현재 사용하지 않음)
// import React, { useContext } from 'react';  // useContext 훅을 가져옵니다. (현재 사용하지 않음)
// import React, { useReducer } from 'react';  // useReducer 훅을 가져옵니다. (현재 사용하지 않음)
// import React, { useRef } from 'react';  // useRef 훅을 가져옵니다. (현재 사용하지 않음)
// import React, { useMemo } from 'react';  // useMemo 훅을 가져옵니다. (현재 사용하지 않음)
// import React, { useCallback } from 'react';  // useCallback 훅을 가져옵니다. (현재 사용하지 않음)
// import React, { useLayoutEffect } from 'react';  // useLayoutEffect 훅을 가져옵니다. (현재 사용하지 않음)
// import React, { useImperativeHandle } from 'react';  // useImperativeHandle 훅을 가져옵니다. (현재 사용하지 않음)
// import React, { forwardRef } from 'react';  // forwardRef를 가져옵니다. (현재 사용하지 않음)

// 헤더컴포넌트 생성
function Myheader() {
  return (
      <header>
        <h1 className='logo'><a href="/">프론트엔드 개발자</a></h1>
        <p>기본언어인 html, css, javascript부터 학습합니다.</p>
      </header>
  );
}
// const Myheader = () => (
//   <div className="Myheader">
//     <header>
//       <h1 className='logo'><a href="">프론트엔드 개발자</a></h1>
//       <p>기본언어인 html, css, javascript부터 학습합니다.</p>
//     </header>
//   </div>
// );

function Mynav() {
  return (
      <nav>
        <ul>
          <li><a href="/">UI/UX 개발</a></li>
          <li><a href="/">재사용이 가능한 UI개발</a></li>
          <li><a href="/">애니메이션 구현</a></li>
        </ul>
      </nav>
  );
}
const Myarticle = () => (
    <section>
      <article>
        <h2>Welcome</h2>
        <p>Welcome to FrontEnd</p>
      </article>
    </section>
);
function App() {
  return (
    <div className="App">
      <Myheader />
      <Mynav />
      <Myarticle />
    </div>
  );
}


// export default class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <Myheader></Myheader>
//         <Mynav></Mynav>
//         <Myarticle></Myarticle>
//       </div>
//     )
//   }
// }

export default App;





