import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Todo from './Todo';
//

function App() {
  // todolist 기본 값은 배열
  const [todo, setTodo] = useState([
    { id: 1, text: 'Learn Web', checked: false },
    { id: 2, text: 'Get a job', checked: false },
  ]);
  // 하나면 매개변수도 () 없고, =>뒤의 값이 {return } 없이 쓰고, return 쓰거나 둘이상 내용 있으면 {return }은 쓴다
  // let todos = todo.map(item => <Todo data={item} /> );
  let todos = todo?.map((item) => {
    // map 돌리면 키값이 필요
    return <Todo key={item.id} data={item} />;
  });

  const [todoid, setTodoId] = useState(2);
  // 목록 추가하기
  const addTodo = (value) => {
    // ...스프레드 연산자를 이용하여 복사본 만들기(복사본 만드는 방법:array.from / concat으로도 가능)
    const newTodos = [...todo];
    // todoid 2개 항목을 1더 추가
    const newId = todoid + 1;
    // newId가 3으로 바뀌니 todo의 id도 바꾸기
    setTodoId(newId); //todoId가 3이됨
    // todo의 id도 바꾸니 newTodos에 넣어 변경하기
    newTodos.push({
      //id:todoid 쓰면 업데이트 되기 전이기에 id가 3이 되지 않아 newId로 써야함(에러메시지도 뜸) {}쓰지 않아야 바로 반영됨 아니면{안에서 반영됨}
      id:  newId,
      text: value,
      checked: false,
    }); //id:3 / text:쓴내용 /체크박스체크 없음
    // 추가 내용도 푸시 되었으니 setTodo에 로드하기
    setTodo(newTodos);
    document.getElementById('todo').value = ''
  };
console.log(todo, todoid);

  return (
    <div className='App'>
      <h1>Todo List</h1>
      {/* Form 전송이벤트 넣어야 아래줄 추가 */}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          // e.target.todo.value 폼에 제출되는(e)에 타겟되는 todo(폼컨트롤에 name)의 valuex`
          console.log(e.target.todo.value);
          addTodo(e.target.todo.value);
        }}
      >
        <Form.Group className='mb-3 d-flex align-items-center gap-3' controlId='todo'>
          <Form.Label>Todo Input</Form.Label>
          <Form.Control type='text' name='todo' placeholder='할일을 입력하세요' />
        </Form.Group>
      </Form>
      <hr />
      <div>{todos}</div>
    </div>
  );
}

export default App;
