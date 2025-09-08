import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

// <Todo data={item} deleteTodo={deleteTodo}/> 설정한 것
const Todo = ({ data, deleteTodo, setChecked }) => {
  // check여부 담기
  const [isChecked, setIsChecked] = useState(false);
  // 인풋 체크 클릭이벤트
  const handleCheckbox = () => {
    setIsChecked(!isChecked);
     setChecked(data.id, !isChecked );
  };
  console.log(data.id ,isChecked);

  // delete여부 담기
  const [isDeleted, setIsDeleted] = useState(false);
  // delete 버튼
  const todoDelete = () => {
    //(e)와 e.preventDefault();  필요없다 type이 버튼이기 때문
    //지우기 정의하기
    // const deleteTodo = useState('')이렇게 설정할게 아니라 부모가 전달해 줬어야 한다. 맨위 Todo의 매개변수로
    deleteTodo(data.id);
    alert('정말 지우시겠습니까?');
  };

  // edit 여부담기
  const todoEidt
  // edit 버튼

  // 밖에 보이게 생성하라는 return
  return (
    <div key={data.id} className='mb-3'>
      {/* 부트스트랩에서 인풋라벨 + 버튼 가져오기 */}
      {/* <Form.Check // prettier-ignore
        type='checkbox'
        // id와 label은 같이 움직임
        id={data.text}
        label={data.text}
      /> 아래는 인풋과 라벨이 구분됨 */}
      <Form.Check id={`check-api-${data.id}`}>
        <Form.Check.Input type='checkbox' id={`check-api-${data.id}`} onClick={handleCheckbox} />
        <Form.Check.Label htmlFor={data.text}>{data.text}</Form.Check.Label>
        <Button variant='danger' size='sm' onClick={todoDelete}>
          delete
        </Button>
        <Button variant="info" size='sm' onClick={todoEdit}>Edit</Button>
      </Form.Check>
    </div>
  );
};
// 밖에서도 쓸 수 있게 내보냄
export default Todo;
