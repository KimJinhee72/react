import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useParams
} from "react-router-dom";

function Home(){
  return(
    <>
      <header>
        <h2>프론트엔드 개발자 역할</h2>
        <p>기본언어인 html, css, javascript부터 학습합니다.</p>
      </header>
      <nav>        
        <Link to="/tasks">Tasks</Link>
        <Link to="/qna">Qna</Link>
      </nav>
    </>
  );
}

let contents = [
  {id:1, title:'UI/UX 개발', desc:'사용자 인터페이스와 사용자가 웹사이트를 이용하면 느끼고 생각하는 총체적 경험을 개발 '},
  {id:2, title:'재사용이 가능한 UI 개발', desc:'앵귤러, 리엑트, 뷰등의 자바스크립트 프레임워크를 가지고 재사용할 수 있는 UI를 만든다. '},
  {id:3, title:'애니메이션 구현', desc:'CSS 또는 javascript를 사용해 다양한 효과의 애니메이션 구현한다. '}
]
function Task(){
  let params = useParams();
  let task_id = params.task_id;
  console.log(task_id);

  let selected_task = { 
    title:'Sorry',
    description:'Not Found'
  };

  const idx = contents.findIndex(item=>(item.id === Number(task_id)));
  selected_task = contents[idx];

  return(
    <div>
      <h3>{selected_task.title}</h3> 
      <p>{selected_task.desc}</p>
    </div>
  );
}

function Tasks(){
  let list = [];
  contents.forEach((item,idx)=>{
    list.push(
      <li key={item.id}><NavLink to={"/tasks/"+item.id}>{item.title}</NavLink></li>
    );
  });
  return(
    <div>
      <h2>Tasks</h2>
      <p>프론트엔드 개발자의 역할은...</p>
      <nav>
        <ul>
          {list}
        </ul>        
      </nav>
      <Routes>           
        <Route path=":task_id" element={ <Task /> } />                 
      </Routes>      
    </div>
  );
}
function Qna(){
  return(
    <div>
      <h2>QnA</h2>
      <p>QnA...</p>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <h1>Hello React Router DOM</h1>
      <nav>
        <ul className='menu'>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/tasks">Tasks</NavLink></li>
          <li><NavLink to="/qna">Qna</NavLink></li>
        </ul>        
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks/*" element={<Tasks />} />
        <Route path="/qna" element={<Qna />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
