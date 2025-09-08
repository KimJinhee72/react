import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
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
    // deleteTodo 정의하기
    const deleteTodo = (id) => {
      const newTodos = [...todo];
      // splice와 index(복사한 newTodo findindex 매개변수.id가 deleteTodo의 매개변수(id)와 일치 담아)를 이용해 복사본 해당 값을 지울수 있고, 그걸 setTodo함
      const index = newTodos.findIndex((item) => item.id === id);
      newTodos.splice(index, 1); //newTodo한 index 1하나 삭제
      setTodo(newTodos);
    };
    // setChecked 정의(=deleteTodo 와 같음) 하기
    const setChecked = (id, chk) => {
      const newTodos = [...todo];
      // splice와 index(복사한 newTodo findindex 매개변수.id가 deleteTodo의 매개변수(id)와 일치 담아)를 이용해 복사본 해당 값을 지울수 있고, 그걸 setTodo함
      const index = newTodos.findIndex((item) => item.id === id);
      newTodos[index] = { id: id, text: newTodos[index].text, chk };
      setTodo(newTodos);
    };
    // map 돌리면 키값이 필요
    return <Todo key={item.id} data={item} deleteTodo={deleteTodo} setChecked={setChecked} />;
  });

  const [todoid, setTodoId] = useState(2);
  // 목록 추가하기
  const addTodo = (value) => {
    // ...스프레드 연산자를 이용하여 복사본 만들기(복사본 만드는 방법:array.from / concat으로도 가능)
    const newTodos = [...todo];
    //  todoid 2개 항목을 1더 추가
    const newId = todoid + 1;
    // newId가 3으로 바뀌니 todo의 id도 바꾸기
    setTodoId(newId); //todoId가 3이됨
    // todo의 id도 바꾸니 newTodos에 넣어 변경하기
    newTodos.push({
      //id:todoid 쓰면 업데이트 되기 전이기에 id가 3이 되지 않아 newId로 써야함(에러메시지도 뜸) {}쓰지 않아야 바로 반영됨 아니면{안에서 반영됨}
      id: newId,
      text: value,
      checked: false,
    }); //id:3 / text:쓴내용 /체크박스체크 없음
    // 추가 내용도 푸시 되었으니 setTodo에 로드하기
    setTodo(newTodos);
    document.getElementById('todo').value = '';
  };
  console.log(todo);

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
