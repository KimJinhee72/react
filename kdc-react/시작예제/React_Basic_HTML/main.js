let menu = document.querySelectorAll('nav ul li');
console.log(menu);

// 메뉴[] 클릭click 이벤트 0번째만 작동하고 다음은 안됨
// menu[0].addEventListener('click', (e)=>{
//     e.preventDefault();
//     alert('메뉴 클릭');
// });

// 메뉴.forEach로 클릭click 이벤트 모두 실행됨
menu.forEach((item, idx) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    alert(`${idx}번째 메뉴 클릭`);// 메뉴 클릭시 alert창 띄우기네 백틱``으로 해야지 그냥''로 하면 문자로 나옴
  });
});
