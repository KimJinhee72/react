import React, { Component } from 'react';

class Myheader extends Component{
  render(){
    console.log('Myheader render');
    return(
      <header>
        <h1 className="logo"><a href="/" onClick={(e)=>{
          e.preventDefault();
          this.props.onChangePage();
        }}>{this.props.title}</a></h1>
        <p>{this.props.desc}</p>
      </header>
    );
  }
}

export default Myheader;