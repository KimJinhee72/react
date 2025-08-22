import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Todo = ({data, deleteTodo, setChecked, update})=>{
  const [mode, setMode] = useState('read');
  const [text, setText] = useState(data.text);
  const [isChecked, setIsChecked] = useState(false);

  let className = 'd-flex gap-2';
  let formClass = 'hidden';

  const handleCheckbox = ()=>{
    setIsChecked(!isChecked);
    setChecked(data.id, !isChecked);
  }
  console.log(isChecked);
  const todoDelete = ()=>{
    deleteTodo(data.id);
  }
  if(mode === 'edit'){
    className +=' hidden';
    formClass = '';
  }
  const handleEdit = (val)=>{
    setText(val);
  }
  const updateTodo = (e)=>{
    e.preventDefault();
    update(data.id, text);
    setMode('read');
  }
  return(
    <div>
      <Form.Check id={`check-api-${data.id}`} className={className}>
        <Form.Check.Input type="checkbox" id={`check-api-${data.id}`} onClick={handleCheckbox}/>
        <Form.Check.Label>{data.text}</Form.Check.Label>
        <Button variant="danger" size="sm" onClick={todoDelete}>Delete</Button>        
        <Button variant="info" size="sm" onClick={()=>{
           setMode('edit');
          }}>Edit</Button>        
      </Form.Check>
      <Form className={formClass} onSubmit={updateTodo}>
        <Form.Group className="mb-3 d-flex gap-2" controlId={`edit-todo-${data.id}`}>          
          <Form.Control type="text"  value={text}  onChange={(e)=>{
            handleEdit(e.target.value);
          }}/>
          <Button type="submit" variant="secondary">Update</Button>
          <Button variant="secondary" onClick={()=>{
           setMode('read');
          }}>cancel</Button>
        </Form.Group>       
      </Form>     
      
    </div>
  )
}
export default Todo;