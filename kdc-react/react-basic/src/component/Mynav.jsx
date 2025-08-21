// cspell:disable
import React, { Component } from 'react';

class Mynav extends Component {
  render() {
    console.log('Mynav render (실행)');
    let lists = [];
    // console.log(this.props.data);
    let data = this.props.data;
    /*let i = 0;
    while(i < data.length) {
      // console.log(this.props.data[i]);
      lists.push(
        <li>
          <a href="/" key={data[i].id}>
            {data[i].title}
          </a>
        </li>
      );
      i += 1;
    }*/
    /*data.forEach(function(item,idx) {
      // console.log(item);
      lists.push(
        <li key={item.id}>
          <a href="/" >
            {item.title}
          </a>
        </li>
  )});*/
    data.forEach((item) => {
      // console.log(item);
      lists.push(
        <li key={item.id}>
          <a href='/'
          onClick={e => {
            e.preventDefault(); // 페이지 이동 방지
            this.props.onChangePage(item.id); // 부모 컴포넌트의 상태 변경 함수 호출
          }}>{item.title}</a>
        </li>
      );
    });

    return (
      <nav>
        <ul>{lists}</ul>
      </nav>
    );
  }
}
export default Mynav;
