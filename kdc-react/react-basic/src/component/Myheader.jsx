// cspell:disable
import React, { Component } from 'react';

class Myheader extends Component {
  render() {
    // console.log(this.props); // props를 콘솔에 출력하여 확인
    console.log('Myheader render (실행)');

    return (
      <div className='Myheader'>
        <header>
          {/* 아래 Myheader에 title과 desc를 입력해둠 */}
          <h1 className='logo'>
            <a
              href='/'
              onClick={(e) => {
                e.preventDefault(); // 페이지 이동 방지
                this.props.onChangeMode(); // 부모 컴포넌트의 상태 변경 함수 호출(App.js에서는 onChangMode=(()=>{this.setState({ mode: 'welcome' }})라고 정의되어 있음 그러나 여기 컴포넌트에서는 자식이니 props로 전달받음)
              }}
            >
              {this.props.title}
            </a>
          </h1>
          <p>{this.props.desc}</p>
        </header>
      </div>
    );
  }
}
export default Myheader;

