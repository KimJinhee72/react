import { Component } from 'react';

class Myarticle extends Component {
  render() {
    console.log('Myarticle render (실행)');

    return (
      <div className='Myarticle'>
        <section>
          <article>
            <h2>{this.props.title}</h2>
            <p>{this.props.desc}</p>
          </article>
        </section>
      </div>
    );
  }
}
export default Myarticle;
