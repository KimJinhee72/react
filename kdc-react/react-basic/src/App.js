'use client';

// cspell:disable
import './App.css';
import { Component } from 'react';

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

class App extends Component {
  constructor(props) {
    super(props);
    this.max_menu_id = 3; // 메뉴의 최대 ID 초기화

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
  // getReadArticle 메소드 생성 일치 함수 씀
  getReadArticle() {
    const idx = this.state.menus.findIndex((item) => item.id === this.state.selected_id);
    const data = this.state.menus[idx];
    return data;
  }

  getArticle() {
    let _title,
      _desc,
      _article = null;

    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadArticle title={_title} desc={_desc} mode={this.state.mode}></ReadArticle>;
    } else if (this.state.mode === 'read') {
      const _data = this.getReadArticle();
      _article = (
        <ReadArticle
          title={_data.title}
          desc={_data.desc}
          onChangeMode={(_mode) => {
            this.setState({
              mode: _mode,
            });
          }}
        ></ReadArticle>
      );
    } else if (this.state.mode === 'create') {
      _article = (
        <CreateArticle
          onSubmit={(_title, _desc) => {
            console.log(`제목: ${_title}, 설명: ${_desc}`);
            this.max_menu_id += 1;
            const _menus = Array.from(this.state.menus);
            _menus.push({
              id: this.max_menu_id,
              title: _title,
              desc: _desc,
            });
            this.setState({
              menus: _menus,
              mode: 'read',//수정(update)청에서 제출하고 목록이 나오게 하려고
              selected_id: this.max_menu_id,// 목록하나 더 추가됨
            });
          }}
        ></CreateArticle>
      );
    } else if (this.state.mode === 'update') {
      const _content = this.getReadArticle();
      _article = (
        <UpdateArticle
          data={_content}
          onSubmit={(_id, _title, _desc) => {
            console.log(`아이디: ${_id}, 제목: ${_title}, 설명: ${_desc}`);
            // this.max_menu_id += 1;
            const _menus = Array.from(this.state.menus);
            // push로 하면 기존에 수정이 아니라 새로이 다시 생성이 됨
            // _menus.push({
            //   id: this.max_menu_id,
            //   title: _title,
            //   desc: _desc,
            // });

            // push가 아니라 forEach로 사용하니 수정이 됨
            _menus.forEach((item, index) => {
              if (item.id === _id) {
                _menus[index] = { id: _id, title: _title, desc: _desc }; //_id등은 수정한 새로운 내용
              }
            });
            this.setState({
              menus: _menus, //로 하면 제출해도 그대로 남아있어서
              mode: 'read' //까지 해야 제출후 read기존목록이 수정되어 보여짐
            });
          }}
        ></UpdateArticle>
      );
    }

    return _article;
  }

  render() {
    console.log('App render (실행)');

    return (
      <div className='App'>
        <Myheader
          title={this.state.subject.title}
          desc={this.state.subject.desc}
          onChangeMode={(id) => {
            this.setState({ mode: 'welcome' });
          }}
        ></Myheader>
        <Mynav
          data={this.state.menus}
          onChangePage={(id) => {
            this.setState({
              mode: 'read',
              selected_id: id,
            });
          }}
        ></Mynav>

        {this.getArticle()}

        <hr />
        <div className='menu'>
          <button
            type='button'
            className='primary'
            onClick={() => {
              this.setState({
                mode: 'create',
              });
            }}
          >
            Create task
          </button>
        </div>
      </div>
    );
  }
}

export default App;
