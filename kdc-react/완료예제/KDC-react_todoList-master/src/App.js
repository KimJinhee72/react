import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Todo from './Todo';

function App() {
  const [todo, setTodo] = useState([]);
  const [todoid, setTodoid] = useState(0);

  const getTodoList = () =>{
    console.log('getTodoList 실행');
    const todoStrFromStorage = window.localStorage.getItem('todo');
    console.log(todoStrFromStorage);
    if(todoStrFromStorage !== null){
      const todoObj = JSON.parse(todoStrFromStorage);
      setTodo(todoObj);
    }
  }
  const setStorage = () =>{
    console.log('setStorage 실행');
    const todoString = JSON.stringify(todo);
    window.localStorage.setItem('todo', todoString);
  }
  useEffect(()=>{
    getTodoList();
  },[])
  useEffect(()=>{
    setStorage(); 
  },[todo])

  const deleteTodo = (id) =>{
    let newTodos = [...todo];
    let index = newTodos.findIndex(item => (item.id === id));
    newTodos.splice(index,1);
    setTodo(newTodos);
  }
  const setChecked = (id, check) =>{
    console.log(id,check);
    let newTodos = [...todo];
    let index = newTodos.findIndex(item => (item.id === id));
    newTodos[index] = {id:id, text:newTodos[index].text, check};
    setTodo(newTodos);
  }
  const update = (id, val) =>{
    console.log(id,val);
    let newTodos = [...todo];
    let index = newTodos.findIndex(item => (item.id === id));
    newTodos[index] = {id:id, text:val, checked:newTodos[index].checked};
    setTodo(newTodos);
  }

  let todos = todo.map((item)=>(
      <Todo key={item.id} data={item} deleteTodo={deleteTodo} setChecked={setChecked} update={update} />
    )
  )
  let addTodo = (value)=>{
    let newTodos = [...todo];
    let newId = todoid + 1;
    setTodoid(newId);
    newTodos.push({id:newId, text:value, checked:false});
    setTodo(newTodos);
    document.getElementById('todo').value = '';
  }
  console.log(todo);
  return (
    <div className="App">
      <h1>Todo List</h1>
      <Form onSubmit={(e)=>{
        e.preventDefault();        
        addTodo(e.target.todo.value);
      }}>
        <Form.Group className="mb-3 d-flex align-items-center gap-3" controlId="todo">
          <Form.Label>Todo Input</Form.Label>
          <Form.Control type="text" name="todo" placeholder="할일을 입력하세요" />
        </Form.Group>      
      </Form>
      <hr/>
      <div>
        {todos}
      </div>
    </div>
  );
}

export default App;
