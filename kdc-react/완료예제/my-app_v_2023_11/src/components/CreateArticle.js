import React, { Component } from 'react'

export default class CreateArticle extends Component {
  render() {
    return (
      <section>
        <article>
          <h2>Create Task</h2>
          <form action="/create_process" method="POST" onSubmit={(e)=>{
            e.preventDefault();

            let title = e.target.title.value;
            let desc = e.target.desc.value;
            
            this.props.onsubmit(title, desc);
          }}>
            <p>
              <label htmlFor="title">Title:</label>
              <input type="text" name="title" placeholder='title' id="title"/>
            </p>
            <p>
              <label htmlFor="desc">Description:</label>
              <textarea id="desc" name="desc" placeholder='description'></textarea>
            </p>
            <button className='primary'>Submit</button>
          </form>
        </article>
      </section>
    )
  }
}
