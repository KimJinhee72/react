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
            autoFocus={false} // 기본 자동 포커스 제거
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
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <Form.Control
              type='text'
              value={text}
              autoFocus={false} // 기본 자동 포커스 제거
              onChange={(e) => setText(e.target.value)}
              style={{ flexGrow: 1, paddingRight: '2.5rem' }}
              onKeyPress={(e) => {
                // 엔터 키를 눌렀을 때
                if (e.key === 'Enter') {
                  e.preventDefault(); // 폼 제출 기본 동작 방지
                  updateTodo(data.id, text); // todo 텍스트 업데이트
                  setMode('read'); // 읽기 모드로 변경
                }
              }}
            />
            {/* 텍스트가 있을 때만 X 버튼 표시 */}
            {text && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#666',
                }}
                onClick={() => setText('')} // 클릭하면 텍스트를 빈 문자열로 설정
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M18 6l-12 12' />
                <path d='M6 6l12 12' />
              </svg>
            )}
          </div>
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
