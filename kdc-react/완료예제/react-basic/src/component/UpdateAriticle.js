import React, { Component } from 'react';

class UpdateAriticle extends Component{

  constructor(props){
    super(props);
    this.state = {
        id:this.props.data.id,
        title:this.props.data.title,
        desc:this.props.data.desc
    }   
  }

  inputFormHandler = (e)=>{
    this.setState({[e.target.name]:e.target.value});
  }


  render(){
    console.log(this.props.data);
    console.log('UpdateAriticle 실행');
    return(
      <section>
        <article>
          <h2>Update Task</h2>
            <form action="/create_process" method="post"
              onSubmit={(e)=>{
                e.preventDefault();     
                this.props.onSubmit(
                  this.state.id,
                  this.state.title,
                  this.state.desc
                );
              }}
            >
               <input type="hidden" name="id" value={this.state.id}/>
              <p>
                <label htmlFor="title">Title:</label>
                <input 
                  type="text" 
                  name="title" 
                  placeholder="title" 
                  id="title" 
                  value ={this.state.title}
                  required
                  onChange={this.inputFormHandler}    
                  />
              </p>
              <p>
                <label htmlFor="desc">Description:</label>
                <textarea id="desc" 
                name="desc" placeholder="description" required value={this.state.desc} 
                onChange={this.inputFormHandler}></textarea>
              </p>
              <button className="primary">Submit</button>
            </form>
        </article>
      </section>
    );
  }
}
export default UpdateAriticle;