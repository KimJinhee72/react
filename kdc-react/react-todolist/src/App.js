import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Todo from './Todo';

function App() {
  // input ref
  const inputRef = useRef(null);
  const categoryRef = useRef(null);

  // input 포커스 상태 관리
  const [focusedCategory, setFocusedCategory] = useState(null);

  // Basicset 버튼 기본 todo 세팅값
  const todoSets = {
    스케줄: [
      { id: 1, text: '7시 친구 만나기', checked: false },
      { id: 2, text: '9시 강아지 산책', checked: false },
    ],
    업무: [
      { id: 1, text: 'Meeting 준비', checked: false },
      { id: 2, text: '보고서 작성', checked: false },
    ],
    배우기: [
      { id: 1, text: 'Learn Web', checked: false },
      { id: 2, text: 'Get a job', checked: false },
    ],
  };
  // Basicset 버튼 기본set 클릭이벤트
  const handleBasicResettodoList = () => {
    if (window.confirm('정말 기본 설정으로 되돌릴까요?')) {
      // 1. todos 상태를 초기 todoSets 객체로 설정
      setTodos(todoSets);

      // 2. categoryInputs 상태도 초기화
      // todos의 키(카테고리 이름)를 가져와서 categoryInputs 상태에 반영
      const initialCategoryInputs = Object.keys(todoSets).reduce((acc, cat) => {
        acc[cat] = cat;
        return acc;
      }, {});
      setCategoryInputs(initialCategoryInputs);
    }
  };

  // 전체 상태
  const [todos, setTodos] = useState(todoSets);

  // 입력 초기화 x
  // 입력 초기화 함수 (ref 또는 category/state 둘 다 지원)
  const handleResetInput = ({ ref = null, category = null, setState = null }) => {
    // 1️⃣ ref가 있으면 직접 input 초기화
    if (ref && ref.current) {
      ref.current.value = '';
    }

    // 2️⃣ state 기반이면 해당 category 초기화
    if (category && setState) {
      setState((prev) => ({ ...prev, [category]: '' }));
    }
  };

  // 항목 추가+
  const addTodo = (category, text) => {
    if (!text.trim()) return;

    setTodos((prev) => {
      const catTodos = prev[category] || [];
      const newItem = { id: catTodos.length + 1, text, checked: false };
      return { ...prev, [category]: [...catTodos, newItem] };
    });

    handleResetInput({});
  };

  //카테고리 삭제
  const [hoverCategory, setHoverCategory] = useState(null);

  // 카테고리 입력값 state
  const [categoryInputs, setCategoryInputs] = useState(
    Object.keys(todos).reduce((acc, cat) => ({ ...acc, [cat]: cat }), {})
  );

  // 카테고리 인풋 변경
  const handleCategoryChange = (cat, value) => {
    setCategoryInputs((prev) => ({ ...prev, [cat]: value }));
  };

  // 카테고리 인풋 초기화
  const handleResetCategoryInput = (cat) => {
    setCategoryInputs((prev) => ({ ...prev, [cat]: cat }));
  };

  // 카테고리 추가
  const handleAddCategory = () => {
    // 새 카테고리 이름 자동 생성 (예: "새 카테고리 1")
    let newName = '새 카테고리';
    let i = 1;
    while (todos[newName + (i > 1 ? ` ${i}` : '')]) i++;
    newName = newName + (i > 1 ? ` ${i}` : '');

    // 상태 업데이트
    setTodos((prev) => ({
      ...prev,
      [newName]: [], // 새 카테고리 빈 배열
    }));

    setCategoryInputs((prev) => ({
      ...prev,
      [newName]: newName, // 새 카테고리 이름
    }));
  };
  // 카테고리 이름을 바로 셀렉트에 반영할 함수
 const handleUpdateCategoryName = (oldName, newName) => {
   // 새로운 이름이 기존 이름과 같거나 비어있으면 아무것도 하지 않음
   if (oldName === newName || newName.trim() === '') {
     // 입력 필드를 원래 이름으로 되돌림
     setCategoryInputs((prev) => ({ ...prev, [oldName]: oldName }));
     return;
   }

   // todos 상태 업데이트
   setTodos((prevTodos) => {
     const newTodos = {};
     Object.keys(prevTodos).forEach((key) => {
       if (key === oldName) {
         newTodos[newName] = prevTodos[key];
       } else {
         newTodos[key] = prevTodos[key];
       }
     });
     return newTodos;
   });

   // categoryInputs 상태 업데이트
   setCategoryInputs((prevInputs) => {
     const newInputs = { ...prevInputs };
     newInputs[newName] = newInputs[oldName];
     delete newInputs[oldName];
     return newInputs;
   });
 };

  // 카테고리 삭제
  const handleDeleteCategory = (cat) => {
    if (window.confirm(`${cat} 카테고리를 삭제할까요?`)) {
      const updatedTodos = { ...todos };
      delete updatedTodos[cat];
      setTodos(updatedTodos);

      const updatedInputs = { ...categoryInputs };
      delete updatedInputs[cat];
      setCategoryInputs(updatedInputs);
    }
  };

  // 전체 초기화 함수
  const handleResettodoList = () => {
    if (window.confirm('정말 처음 상태로 되돌릴까요?')) {
      const firstCategory = Object.keys(todos)[0]; // 첫 번째 카테고리만 선택

      // todos 상태: 첫 번째 카테고리만 빈 배열로 초기화
      setTodos({
        [firstCategory]: [],
      });

      // 카테고리 입력값 상태도 첫 번째 카테고리만 남기고 초기화
      setCategoryInputs({
        [firstCategory]: firstCategory, // 라벨로 카테고리 이름 그대로 유지
      });

      // 포커스/호버 초기화
      setFocusedCategory(null);
      setHoverCategory(null);
    }
  };

  // 항목 삭제
  const deleteTodo = (category, id) => {
    setTodos((prev) => {
      const newCat = prev[category]
        .filter((item) => item.id !== id)
        .map((item, index) => ({ ...item, id: index + 1 }));
      return { ...prev, [category]: newCat };
    });
  };

  // 체크 상태 변경
  const setChecked = (category, id, checked) => {
    setTodos((prev) => {
      const newCat = prev[category].map((item) => (item.id === id ? { ...item, checked } : item));
      return { ...prev, [category]: newCat };
    });
  };

  // 텍스트 업데이트
  const updateTodo = (category, id, text) => {
    setTodos((prev) => {
      const newCat = prev[category].map((item) => (item.id === id ? { ...item, text } : item));
      return { ...prev, [category]: newCat };
    });
  };

  // 로컬스토리지 저장/불러오기
  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) setTodos(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className='App' style={{ padding: '20px', maxWidth: '600px' }}>
      <div className='d-flex justify-content-between'>
        <h1>Todo List</h1>
        <div>
          <Button
            type='button'
            variant='outline-danger'
            style={{
              width: 'auto', // 내용만큼 폭
              display: 'inline-flex', // 아이콘+텍스트 가로 정렬
              alignItems: 'center', // 아이콘 세로 가운데
              gap: '4px', // 아이콘과 텍스트 간격
              whiteSpace: 'nowrap', // 텍스트 줄바꿈 방지
            }}
            onClick={handleResettodoList}
          >
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
              className='icon icon-tabler icon-tabler-rotate-clockwise'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5' />
            </svg>
            Reset
          </Button>
          <Button
            type='button'
            variant='warning'
            style={{
              width: 'auto', // 내용만큼 폭
              display: 'inline-flex', // 아이콘+텍스트 가로 정렬
              marginLeft: '8px',
              alignItems: 'center', // 아이콘 세로 가운데
              gap: '4px', // 아이콘과 텍스트 간격
              whiteSpace: 'nowrap', // 텍스트 줄바꿈 방지
            }}
            onClick={handleBasicResettodoList}
          >
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
              className='icon icon-tabler icon-tabler-rotate-clockwise'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5' />
            </svg>
            Basicset
          </Button>
        </div>
      </div>

      {/* 할일입력 폼(list) */}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const text = e.target.todo.value;
          const category = e.target.category.value;
          addTodo(category, text);
          // 인풋 비우기
          if (inputRef.current) inputRef.current.value = '';
        }}
        className='w-100 mb-4 d-flex gap-2 '
      >
        {/* 영역선택 */}
        <Form.Select
          name='category'
          ref={categoryRef}
          className='sameCatInput'
          style={{
            width: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap',
          }}
        >
          {Object.keys(todos).map((cat) => (
            <option key={cat} value={cat}>
              {categoryInputs[cat] || cat}
            </option>
          ))}
        </Form.Select>
        {/* 입력 인풋 */}
        <div style={{ position: 'relative', width: '100%' }}>
          <Form.Control
            type='text'
            name='todo'
            placeholder='할일 입력'
            ref={inputRef}
            onChange={(e) => handleCategoryChange(inputRef, e.target.value)}
            onFocus={() => setFocusedCategory(inputRef)}
            onBlur={() => setFocusedCategory(null)}
            style={{ paddingRight: '30px' }}
          />
          {focusedCategory === inputRef && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              className='icon icon-tabler icons-tabler-outline icon-tabler-x'
              style={{
                position: 'absolute',
                top: '50%',
                right: '8px',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#666',
              }}
              onMouseDown={(e) => {
                e.preventDefault(); // blur 방지
                handleResetInput({ ref: inputRef });
                handleResetCategoryInput({ ref: inputRef });
              }}
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M18 6l-12 12' />
              <path d='M6 6l12 12' />
            </svg>
          )}
        </div>
        <Button
          type='submit'
          variant='success'
          style={{
            width: 'auto', // 내용만큼 폭
            display: 'inline-flex', // 아이콘+텍스트 가로 정렬
            paddingLeft: '11px',
            paddingRight: '11px',
            alignItems: 'center', // 아이콘 세로 가운데
            gap: '2px', // 아이콘과 텍스트 간격
            whiteSpace: 'nowrap', // 텍스트 줄바꿈 방지
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            className='icon icon-tabler icons-tabler-outline icon-tabler-playlist-add'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M19 8h-14' />
            <path d='M5 12h9' />
            <path d='M11 16h-6' />
            <path d='M15 16h6' />
            <path d='M18 13v6' />
          </svg>
          <span style={{ letterSpacing: '2px' }}> ListUp </span>
        </Button>
      </Form>
      <hr />
      {/* 세트별 Todo 리스트 */}
      {Object.keys(todos).map((category, index, arr) => (
        <React.Fragment key={category}>
          <div
            className='categoryArea'
            style={{
              border: '1px solid transparent', // 기본 border
              borderRadius: '10px',
              padding: '10px', // hover일 때 패딩 10px
              ...(hoverCategory === category && {
                backgroundColor: '#f5f5f5', // 예시로 배경색 추가 가능
              }),
              marginBottom: '20px',
              position: 'relative',
            }}
            onMouseEnter={() => setHoverCategory(category)}
            onMouseLeave={() => setHoverCategory(null)}
          >
            {/* 카테고리 타이틀 및 카테고리 삭제 줄 */}
            <div className='d-flex justify-content-between align-items-center w-100 h-100'>
              {/* 카테고리 인풋 */}
              <div key={category} style={{ position: 'relative', marginBottom: '20px' }}>
                <Form.Control
                  type='text'
                  value={categoryInputs[category] || category}
                  onChange={(e) => handleCategoryChange(category, e.target.value)}
                  onFocus={() => setFocusedCategory(category)}
                  onBlur={() => {
                    // 포커스를 잃었을 때, todos 상태 업데이트
                    handleUpdateCategoryName(category, categoryInputs[category]);
                    setFocusedCategory(null);
                  }}
                  onKeyPress={(e) => {
                    // 엔터 키를 눌렀을 때
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleUpdateCategoryName(category, categoryInputs[category]);
                      // 엔터 입력 후 포커스 해제
                      e.target.blur();
                    }
                  }}
                  className='sameSelectNm'
                  style={{
                    border: 'none',
                    paddingRight: '30px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                  }}
                />
                {/* Todo 항목 리스트는 비어 있음 */}
                {todos[category].length === 0 && <span></span>}
                {/* X 버튼: 현재 포커스된 카테고리와 일치할 때만 표시 */}
                {focusedCategory === category && (
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
                      right: '3%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: '#666',
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault(); // blur 방지
                      handleResetCategoryInput(category);
                    }}
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M18 6l-12 12' />
                    <path d='M6 6l12 12' />
                  </svg>
                )}
              </div>
              {/* 카테고리 추가삭제 svg와 말풍선 */}
              <div
                className='d-flex justify-content-evenly'
                style={{ width: '12%', height: '40px', marginBottom: '20px' }}
              >
                {/* 카테고리 추가 버튼 */}
                <OverlayTrigger
                  placement='top' // 말풍선 위치: top, bottom, left, right 가능
                  overlay={<Tooltip id={`tooltip-${category}`}>카테고리 추가</Tooltip>}
                >
                  <div
                    style={{ width: '100%', height: '100%', position: 'relative' }}
                    onClick={handleAddCategory}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      role='button' // 접근성: 버튼 역할
                      fill='green'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='plusSvg'
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        borderRadius: '0',
                        padding: '0',
                        color: hoverCategory === category ? 'green' : '#666',
                        cursor: 'pointer',
                      }}
                    >
                      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                      <path d='M12 5l0 14' />
                      <path d='M5 12l14 0' />
                    </svg>
                  </div>
                </OverlayTrigger>
                {/* 카테고리 삭제 */}
                <OverlayTrigger
                  placement='top' // 말풍선 위치: top, bottom, left, right 가능
                  overlay={<Tooltip id={`tooltip-${category}`}>카테고리 삭제</Tooltip>}
                >
                  <div
                    style={{ width: '100%', height: '100%', position: 'relative' }}
                    onClick={() => handleDeleteCategory(category)}
                  >
                    {/* 카테고리 삭제 버튼 */}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      role='button' // 접근성: 버튼 역할
                      tabIndex='0' // 키보드 탭 포커스 가능
                      fill='green'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='minusBtn'
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        width: '15px',
                        height: '2px',
                        borderRadius: '0',
                        padding: '0',
                        backgroundColor: hoverCategory === category ? 'red' : '#666',
                      }}
                    >
                      <path stroke='red' d='M0 0h24v24H0z' fill='none' />
                      <path d='M5 12l14 0' />
                    </svg>
                  </div>
                </OverlayTrigger>
              </div>
            </div>
            {/* Todo 리스트 */}
            {todos[category].map((item) => (
              <Todo
                key={`${category}-${item.id}`}
                data={item}
                deleteTodo={(id) => deleteTodo(category, id)}
                setChecked={(id, checked) => setChecked(category, id, checked)}
                updateTodo={(id, text) => updateTodo(category, id, text)}
              />
            ))}
          </div>
          {/* 마지막 카테고리에는 hr 빼기 */}
          {index !== arr.length - 1 && <hr className='lastHr' />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default App;
