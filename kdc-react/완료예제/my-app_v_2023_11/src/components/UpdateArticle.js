import React, { Component } from 'react'

export default class UpdateArticle extends Component {
  constructor(props){
    super(props);    
    this.state={ 
        title : this.props.data.title,
        desc :this.props.data.desc,
        id: this.props.data.id
    }
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
  inputFormHandler(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  render() {
    console.log('UpdateArticle 실행');
    console.log(this.props.data);
    return (
      <section>
        <article>
          <h2>Update Task</h2>
          <form action="/create_process" method="POST" onSubmit={(e)=>{
            e.preventDefault();

            let title = this.state.title;
            let desc = this.state.desc;
            let id = this.state.id;
            
            this.props.onsubmit(id, title, desc);
          }}>
            {/* <input type='hidden' name="id" value={this.state.id}/> */}
            <p>
              <label htmlFor="title">Title:</label>
              <input type="text" name="title" placeholder='title' id="title" value={this.state.title} onChange={this.inputFormHandler} />
            </p>
            <p>
              <label htmlFor="desc">Description:</label>
              <textarea id="desc" name="desc" placeholder='description' onChange={this.inputFormHandler}>{this.props.data.desc}</textarea>
            </p>
            <button>Submit</button>          

          </form>
        </article>
      </section>
    )
  }
}
