// 맨아래 create task 목록추가영역
import { Component } from 'react';
class CreateArticle extends Component {
  render() {
    console.log('CreateArticle render (실행)');
    return (
      <div className='CreateArticle'>
        <section>
          <article>
            <h2>Create Task</h2>
            <form
            action='/create_process'
             method='POST' onSubmit={e => {
              e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
              console.log(e.target.title.value, e.target.desc.value); // 입력된 제목과 설명을 콘솔에 출력
              this.props.onSubmit(
                e.target.title.value, // 입력된 제목
                e.target.desc.value // 입력된 설명
              ); // 부모 컴포넌트(App.js)의 onSubmit 함수 호출
              e.target.title.value = ''; // 폼 제출 후 제목 입력란 비우기
             }}
             >
              <p>
                <label htmlFor='title'>Title:</label>
                <input type='text' name='title' placeholder='title' id='title' required />
              </p>
              <p>
                <label htmlFor='desc'>Description:</label>
                <textarea id='desc' name='desc' placeholder='description'></textarea>
              </p>
              <button className='primary'>Submit</button>
            </form>
          </article>
        </section>
      </div>
    );
  }
}
export default CreateArticle;
