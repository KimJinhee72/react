import React, { Component } from 'react'

export default class Controls extends Component {  
  render() {
    console.log('Controls 실행');
    return (
      <div className="menu">
         <a href="/create" className="primary" onClick={(e)=>{
            e.preventDefault();
            this.props.onChangeMode('create');
          }}>Create task</a>       
      </div>
    )
  }
}
