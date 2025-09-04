// 2번째 목록영역
import { Component } from 'react';

class Mynav extends Component {
  // App.js에서는 concat을 사용하여 새로운 메뉴를 추가하고,
  // MyNav에서는 shouldComponentUpdate를 사용하여 불필요한 렌더링
  // shouldComponentUpdate로 성능 최적화(불필요한 렌더링 방지 , 다른 이벤트를 했으나 모두 리렌더링 됨을 방지), 기본값은 true
  // true를 반환하면 아래값이 보여져 렌더링이 계속되고, false를 반환하면 렌더링이 중단되어 submit헤도 아래값이 보여지지 않음
  // props나 state가 변경되었을 때만 렌더링하도록 설정
  shouldComponentUpdate(newProps, newState) {
    console.log(
      'shouldComponentUpdate (실행)',
      newProps.data, // 새로운 props CREATE로 추가해 4개
      this.props.data // 변경전 props 원래3개
    ); //shouldComponentUpdate를 쓰지않고 바로 push를 사용하면 원본도 변경되어 원래 3개였던 props가 4개로 변경되어 구분불가능

    // props가 변경되었을 때만 렌더링하도록 설정
    if (newProps.data === this.props.data) {
      return false; // props가 변경되지 않았으면 렌더링하지 않음
    }
    return true; // true를 반환하면 뒤에 render 메소드가 호출되어 컴포넌트가 다시 렌더링 되어 보여짐 false를 반환하면 렌더링이 중단되어 보여지지 않음
    // return this.props.data !== nextProps.data;
  }
  render() {
    console.log('Mynav render (실행)');
    const lists = [];
    // console.log(this.props.data);
    const data = this.props.data;
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
          <a
            href='/'
            onClick={(e) => {
              e.preventDefault(); // 페이지 이동 방지
              this.props.onChangePage(item.id); // 부모 컴포넌트의 상태 변경 함수 호출
            }}
          >
            {item.title}
          </a>
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
