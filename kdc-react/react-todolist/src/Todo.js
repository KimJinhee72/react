import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Form from 'react-bootstrap/Form';

// <Todo data={item}/> 설정한 것
const Todo = ({data})=>{
  // 밖에 보이게 생성하라는 return
  return (
    <div key={data.id} className='mb-3'>
      <Form.Check // prettier-ignore
        type='checkbox'
        // id와 label은 같이 움직임
        id={data.text}
        label={data.text}
      />
    </div>
  );
}
// 밖에서도 쓸 수 있게 내보냄
export default Todo;
