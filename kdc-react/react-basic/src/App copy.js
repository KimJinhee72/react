import './App.css';

import React, { Component } from 'react'

// 헤더컴포넌트 생성
class Myheader extends Component {
  render() {
    return (
      <div className="Myheader">
        <header>
          <h1 className='logo'><a href="">프론트엔드 개발자</a></h1>
          <p>기본언어인 html, css, javascript부터 학습합니다.</p>
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
    return (
      <div className="App">
        <Myheader></Myheader>
        <Mynav></Mynav>
        <Myarticle></Myarticle>
      </div>
    )
  }
}



