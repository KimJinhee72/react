import './App.css';
import { BrowserRouter, Routes, Route, NavLink, useParams } from 'react-router-dom';

// 프론트엔드 주요 업무 리스트 데이터
let contents = [
  { id: 1, title: 'UI/UX 개발', desc: '사용자 경험 중심 인터페이스 개발' },
  { id: 2, title: '재사용 가능한 UI 개발', desc: 'React, Vue, Angular 등으로 컴포넌트화' },
  { id: 3, title: '애니메이션 구현', desc: 'CSS/JS 활용 다양한 애니메이션 구현' },
  { id: 4, title: '웹사이트 최적화', desc: '로딩속도, 반응속도, 안정성 개선' },
  { id: 5, title: '테스트 코드', desc: '테스트 코드 작성 및 브라우저 호환성 확보' },
  { id: 6, title: '디버깅', desc: '문제 코드 추적 및 해결' },
  { id: 7, title: '협업', desc: '다른 개발자와의 협업으로 효율성 강화' },
];

// Home 컴포넌트
function Home() {
  return (
    <>
      <header>
        <h2>프론트엔드 개발자 역할</h2>
        <p>기본 언어인 HTML, CSS, JavaScript부터 학습합니다.</p>
      </header>
      <nav>
        <NavLink to='/tasks'>Tasks</NavLink>
        <NavLink to='/qna'>Qna</NavLink>
      </nav>
    </>
  );
}

// Tasks 컴포넌트 (목록 + 상세 라우트)
function Tasks() {
  // contents 배열을 돌면서 NavLink 리스트 생성
  let list = contents.map((item) => (
    <li key={item.id}>
      {/* 수정: 원래 '/task/' 였는데, 실제 라우트는 '/tasks/:id' 이므로 '/tasks/' 로 변경 */}
      <NavLink to={'/task/' + item.id}>{item.title}</NavLink> {/* 수정 */}
    </li>
  ));

  return (
    <div>
      <h2>주요업무 Tasks</h2>
      <p>프론트엔드 개발자의 역할은...</p>
      <nav>
        <ul>{list}</ul>
      </nav>

      {/* 수정: 상세보기 라우트를 /tasks/:task_id 로 맞춤 */}
      <Routes>
        <Route path=':task_id' element={<Task />} /> {/* 수정 */}
      </Routes>
    </div>
  );
}

// Task 상세보기 컴포넌트
function Task() {
  // URL 파라미터 가져오기
  let params = useParams();
  console.log(typeof params.task_id); //문자열(string) 은 문자들의 집합
  let task_id = params.task_id;
  let selected_task = {
    title: '',
    desc: '',
  };

  const idx = contents.findIndex((item) => item.id === Number(task_id));
  if (idx === -1) {
    selected_task = { title: 'Sorry', desc: ' Task Not Found' };//tsak/7까지 말고 8/9/...되면 sorry가 나옴
  } else {
    selected_task = contents[idx];
  }
  let task = selected_task;

  return (
    //task.title 쓰려면 위에 let 으로 선언해야 하고, 원래는 selected_task.title로 써야 함
    <div>
      <h3>{task.title}</h3>
      <p>{task.desc}</p>
    </div>
  );
}

// Qna 컴포넌트
function Qna() {
  return (
    <div>
      <h2>Q&A</h2>
      <p>Q&A...</p>
    </div>
  );
}

// App 컴포넌트 (라우터 정의)
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <h1>Frontend 개발자</h1>
        <nav>
          <ul className='menu'>
            <li>
              {/* NavLink는 현재 경로와 일치하면 자동으로 active class가 붙음 */}
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/tasks'>Tasks</NavLink>
            </li>
            <li>
              <NavLink to='/qna'>Qna</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* 수정: /tasks 안에 또 다른 라우트(:task_id)가 들어가기 때문에 * 필요 */}
          <Route path='/task/*' element={<Tasks />} /> {/* 수정 통일해 tasks로 쓰거나 task로 쓰려면 여길 바꾸면 됨 */}
          <Route path='/qna' element={<Qna />} />
        </Routes>
      </div>  
    </BrowserRouter>
  );
}

export default App;
