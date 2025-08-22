import React, { useEffect, useState } from 'react';

const Mynav = ({data, onChangePage})=>{

  const [list, setList] = useState([]);
  var lists = [];
  const getList = ()=>{    
    data.forEach((item,idx)=>{
      lists.push(<li key={item.id}><a href="/" onClick={
        (e)=>{
          e.preventDefault();
          onChangePage(item.id);
        }
      }>{item.title}</a></li>);
     });
     setList(lists);
  }
 
  useEffect(() => {        
    getList();
  }, [data]);  


  return(
    <nav>
      <ul>
        {list}
      </ul>
    </nav>
  );
}
export default Mynav;