import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Todo from './Todo';

function App() {

  const [todoid, setTodoid] = useState(0);
  const [todo,setTodo] = useState([]);

  const getTodoList = ()=>{
    let todoListFromStorage = window.localStorage.getItem('todo');
    console.log(todoListFromStorage);
    if(todoListFromStorage !== null){ //todoListFromStorage의 값은 string
      //값이 있다면 
      const todoObj = JSON.parse(todoListFromStorage);      
      let lastId = todoObj[todoObj.length-1].id;
      setTodo(todoObj);
      setTodoid(lastId);        
    } 
  }
  useEffect(()=>{
    getTodoList(); //첫 렌더링때 한번만 실행
  },[])

  let todos = null;

  const deleteTodo = (id) =>{
    let newTodos = [...todo];
    let index = newTodos.findIndex(item=>(item.id === id));
    newTodos.splice(index,1);
    setTodo(newTodos);
  }
  const update = (id,val)=>{
    let newTodos = [...todo];
    let index = newTodos.findIndex(item=>(item.id === id));
    newTodos[index] = {id:id, text:val, checked:false};
    setTodo(newTodos);
  }
  if(todo !== null){
    todos = todo.map(item=>(
      <Todo data={item} key={item.id} deleteTodo={deleteTodo} update={update} />
    ));
  }

  let addTodo = (value)=>{
    console.log(value);
    let newTodos = [...todo];
    let newId = todoid + 1;
    setTodoid(newId);
    newTodos.push({id:newId, text:value, checked:false});
    setTodo(newTodos);
    document.getElementById('todo').value='';
  }
  const setStorage = () =>{
    const todoString = JSON.stringify(todo);
    window.localStorage.setItem('todo', todoString);
    console.log('storage 저장');
  }

  useEffect(()=>{
    setStorage(); //첫 렌더링때 한번 실행후, todo가 변경될때 마다 실행
  },[todo])

  return (
    <>
      <div className="container">
        <h1>Todo list</h1>
        <Form onSubmit={e=>{
          e.preventDefault();
          // console.log(e.target.todo.value);
          addTodo(e.target.todo.value);
        }}>
          <Form.Group className="mb-3" controlId="todo">
            <Form.Label>Todo Input</Form.Label>
            <Form.Control type="text" name="todo" placeholder="할일을 입력하세요" />
          </Form.Group>          
        </Form>   
        <hr/>
        <div>
          {todos}
        </div>  
      </div>

    </>
  );
}

export default App;