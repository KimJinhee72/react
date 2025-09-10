import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

// <Todo data={item} deleteTodo={deleteTodo} setChecked={setChecked} updateTodo={updateTodo}/> Todo.js의 매개변수에 props로 받은 data, deleteTodo, setChecked, updateTodo 로 받은 함수 안에 전체 내용 담기 지금은 Todo.js이니
const Todo = ({ data, deleteTodo, setChecked, updateTodo }) => {
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
    if (window.confirm('정말 지우시겠습니까?')) deleteTodo(data.id);
  };

  // 편집 모드/읽기 모드 관리
  // edit 모드(읽기 모드에서 수정모드) 바꿈 담기와 텍스트도 변경하기 useState(안에는 지금 상황을 설정한다 ref처럼) 수정영역보임 초기 설정
  const [mode, setMode] = useState('read');
  const [text, setText] = useState(data.text || ''); //useState 초기값을 빈 문자열로 undefined 방지 → 항상 controlled input되게 아니면 value={text ?? ""} 바꾸던지

  // 기본 클래스
  let className = 'mb-3 d-flex gap-2';

  // // Edit 버튼 클릭 시 편집 모드로 전환
  // const todoEdit = () => {
  //   setMode('edit');
  // };

  // input 입력값(newtxt=e.tartget.value)을 함수 handleEdit써 새롭게 업데이트 되게 setText(입력갑수-newtxt) setText를 호출하면 React에게 "text 값을 newValue로 바꿔줘!" 라고 요청하는 거예요.React는 text를 새 값으로 바꾸고, 해당 컴포넌트를 다시 렌더링
  const handleEdit = (newtxt) => {
    setText(newtxt);
  };

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
            {/* 항목내용수정 */}
            <Button variant='info' size='sm' onClick={() => setMode('edit')}>
              Edit
            </Button>
            {/* 항목지우기 */}
            <Button variant='danger' size='sm' onClick={todoDelete}>
              delete
            </Button>
          </Form.Check>
        </Form.Group>
      </Form>
      <Form>
        <Form.Group
          className={mode === 'edit' ? className : 'hidden'}
          controlId={`edit-todo-${data.id}`}
        >
          {/* value={text} 쓰려면 value={text ?? ""}쓰거나 onchange를 써야함  */}
          <Form.Control
            type='text'
            value={text}
            onChange={(e) => {
              // e(e는 이벤트 객체(event object) onChange가 발생하면 React가 자동으로 e 내용을 넘겨줌)의 매개변수 써 입력한 값이 뭔지 알아야 해서 input ＝e.target
              // 에서 e.target.value 실제로 입력한 값 handleEdit 함수에 사용자가 입력한 값을 전달해서 상태를 바꾸거나, 저장하는 역할
              // onChange는 입력할 때마다 실행
              handleEdit(e.target.value);
            }}
          />
          {/* Update 버튼 (필요시 부모 상태 업데이트)data.id, text 업데이트하고  update버튼 누르면 업데이트 되어 read 모드로 바뀌기 */}
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
          <Button variant='secondary' size='sm' onClick={() => setMode('read')}>
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};
// 밖에서도 쓸 수 있게 내보냄
export default Todo;
