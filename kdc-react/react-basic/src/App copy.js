import './App.css';
import React, { Component } from 'react';
// 헤더컴포넌트 불러오기
import Myheader from './component/Myheader';

class Mynav extends Component {
  render() {
    return (
      <div className='Mynav'>
        <nav>
          <ul>
            <li>
              <a href=''>UI/UX 개발</a>
            </li>
            <li>
              <a href=''>재사용이 가능한 UI개발</a>
            </li>
            <li>
              <a href=''>애니메이션 구현</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
class Myarticle extends Component {
  render() {
    return (
      <div className='Myarticle'>
        <section>
          <article>
            <h2>Welcome</h2>
            <p>Welcome to FrontEnd</p>
          </article>
        </section>
      </div>
    );
  }
}
export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <Myheader></Myheader>
        <Mynav></Mynav>
        <Myarticle></Myarticle>
      </div>
    );
  }
}
