import { Component } from 'react';

class ReadArticle extends Component {
  render() {
    console.log('ReadArticle render (실행)');
    let className = 'menu';
    if (this.props.mode === 'welcome') {
      className += ' hidden'; // ' hidden' 공백이 있어야 클라스 이름이 추가되어 welcome 모드에서는 메뉴가 보이지 않도록 설정
    }
    return (
      <div className='ReadArticle'>
        <section>
          <article>
            <h2>{this.props.title}</h2>
            <p>{this.props.desc}</p>
            <ul className={className}>
              <li>
                <a
                  href='/update'
                  className='secondary'
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.onChangeMode('update'); // 부모 컴포넌트의 상태 변경 함수 호출
                  }}
                >
                  update
                </a>
              </li>

              <li>
                <input type='button' className='danger' value='delete' />
              </li>
            </ul>
          </article>
        </section>
      </div>
    );
  }
}
export default ReadArticle;
