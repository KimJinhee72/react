import { Component } from 'react';

class Nav extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps.data); //변경된 값 4
    console.log(this.props.data); //변경전 값 3
    if(this.props.data === nextProps.data){
      return false;
    }
    return true;
  }
  render() {
    console.log('Nav 실행');
    let lists = [];
    let data = this.props.data;
    // let $this = this.props;

    data.forEach((item,idx)=>{
      lists.push(<li key={idx}><a 
        href="/"
        data-id={item.id}
        onClick={(e)=>{
          e.preventDefault();
          // this.props.onChangePage(e.target.dataset.id);
          this.props.onChangePage(item.id);
        }}
        >{item.title}</a></li>);
    });

    return (
      <nav>
        <ul>
          {/* <li><a href="/">HTML</a></li>
          <li><a href="/">CSS</a></li>
          <li><a href="/">Javascript</a></li> */}
          {lists}
        </ul>
      </nav>
    )
  }
}
export default Nav;