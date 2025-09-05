import { useEffect, useState } from 'react';
import './App.css';

// <Nav list={list}/>App에서 넘겨준 Nav 컴포넌트 만들기 왼쪽list쓰려면:function Nav(props.list) 또는 오른쪽list쓰려면:({list})
// 뭘쓰던 data 내용 list는 배열 상태 (예: fetch로 가져온 JSON 데이터)로 받아 활용 onclick 함수도 props로 받아서 클릭시 작동
function Nav({ list, onclick }) {
  console.log(list);
  // listHTML 만들기 foreach로 써도 되지만 map(배열의 각 항목을 변환해서 새로운 배열 생성)이 더 간단
  // item을 <li> jsx(JavaScript 안에서 HTML처럼 생긴 코드를 작성할 수 있게 하는 문법)로 변환
  const listHTML =
    list?.map((item) => (
      // key가 있으면 React가 어떤 항목이 바뀌었는지 효율적으로 비교 가능
      <li key={item.id}>
        {/* JSX 안에서 JavaScript 값을 사용하려면 {} 안에 넣어야 함 JS 표현식*/}
        {/* {item.id} id가 문자 즉 id:"/daegu"일때 쓰고, item.id가 숫자이면 {item.id} */}
        <a
          href={item.id}
          onClick={(e) => {
            e.preventDefault();
            // 클릭시 작동을 하려면 미리 App에서 onclick 담아줬어야함.
            onclick(item.id);
          }}
        >
          {item.title}
        </a>
      </li>
    )) || [];

  return (
    <nav>
      <ul>{listHTML}</ul>
    </nav>
  );
}

//
function App() {
  // useState()로 article 초기상태를 만듦
  const [article, setArticle] = useState({ title: 'Welcome', desc: 'React Ajax' });

  // nav의 li를 json 연결하여 클릭시 article이 바뀌도록 만들기
  // 먼저 초기값 설정
  const [list, setList] = useState([]);
  // useEffect **“컴포넌트가 화면에 나타나거나 값이 바뀔 때, 혹은 사라질 때 해야 할 작업”**을 처리 함수
  useEffect(() => {
    // fetch()로 json데이터 가져오기
    fetch('/data/task.json')
      .then((result) => {
        if (!result.ok) throw new Error('Network response was not ok');
        return result.json();
      }) //=>{ return result.json()  } 와 같으나 {}없으면 return 생략가능
      .then((data) => setList(data)); // setList(data); // list에 json데이터 넣기
  }, []); // 빈 배열 넣으면 맨 처음 한번만 실행
  console.log(list); // 최초 비어있는 렌더링 값 나오고 돌아서 7개 데이터가 나옴

  return (
    <div className='App'>
      <h1>프론트엔드 개발자</h1>
      <p>기본언어인 html, css, javascript부터 학습합니다. </p>
      {/* 아래 메뉴 만들기 컴포넌트로*/}
      {/* list와 함수를 props로 넘김 */}
      <Nav
        list={list}
        onclick={(id) => {
          const selected = list.find((item) => item.id === id);
          if (selected) {
            setArticle({
              title: selected.title,
              desc: selected.desc,
            });
          }
        }}  
      />
      {/* 바로 아래 나올 내용 만들기 */}
      <article>
        <h2>{article.title}</h2>
        <p>{article.desc}</p>
      </article>
    </div>
  );
}

export default App;
