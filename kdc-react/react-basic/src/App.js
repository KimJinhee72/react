import './App.css';

import React, { Component } from 'react'

// 헤더컴포넌트 생성
class Myheader extends Component {
  render() {
    console.log(this.props); // props를 콘솔에 출력하여 확인

    return (
      <div className="Myheader">
        <header>
          {/* 아래 Myheader에 title과 desc를 입력해둠 */}
          <h1 className='logo'><a href="">{this.props.title}</a></h1>
          <p>{this.props.desc}</p>
        </header>
      </div>
    )
  }
}
class Mynav extends Component {
  render() {
    return (
      <div className="Mynav">
        <nav>
          <ul>
            <li><a href="">UI/UX 개발</a></li>
            <li><a href="">재사용이 가능한 UI개발</a></li>
            <li><a href="">애니메이션 구현</a></li>
          </ul>
        </nav>
      </div>
    )
  }
}
class Myarticle extends Component {
  render() {
    return (
      <div className="Myarticle">
        <section>
        <article>
          <h2>Welcome</h2>
          <p>Welcome to FrontEnd</p>
        </article>
        </section>
      </div>
    )
  }
}
export default class App extends Component {
  render() {
    // 여기에서도 변수 설정하여 할 수 있음
    return (
      <div className="App">
        <Myheader title="프론트엔드 개발자" desc="기본언어인 html, css, javascript부터 학습합니다."></Myheader>
        {/* <Myheader title="web" desc="web is ..."></Myheader> */}
        <Mynav ></Mynav>
        <Myarticle></Myarticle>
      </div>
    )
  }
}



