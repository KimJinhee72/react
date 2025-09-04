// 2번째 목록영역
import { Component, use, useEffect, useState } from 'react';

// 클라스형 렌더 부분에 <Mynav data=  onChangePage= 부분을 {data, onChangPage} 매개변수로 설정해 둠
const Mynav = ({data, onChangPage}) => {
  // 클라스형을 newProps로 그대로 함수를 받아써야 하지만
  // useState로 부모에서 설정되어있으면 lists 이었으나 list로 바꿔 쓸 수 있음
  // 그리고 변수 설정도 해주면 변수명도 바꿔 쓸 수 있음
  const [list, setList] = useState([]); //아래에 setList(lists)담긴 것을 list로 변수명 설정해 뒀으니 아래에선 list로 사용가능

  let lists = []; // getList함수로 배열로 받기 위해 빈배열 설정

  // getList() 함수 생성
  const getList = () => {
    data.forEach((item) => {
      lists.push(
        <li key={item.id}>
          <a
            href='/'
            onClick={(e) => {
              e.preventDefault(); // 페이지 이동 방지
              onChangPage(item.id); // 부모 컴포넌트의 상태 변경 함수 호출
            }}
          >
            {item.title}
          </a>
        </li>
      );
    });
    setList(lists); // list 상태 업데이트 되어 안에 배열로 들어감 lest lists롤 설정한 것 안으로 li로 채워짐
  };
  //클라스 형은 shouldComponentUpdate를 사용하는데 반해 함수형은 useEffect를 사용
  //useEffect는 외부 API 호출, 타이머, 콘솔 등 컴포넌트 외부와 상호작용할 때 사용하며 그 안에 내용[data]이 변경될 때만 실행하는 명령어
  //forEach로 push를 사용하면 원본이 변경되어 구분이 안되므로 getList() 함수로 써서 분리
  useEffect(() => {
    getList();
    console.log('getList() 실행');  

  }, [data]); // 부모에서 보내준 data가 변경될 때만 useEffect 실행 (맨처음 1회 포함)
  // 부모 Mynav에서 data가 변경될 때만 getList() 함수 실행
  // 즉, CREATE로 새로운 메뉴를 추가할 때만 getList() 함수 실행되어 getList() 함수 안에 있는 lists 배열이 채워져 setList(lists)로 list 상태 업데이트 되어 안에 배열로 들어감
  // 그래서 아래 return()에서 list로 사용가능

  // render() {대신에 함수 형은 return()로 씀
  return (
    <nav>
      <ul>{list}</ul>
    </nav>
  );
}
export default Mynav;
