'use client';

// cspell:disable
import './App.css';
import { Component, useState } from 'react';

// 헤더컴포넌트 생성
import Myheader from './component/Myheader';
// 네비게이션 컴포넌트 생성
import Mynav from './component/Mynav';
// 아티클 컴포넌트 생성
import ReadArticle from './component/ReadArticle';
// CreateArticle 컴포넌트 생성
import CreateArticle from './component/CreateArticle';
// UpdateArticle 컴포넌트 생성
import UpdateArticle from './component/UpdateArticle';

// 함수형 중 const App = () => { ... } 안에서
// function App() { ... }으로도 가능   function App() { ... }  ->  const App = () => { ... }
// 함수형 컴포넌트에서는 render() 메소드가 없음 -> return() 안에 JSX 코드 작성
// 함수형 컴포넌트에서는 this.state가 없음 -> useState() 훅 사용
// 함수형 컴포넌트에서는 this.props가 없음 -> props를 함수 매개변수로 전달받음
// 함수형 컴포넌트에서는 생명주기 메소드가 없음(constructor() → 상태 초기화, 바인딩 render() → JSX 반환 등) -> useEffect() 훅 사용
const App = () => {
  //배열은 보기쉽게 let변수로 빼기
  let max_menu_id = 3; // 메뉴의 최대 ID 초기화
  let welcome = { title: 'Welcome', desc: 'Welcome to FrontEnd' };
  let subject = {
    title: '프론트엔드 개발자 역량',
    desc: '기본언어인 html, css, javascript부터 학습합니다.',
  };

  // state 설정
  // 함수형 중 const를 사용하여 state(컴포넌트 내부에서 관리하는 데이터 저장소)한번에 쭉 쓰지 않고 하나의 항목의 변수명을
  // useState()로 설정 예를들어 const [mode(현재값 담음 변수명), setMode(상태를 바꿀 수 있는 업데이트 함수)] = useState('welcome');
  // setMode('read') 이런 식으로 호출하면, mode 값이 'read'로 바뀌고 컴포넌트가 다시 렌더링됨
  // state(상태) 초기값 설정(클라스형처럼 this.state가 아니라 useState()로 설정)
  const [mode, setMode] = useState('welcome'); // 초기 모드 설정
  const [selected_id, setSelectedId] = useState(2); // 선택된 메뉴의 ID 초기화
  const [menus, setMenus] = useState([
    {
      id: 1,
      title: 'UI/UX 개발',
      desc: '사용자 인터페이스와 사용자가 웹사이트를 이용하면 느끼고 생각하는 총체적 경험을 개발',
    },
    {
      id: 2,
      title: '재사용이 가능한 UI개발',
      desc: '앵귤러, 리엑트, 뷰등의 자바스크립트 프레임워크를 가지고 재사용할 수 있는 UI를 만든다.',
    },
    {
      id: 3,
      title: '애니메이션 구현',
      desc: 'CSS 또는 javascript를 사용해 다양한 효과의 애니메이션 구현한다.',
    },
  ]);

  // 실질 도우미 함수(계산함수)
  // cntrl + space -> 자동완성 cntrl + . -> 자동수정 cntrl + h ->  ab눌러 한꺼번에 단어 바꾸기
  // getReadArticle 메소드 생성 일치 함수 씀
  const getReadArticle = () => {
    const idx = menus.findIndex((item) => item.id === selected_id);
    const data = menus[idx];
    return data;
  };
  // getArticle 함수 생성
  const getArticle = () => {
    let _title,
      _desc,
      _article = null;
    if (mode === 'welcome') {
      _title = welcome.title;
      _desc = welcome.desc;
      _article = <ReadArticle title={_title} desc={_desc} mode={mode} />;
    } else if (mode === 'read') {
      let _data = getReadArticle();
      if (_data) {
        _article = (
          <ReadArticle
            title={_data.title}
            desc={_data.desc}
            onChangeMode={(_mode) => {
              if (_mode === 'delete') {
                if (window.confirm(`정말로 삭제하시겠습니까?`)) {
                  let _menus = Array.from(menus);
                  let idx = _menus.findIndex((item) => item.id === selected_id);
                  console.log(idx) ;
                  _menus.splice(idx, 1);//원본 배열에 menus의 배열 중 _menus.splice(배열인덱스위치,지우는 개수) 해당값 지우기
                  setMode('welcome');//지운후 첫페이지로 보여짐
                  setMenus(_menus);//지워진 _menus로 업데이트
                }
              } else {
                setMode(_mode);
              }
            }}
          />
        );
      }
    } else if (mode === 'create') {
      _article = (
        <CreateArticle
          onSubmit={(_title, _desc) => {
            max_menu_id += 1;
            let _menus = Array.from(menus);
            _menus.push({ id: max_menu_id, title: _title, desc: _desc });

            setMode('read');
            setMenus(_menus); //_menus 업데이트
            setSelectedId(max_menu_id); // 목록하나 더 추가됨
          }}
        />
      );
    } else if (mode === 'update') {
      const _content = getReadArticle();
      if (_content) {
        _article = (
          <UpdateArticle
            data={_content}
            onSubmit={(_id, _title, _desc) => {
              const _menus = Array.from(menus);
              _menus.forEach((item, index) => {
                if (item.id === _id) {
                  _menus[index] = { id: _id, title: _title, desc: _desc }; //_id등은 수정한 새로운 내용
                }
              });
              setMenus(_menus);
              setMode('read');
            }}
          />
        );
      }
    }

    return _article;
  };

  return (
    <div className='App'>
      <Myheader
        title={subject.title}
        desc={subject.desc}
        onChangeMode={(id) => {
          setMode('welcome'); // mode가 welcome로 바뀜
        }}
      ></Myheader>
      <Mynav
        data={menus}
        onChangePage={(id) => {
          setMode('read'); // mode가 read로 바뀜
          setSelectedId(id); // selected_id가 id로 바뀜
        }}
      ></Mynav>
      {getArticle()}  {/* getArticle() 함수 호출 */}
      <hr />
      <div className='menu'>
        <button
          type='button'
          className='primary'
          onClick={() => {
            setMode('create'); // mode가 create로 바뀜
          }}
        >
          Create task
        </button>
    </div>
    </div>
  )
}

export default App;




