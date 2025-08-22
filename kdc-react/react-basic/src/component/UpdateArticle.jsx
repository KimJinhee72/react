// 목록을 설명하는 ReadArticle에서 update 버튼
import { Component } from 'react';

class UpdateArticle extends Component {
  // constructor(딱한번만 실행)로 초기값 설정해 두면 뒤에서 내용을 수정이 가능
  constructor(props) {
    super(props); // super(props)로 부모 클래스의 생성자를 호출하면 뒤에 this.props가 사용 가능
    // this.state = { ... } 컴포넌트의 **초기 상태(state)**를 설정 폼 기존데이터 가져와 인풋에 넣으려함. 안에는 title등 상태 변수들 존재
    this.state = {
      id: this.props.data.id || '',
      title: this.props.data.title || '', // title 초기값 설정 this.props.data가 비어 있어도 에러 없이 안전하게 초기화(|| '')
      desc: this.props.data.desc || '', // desc 초기값 설정
    };
  }
  // 인풋내용 바뀔때 타겟되는 부분이 같아 메소드로 지정
  inputFormHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value }); // 입력값 변경 시 setState로 상태 업데이트
    // ([e.target.name]=computedproperty name)은 동적으로 name 속성(title 또는 desc)에 해당하는 네임에 따라 업데이트
    // e객체, e.target는 이벤트가 발생한 html요소 input, e.target.name은 인풋의 title 또는 desc를 가리킴
    // e.target.value는 사용자가 입력한 현재 값이라 입려할 때 마다 실시간으로 갱신
  };
  render() {
    console.log('UpdateArticle render (실행)');
    console.log(this.props.data);

    return (
      <div className='UpdateArticle'>
        <section>
          <article>
            <h2>Update Task</h2>
            <form
              action='/create_process'
              method='POST'
              onSubmit={(e) => {
                e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
                console.log(e.target.title.value, e.target.desc.value); // 입력된 제목과 설명을 콘솔에 출력
                // 부모 컴포넌트(App.js)의 onSubmit 함수 호출해서 id,title,desc 입력되게
                this.props.onSubmit(
                  // e.target.title.value, // 입력된 제목
                  // e.target.desc.value, // 입력된 설명
                  // e.target.id.value //입력된 id
                  this.state.id,
                  this.state.title,
                  this.state.desc
                );
                e.target.title.value = ''; // 폼 제출 후 제목 입력란 비우기
              }}
            >
              <input type='hidden' name='id' value={this.state.id} />
              {/* 보이지 않고 숨어서 전달가능 */}
              <p>
                <label htmlFor='title'>Title:</label>
                <input
                  type='text'
                  name='title'
                  placeholder='title'
                  id='title'
                  required
                  // value 속성은 컴포넌트의 상태와 동기화되어 입력란의 값을 제어함
                  value={this.state.title} // 기존 데이터로 보여지나 수정은 불가능 onChange 이벤트가 없어서
                  // onChange 이벤트는 핸들러 추가 사용자가 입력할 때마다 호출되어 상태를 업데이트
                  // onChange={(e) => {
                  //   this.setState 클래스형 컴포넌트에서 state를 업데이트할 때 사용하는 문법.
                  //   this.setState({ title: e.target.value }); // 입력값 변경 시 setState로 상태 업데이트 부분이 같아 메소드로
                  //   e객체, e.target는 이벤트가 발생한 html요소 input를 가리킴
                  //   e.target.value는 사용자가 입력한 현재 값이라 입려할 때 마다 실시간으로 갱신
                  // }}
                  onChange={this.inputFormHandler} // inputFormHandler 메소드 호출
                />
              </p>
              <p>
                <label htmlFor='desc'>Description:</label>
                <textarea
                  id='desc'
                  name='desc'
                  placeholder='description'
                  required
                  value={this.state.desc} // 기존 데이터로 보여지나 수정은 불가능 onchange 이벤트가 없어서
                  // onChange 이벤트 핸들러 추가
                  // onChange={(e) => {
                  //   this.setState({ desc: e.target.value });
                  // }}
                  onChange={this.inputFormHandler} // inputFormHandler 메소드 호출
                >
                  {/* {this.props.data.desc} */}
                  {/* textarea 이렇게 defaultvalue로 쓰면 안됨 */}
                </textarea>
              </p>
              <button className='primary'>Submit</button>
            </form>
          </article>
        </section>
      </div>
    );
  }
}
export default UpdateArticle;
