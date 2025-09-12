// 수업내용에서 초기화 더 담고 아이디 정렬
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './App.css';
import Todo from './Todo';
//

function App() {
  // 탑에 항목추가 인풋라인
  const inputRef = useRef(null);

  // 아래 todolist 기본 값은 객체
  // 초기값 늘 고정
  const initialTodos = [
    { id: 1, text: 'Learn Web', checked: false },
    { id: 2, text: 'Get a job', checked: false },
  ];
  const [todo, setTodo] = useState(initialTodos);

  // 목록 다시 초기화
  const handleReset = () => {
    setTodo(initialTodos); // 전체 리스트 초기 상태로 복원
    if (inputRef.current) inputRef.current.value = ''; // input 초기화
  };

  // 하나면 매개변수도 () 없고, =>뒤의 값이 {return } 없이 쓰고, return 쓰거나 둘이상 내용 있으면 {return }은 쓴다
  // let todos = todo.map(item => <Todo data={item} /> );
  let todos = todo?.map((item) => {
    // deleteTodo 정의하기
    // 1️⃣수업내용
    // const deleteTodo = (id) => {
    //   // 1️⃣ 현재 todo 배열을 복사해서 새로운 배열을 만듭니다.
    //   // React 상태를 직접 수정하면 안 되므로, 스프레드 연산자를 사용해 불변성을 유지합니다.
    //   const newTodos = [...todo];

    //   // 2️⃣ 삭제할 항목의 인덱스를 찾습니다.
    //   // findIndex는 조건을 만족하는 첫 번째 요소의 index를 반환합니다.
    //   // 여기서는 id가 매개변수로 넘어온 id와 일치하는 Todo 항목을 찾습니다.
    //   const index = newTodos.findIndex((item) => item.id === id);

    //   // 3️⃣ splice를 사용해 해당 인덱스의 항목을 배열에서 제거합니다.
    //   // splice(index, 1) → index 위치에서 1개의 요소 삭제
    //   newTodos.splice(index, 1);

    //   // 4️⃣ React 상태를 업데이트
    //   // setTodo에 새 배열을 전달하면 컴포넌트가 다시 렌더링되고 화면에서 삭제된 항목이 사라집니다.
    //   setTodo(newTodos);
    // };

    //2️⃣ splice + findIndex 방식 대신, filter(삭제할 항목 제외)와 map(배열을 순회하며 id를 다시 1부터 매김)으로 재정렬하면 코드가 더 간결하고, 삭제 후에도 id가 1, 2, 3…처럼 연속으로 유지. 더 이상 todoid 상태를 관리할 필요도 없음
    const deleteTodo = (id) => {
      // 삭제
      const newTodos = todo.filter((item) => item.id !== id);

      // 삭제 후 id 재정렬 (1,2,3…)
      const reorderedTodos = newTodos.map((item, index) => ({
        ...item,
        id: index + 1,
      }));

      setTodo(reorderedTodos);
    };

    // setChecked 정의(=updateTodo 와 같음) 하기
    const setChecked = (id, chk) => {
      // 1️⃣ 현재 todo 배열을 복사해서 새로운 배열을 만듭니다.
      // React 상태를 직접 수정하면 제대로 반영되지 않기 때문에, 스프레드 연산자를 사용합니다.
      const newTodos = [...todo];

      // 2️⃣ 수정할 항목의 인덱스를 찾습니다.
      // findIndex는 조건을 만족하는 첫 번째 요소의 index를 반환합니다.
      // 여기서는 id가 매개변수로 넘어온 id와 일치하는 Todo 항목을 찾습니다.
      const index = newTodos.findIndex((item) => item.id === id);

      // 3️⃣ 해당 항목을 새 객체로 덮어씁니다.
      // id와 text는 그대로 두고, 체크 상태(chk)만 새로운 값으로 바꿉니다.
      newTodos[index] = {
        id: id, // 기존 id 유지
        text: newTodos[index].text, //  기존 텍스트 유지 (🔉updateTodo와 다른부분)
        chk: chk, // 새로 전달받은 체크 상태로 업데이트
      };

      // 4️⃣ React 상태를 업데이트
      // setTodo에 새 배열을 전달하면 컴포넌트가 다시 렌더링되고 체크 상태가 화면에 반영됩니다.
      setTodo(newTodos);
    };

    // updateTodo 수정 업데이트를 위해 특정 id의 todo를 업데이트
    // const updateTodo = (id, newText) => {
    //   setTodo(todo.map((t) => (t.id === id ? { ...t, text: newText } : t)));
    // };
    const updateTodo = (id, value) => {
      // 1️⃣ 현재 todo 배열을 복사해서 새로운 배열을 생성
      // 배열을 직접 수정하면 React에서 상태 변화를 감지하지 못하기 때문에,
      // 스프레드 연산자(...)를 사용해 새로운 배열을 만들고 작업합니다.
      const newTodos = [...todo];

      // 2️⃣ 수정할 항목의 index를 찾습니다.
      // findIndex는 조건을 만족하는 첫 번째 요소의 인덱스를 반환합니다.
      // 여기서는 id가 매개변수로 넘어온 id와 일치하는 Todo 항목을 찾습니다.
      const index = newTodos.findIndex((item) => item.id === id);

      // 3️⃣ 찾은 인덱스의 항목을 새 객체로 덮어쓰기
      // 기존 항목을 그대로 두지 않고 새로운 객체를 만들어 업데이트합니다.
      // 이때 text를 새 값(value)로 바꾸고, checked 상태는 기존 값을 유지합니다.
      newTodos[index] = {
        id: id, // 기존 id 유지
        text: value, // 새로 입력한 텍스트로 업데이트
        checked: newTodos[index].checked, // 체크 상태 유지
      };

      // 4️⃣ React의 상태를 업데이트
      // setTodo에 새로운 배열을 전달하면 컴포넌트가 다시 렌더링되면서 화면에 반영됩니다.
      setTodo(newTodos);
    };

    // map 돌리면 키값이 필요
    return (
      <Todo
        key={item.id}
        data={item}
        deleteTodo={deleteTodo}
        setChecked={setChecked}
        updateTodo={updateTodo}
      />
    );
  });

  //스토리지 저장
  //1️⃣기본 strorage 저장
  //1️⃣.1️⃣const getTodolist 하용하고, getTodolist는 프로젝트 실행시 한번만 작동하게 됨 초기값때문에 먼저 만든 리스트 세팅됨
  const getTodolist = () => {
    console.log('getTodolist 실행');
    //  스토리지에  todo(이미2개 목록있음)이름의 저장소에 데이터읽기getItem 통해 todoStringFromStorage담기(아직은 문자열)
    const todoStringFromStorage = window.localStorage.getItem('todo');
    // 스토리지에 값이 있는 지 확인
    console.log(todoStringFromStorage); //key:todo는 있고 []빈배열 아직 stringify안해서 배열로 바뀌지 않았음
    //스토리지안은 모두 문자열로 들어와 그것을 쓸 수 있게 JSON.stringify는 객체/배열 → 문자열 변환용이고,반대로 문자열 → 객체/배열은 JSON.parse 를 사용해야 합니다.

    // getTodolist 초기값설정으로 []임, []도 값이 없는 경우가 아닌 빈 배열이니 todoStringFromStorage 있으면 문자열을 쓸수 있는 객체/배열로 변환
    if (todoStringFromStorage) {
      try {
        // JSON.parse으로 문자열 → 객체/배열 만들고
        const todotoArray = JSON.parse(todoStringFromStorage);
        // 배열이 비어있지 않을 때만 덮어쓰기
        if (todotoArray.length > 0) {
          setTodo(todotoArray);
        }
      } catch (error) {
        console.error('로컬스토리지 파싱 오류:', error);
      }
    }
  };

  //컴포넌트가 렌더링될 때 특정 작업(side effect)을 수행하도록 하는 기능 렌더링과 관련된 사이드 이펙트(부수 효과)**를 처리하기 위한 훅
  //마운트(첫화면순간)시 한 번만 실행 or 값이 바뀔 때(업데이트)만 실행 or 데이터 fetching, 이벤트 리스너 등록, 타이머, 로깅 등 거의 모든 "렌더링 외 작업"에 사용
  //언마운트(사라질 때) useEffect에서 return 안 함수(useEffect(() => {console.log("컴포넌트 마운트");  return () => {  console.log("컴포넌트 언마운트!");  };}, []); )
  useEffect(() => {
    getTodolist(); //변동사항 있을 때만 작동
  }, []); //[/* 의존성 배열 */] []마운트 시 한 번만 실행/[count]count가 바뀔 때마다 실행/생략 렌더링될 때마다 매번 실행
  // 렌더링과 관련된 사이드 이펙트(부수 효과)**를 처리하기 위한 훅입니다. 데이터 fetching, 이벤트 리스너 등록, 타이머, 로깅 등 거의 모든 "렌더링 외 작업"에 사용

  // 1️⃣.2️⃣ const getTodolist 하지 않고 바로 useEffect 바로 컴포넌트가 렌더링 될때(리턴될 때) 특정 스토리지 읽기 작업 및 객체/배열(돔에서 사용되게) 로직으로 전환 가능
  // useEffect(() => {
  //   console.log('getTodolist 실행');
  //   const todoStringFromStorage = window.localStorage.getItem('todo');
  //   if (todoStringFromStorage) {
  //     try {
  //       const todoArray = JSON.parse(todoStringFromStorage);
  //       if (todoArray.length > 0) {
  //         setTodo(todoArray);
  //       }
  //     } catch (error) {
  //       console.error('로컬스토리지 파싱 오류:', error);
  //     }
  //   }
  // }, []); // 마운트 시 한 번만 실행

  //2️⃣ setStorage는 todo가 변한값이 있으면 추가할때 그때만 작동해 strorage 저장
  // 2️⃣.1️⃣ const setStorage저장해 활용
  // const setStorage = () => {
  //   //setStorage 언제 실행되는지 확인
  //   console.log('setStorage 실행');
  //   //데이터를 추가하기 위에서 'todo'안을 객체/배열로 만들었기에 문자열로 다시 변화작업이 필요하다.
  //   // 저장소에 저장하려면 문자열로 저장되어야 하니깐 먼저 stringify로 객체/배열을 문자열 변환먼저
  //   const todotoString = JSON.stringify(todo);
  //   // 스토리지에 setItem을 이용해 'todo'에   다른 목록 추가하기
  //   window.localStorage.setItem('todo', todotoString);
  // };

  // 2️⃣.2️⃣ 바로 로직안에서 사용하기
  useEffect(() => {
    // 바로 들어가게 만들기
    console.log('todo 변경, 로컬스토리지 저장');
    // 스토리지에 setItem 이용하여 'todo'안에 추가한 목록을 stringify으로 객체/배열을 문자열로 바꿔 'todo'안에 추가하기(스토리지안 todo에 추가목록이 생김)
    localStorage.setItem('todo', JSON.stringify(todo));
    // setStorage(); // const setStorage하면 사용 가
  }, [todo]); // todo가 바뀔 때 목록이 추가될 때마다 실행

  // 목록 추가하기
  //1️⃣수업내용
  //  const addTodo = (value) => {
  //    const newTodos = [...todo];

  //    // 새 id는 현재 배열 길이 + 1
  //    const newId = newTodos.length + 1;

  //    newTodos.push({
  //      id: newId,
  //      text: value,
  //      checked: false,
  //    });

  //    setTodo(newTodos);
  //    document.getElementById('todo').value = '';
  //  };
  // 2️⃣새로 추가될 때도 항상 연속된 id를 부여하도록 바꿀 수 있게 함(todoid 상태는 더 이상 필요ｘ 항상 map：1부터 연속 부여하ｄｕ 삭제나 추가 후에도 연속 번호 유지)
  const addTodo = (value) => {
    if (!value.trim()) return; // 빈 문자열 입력 방지

    // 기존 todo에 새 항목 추가
    const newTodos = [...todo, { text: value }];

    // id를 1부터 연속으로 재정렬
    const reorderedTodos = newTodos.map((item, index) => ({
      id: index + 1,
      ...item,
      checked: item.checked || false, // 기존 체크 상태 유지, 새 항목은 false
    }));

    setTodo(reorderedTodos);

    // 입력창 초기화
    document.getElementById('todo').value = '';
  };

  return (
    <div className='App'>
      <h1>Todo List</h1>
      {/* 항목추가 라인-인풋 라인 */}
      {/* Form 전송이벤트 넣어야 아래줄 추가 */}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          // e.target.todo.value 폼에 제출되는(e)에 타겟되는 todo(폼컨트롤에 name)의 valuex`
          console.log(e.target.todo.value);
          addTodo(e.target.todo.value);
        }}
      >
        <Form.Group className='mb-3 d-flex align-items-center gap-3' controlId='todo'>
          <Form.Label style={{ marginBottom: 0 }}>Todo Input</Form.Label>

          <Form.Control
            type='text'
            name='todo'
            placeholder='추가 할 할일을 입력하세요'
            ref={inputRef} // ref 연결
            style={{ flexGrow: 1, minWidth: '200px' }} // input은 남는 공간 채우기
          />

          <Button
            variant='success'
            type='button'
            style={{
              width: 'auto', // 내용만큼 폭
              display: 'inline-flex', // 아이콘+텍스트 가로 정렬
              alignItems: 'center', // 아이콘 세로 가운데
              gap: '4px', // 아이콘과 텍스트 간격
              whiteSpace: 'nowrap', // 텍스트 줄바꿈 방지
            }}
            onClick={handleReset}
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
            초기화
          </Button>
        </Form.Group>
      </Form>
      <hr />
      <div>{todos}</div>
    </div>
  );
}

export default App;
