import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const Todo = ({ data, deleteTodo, setChecked, updateTodo }) => {
  const [isChecked, setIsChecked] = useState(data.checked);
  const [mode, setMode] = useState('read');
  const [text, setText] = useState(data.text);

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
    setChecked(data.id, !isChecked);
  };

  return (
    <div className='mb-2 d-flex align-items-center gap-2'>
      {/* 읽기 모드 */}
      {mode === 'read' && (
        <>
          {/* 체크박스 */}
          <Form.Check
            type='checkbox' // 체크박스 타입 지정
            checked={isChecked} // 체크 상태를 isChecked 상태 값으로 제어 (controlled component)
            onChange={handleCheckbox} // 체크박스 상태 변경 시 handleCheckbox 함수 호출
            style={{
              display: 'inline-block', // 기본적으로 inline-block으로 표시해서 span과 같은 줄에 나오게 함
              marginRight: '8px', // 체크박스와 텍스트 사이 간격
            }}
          />

          {/* 체크 여부에 따라 줄긋기 적용되는 텍스트 */}
          <span
            style={{
              flexGrow: 1, // 가로 공간을 최대한 차지하도록 설정 (flexbox 안에서)
              textDecoration: isChecked ? 'line-through' : 'none', // 체크되면 줄긋기, 아니면 원래 상태
            }}
          >
            {text} 
          </span>

          <Button variant='outline-info' size='sm' onClick={() => setMode('edit')}>
            Edit
          </Button>
          <Button variant='outline-danger' size='sm' onClick={() => deleteTodo(data.id)}>
            Delete
          </Button>
        </>
      )}

      {/* 편집 모드 */}
      {mode === 'edit' && (
        <>
          <Form.Control
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ flexGrow: 1 }}
          />
          <Button
            variant='secondary'
            size='sm'
            onClick={() => {
              updateTodo(data.id, text);
              setMode('read');
            }}
          >
            Save
          </Button>
          <Button variant='secondary' size='sm' onClick={() => setMode('read')}>
            Cancel
          </Button>
        </>
      )}
    </div>
  );
};

export default Todo;
