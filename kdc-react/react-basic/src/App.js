// cspell:disable
import './App.css';
import React, { Component } from 'react';

// 헤더컴포넌트 생성
import Myheader from './component/Myheader';
// 네비게이션 컴포넌트 생성
import Mynav from './component/Mynav';
// 아티클 컴포넌트 생성
import Myarticle from './component/Myarticle';

class App extends Component {
  constructor(props) {
    super(props);
    // constructor(props) {
    // super(props);생략해서 바로 this.state를 설정할 수 있지만,
    // props를 사용해야 할 경우가 있기 때문에 super(props)를 사용하는 것이 좋다.
    // 컴포넌트의 생성자에서 state를 초기화하는 것이 일반적
    // props를 통해 부모 컴포넌트로부터 전달된 값을 사용할 수 있다
    // state 설정
    this.state = {
      mode: 'welcome', // 초기 모드 설정
      selected_id: 3, // 선택된 메뉴의 ID 초기화
      //welcome에 대한 내용 설정
      welcome: { title: 'Welcome', desc: 'Welcome to FrontEnd' },
      subject: {
        title: '프론트엔드 개발자',
        desc: '기본언어인 html, css, javascript부터 학습합니다.',
      },
      menus: [
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
      ],
    };
  }
  render() {
    console.log('App render (실행)');

    // 여기에서도 변수 설정하여 할 수 있음
    let _title,
      _desc = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === 'read') {
      //while문을 사용하여 선택된 메뉴의 ID를 찾아서 해당 메뉴의 제목과 설명을 가져옴 먼저 초기값을 설정해야함
      // let i = 0;
      // while (i < this.state.menus.length) {
      //   // 메뉴(가 배열이니)의 개수(길이)만큼 반복
      //   // if (this.state.menus[i].id === this.state.selected_menu_id) {
      //   //   _title = this.state.menus[i].title;
      //   //   _desc = this.state.menus[i].desc;
      //   //   break; // 찾았으면 반복문 종료
      //   let data = this.state.menus[i];
      //   if (data.id === this.state.selected_id) {
      //     _title = data.title;
      //     _desc = data.desc; // 해당 메뉴의 제목과 설명을 가져옴
      //     break; // 찾았으면 반복문 종료
      //   }
      //   i += 1; // 다음 메뉴로 이동
      // }
      // findIndex를 사용하여 선택된 메뉴의 ID를 찾아서 해당 메뉴의 제목과 설명을 가져옴
      let idx = this.state.menus.findIndex((item) => {
        return item.id === this.state.selected_id; //일치하는 값을 리턴함
      });
      if (idx >= 0) {
        _title = this.state.menus[idx].title;
        _desc = this.state.menus[idx].desc; // 해당 메뉴의 제목과 설명을 가져옴
      }
    }
    return (
      <div className='App'>
        <Myheader
          title={this.state.subject.title}
          desc={this.state.subject.desc}
          onChangeMode={(id) => {
            this.setState({ mode: 'welcome' });
          }} // App.js 설정해 던져두면 자식 컴포넌트에서 props로 전달받아 사용할 수 있다.(this.props.onChangeMode())로 사용 , onChangeMode는 부모 컴포넌트(App.js)에서 정의된 함수로, 자식 컴포넌트(Myheader)에서 호출될 때 부모의 상태를 변경할 수 있다.
        ></Myheader>
        {/* <header>
          {/* 아래 Myheader에 title과 desc를 입력해둠 */}
        {/* <h1 className='logo'> */}
        {/* //onclick 이벤트에 fuction을 통해 클릭시 페이지 이동을 막고 state를 변경함
            <a href='/'
             onClick={function (e) {
               e.preventDefault(); // a태그의 기본 동작인 페이지 이동을 막아 새로고침이 되지않음
               alert('클릭됨');
               this.setState({ mode: 'welcome' });//setState 를 통해 state를 변경 따로 변수명 설정없이도 가능
             }.bind(this)}
            >{this.state.subject.title}</a> */}
        {/* 화살표 함수를 써서 .bind사용 없이 사용 */}
        {/* <a
              href='/'
              onClick={e => {//e는 이벤트 객체가 하나밖에 없어 ()생략가능
                e.preventDefault(); // a태그의 기본 동작인 페이지 이동을 막아 새로고침이 되지않음
                this.setState({ mode: 'welcome' }); // setState를 통해 state를 변경 따로 변수명 설정없이도 가능
              }}
            >
              {this.state.subject.title}
            </a>
          </h1>
          <p>{this.state.subject.desc}</p>
        </header> */}
        {/* <Myheader title="web" desc="web is ..."></Myheader> */}
        <Mynav
          data={this.state.menus}
          onChangePage={(id) => {
            this.setState({
              mode: 'read',
              selected_id: id, // 선택된 메뉴의 ID를 설정
            });
          }}
        ></Mynav>
        <Myarticle title={_title} desc={_desc}></Myarticle>
      </div>
    );
  }
}
export default App;
