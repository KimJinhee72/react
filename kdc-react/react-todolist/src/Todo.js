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
    setChecked(data.id, !isChecked);
  };
  console.log(data.id, isChecked);

  // delete 버튼 이벤트
  const todoDelete = () => {
    //(e)와 e.preventDefault();  필요없다 type이 버튼이기 때문
    //지우기 정의하기
    // const deleteTodo = useState('')이렇게 설정할게 아니라 부모가 전달해 줬어야 한다. 맨위 Todo의 매개변수로
    deleteTodo(data.id);
    alert('정말 지우시겠습니까?');
  };

  // 편집 모드/읽기 모드 관리
  // edit 모드(읽기 모드에서 수정모드) 바꿈 담기와 텍스트도 변경하기 useState(안에는 지금 상황을 설정한다 ref처럼) 수정영역보임 초기 설정
  const [mode, setMode] = useState('read');
  const [text, setText] = useState(data.text);

  // 기본 클래스
  let className = 'mb-3 d-flex gap-2';

  // // Edit 버튼 클릭 시 편집 모드로 전환
  // const todoEdit = () => {
  //   setMode('edit');
  // };

  // updateTodo 버튼 클릭 시 읽기 모드로 전환
  const updateTodo = ()=>{}

  // // Cancel 버튼 클릭 시 읽기 모드로 전환
  // const todoCancel = () => setMode('read');

  // 밖에 보이게 생성하라는 return
  return (
    <div key={data.id} className='mb-3'>
      {/* 부트스트랩에서 인풋라벨 + 버튼 가져오기 */}
      {/* <Form.Check // prettier-ignore
        type='checkbox'
        // id와 label은 같이 움직임
        id={data.text}
        label={data.text}
      /> 아래는 인풋과 라벨이 구분됨 클라스명에 {변수명} 넣으면 그게 실행됨*/}
      <Form>
        <Form.Group id={`check-api-${data.id}`}>
          <Form.Check className={mode === 'read' ? className : 'hidden'}>
            <Form.Check.Input type='checkbox' onClick={handleCheckbox} />
            <Form.Check.Label htmlFor={data.text}>{data.text}</Form.Check.Label>
            <Button variant='danger' size='sm' onClick={todoDelete}>
              delete
            </Button>
            <Button variant='info' size='sm' onClick={()=>setMode('edit')}>
              Edit
            </Button>
          </Form.Check>
        </Form.Group>
      </Form>
      <Form>
        <Form.Group
          className={mode === 'edit' ? className : 'hidden'}
          controlId={`edit-todo-${data.id}`}
        >
          <Form.Control type='text' placeholder='HTML을 학습한다.' />
          {/* Update 버튼 (필요시 부모 상태 업데이트) */}
          <Button
            variant='secondary'
            size='sm'
            onClick={() => {
              updateTodo(data.id, text);
              setMode('read');
            }}
          >
            Update
          </Button>

          {/* Cancel 버튼: 읽기 모드로 전환 함수 사용하지 않고 바로 적용 */}
          <Button variant='secondary' size='sm' onClick={()=> setMode('read')}>
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};
// 밖에서도 쓸 수 있게 내보냄
export default Todo;
