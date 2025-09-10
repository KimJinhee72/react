import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Todo from './Todo';
//

function App() {
  // todolist 기본 값은 객체
  const [todo, setTodo] = useState([
    { id: 1, text: 'Learn Web', checked: false },
    { id: 2, text: 'Get a job', checked: false },
  ]);
  // 하나면 매개변수도 () 없고, =>뒤의 값이 {return } 없이 쓰고, return 쓰거나 둘이상 내용 있으면 {return }은 쓴다
  // let todos = todo.map(item => <Todo data={item} /> );
  let todos = todo?.map((item) => {
    // deleteTodo 정의하기
    const deleteTodo = (id) => {
      // 1️⃣ 현재 todo 배열을 복사해서 새로운 배열을 만듭니다.
      // React 상태를 직접 수정하면 안 되므로, 스프레드 연산자를 사용해 불변성을 유지합니다.
      const newTodos = [...todo];

      // 2️⃣ 삭제할 항목의 인덱스를 찾습니다.
      // findIndex는 조건을 만족하는 첫 번째 요소의 index를 반환합니다.
      // 여기서는 id가 매개변수로 넘어온 id와 일치하는 Todo 항목을 찾습니다.
      const index = newTodos.findIndex((item) => item.id === id);

      // 3️⃣ splice를 사용해 해당 인덱스의 항목을 배열에서 제거합니다.
      // splice(index, 1) → index 위치에서 1개의 요소 삭제
      newTodos.splice(index, 1);

      // 4️⃣ React 상태를 업데이트
      // setTodo에 새 배열을 전달하면 컴포넌트가 다시 렌더링되고 화면에서 삭제된 항목이 사라집니다.
      setTodo(newTodos);
    };

    // setChecked 정의(=updateTodo 와 같음) 하기
    const setChecked = (id, chk) => {
      // 1️⃣ 현재 todo 배열을 복사해서 새로운 배열을 만듭니다.
      // React 상태를 직접 수정하면 제대로 반영되지 않기 때문에, 스프레드 연산자를 사용합니다.
      const newTodos = [...todo];

      // 2️⃣ 수정할 항목의 인덱스를 찾습니다.
      // findIndex는 조건을 만족하는 첫 번째 요소의 index를 반환합니다.
      // 여기서는 id가 매개변수로 넘어온 id와 일치하는 Todo 항목을 찾습니다.
      const index = newTodos.findIndex((item) => item.id === id);

      // 3️⃣ 해당 항목을 새 객체로 덮어씁니다.
      // id와 text는 그대로 두고, 체크 상태(chk)만 새로운 값으로 바꿉니다.
      newTodos[index] = {
        id: id, // 기존 id 유지
        text: newTodos[index].text, //  기존 텍스트 유지 (🔉updateTodo와 다른부분)
        chk: chk, // 새로 전달받은 체크 상태로 업데이트
      };

      // 4️⃣ React 상태를 업데이트
      // setTodo에 새 배열을 전달하면 컴포넌트가 다시 렌더링되고 체크 상태가 화면에 반영됩니다.
      setTodo(newTodos);
    };

    // updateTodo 수정 업데이트를 위해 특정 id의 todo를 업데이트
    // const updateTodo = (id, newText) => {
    //   setTodo(todo.map((t) => (t.id === id ? { ...t, text: newText } : t)));
    // };
    const updateTodo = (id, value) => {
      // 1️⃣ 현재 todo 배열을 복사해서 새로운 배열을 생성
      // 배열을 직접 수정하면 React에서 상태 변화를 감지하지 못하기 때문에,
      // 스프레드 연산자(...)를 사용해 새로운 배열을 만들고 작업합니다.
      const newTodos = [...todo];

      // 2️⃣ 수정할 항목의 index를 찾습니다.
      // findIndex는 조건을 만족하는 첫 번째 요소의 인덱스를 반환합니다.
      // 여기서는 id가 매개변수로 넘어온 id와 일치하는 Todo 항목을 찾습니다.
      const index = newTodos.findIndex((item) => item.id === id);

      // 3️⃣ 찾은 인덱스의 항목을 새 객체로 덮어쓰기
      // 기존 항목을 그대로 두지 않고 새로운 객체를 만들어 업데이트합니다.
      // 이때 text를 새 값(value)로 바꾸고, checked 상태는 기존 값을 유지합니다.
      newTodos[index] = {
        id: id, // 기존 id 유지
        text: value, // 새로 입력한 텍스트로 업데이트
        checked: newTodos[index].checked, // 체크 상태 유지
      };

      // 4️⃣ React의 상태를 업데이트
      // setTodo에 새로운 배열을 전달하면 컴포넌트가 다시 렌더링되면서 화면에 반영됩니다.
      setTodo(newTodos);
    };

    // map 돌리면 키값이 필요
    return (
      <Todo
        key={item.id}
        data={item}
        deleteTodo={deleteTodo}
        setChecked={setChecked}
        updateTodo={updateTodo}
      />
    );
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
