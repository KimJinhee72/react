import { useState, useEffect } from 'react';
import './App.css';


function Nav({list,onclick}){
  console.log(list);
  let listHTML = list.map(list=>{
    return(
      <li key={list.id}>
        <a href={list.id} data-id={list.id} onClick={e =>{
          e.preventDefault();
          onclick(e.target.dataset.id);
        }}>{list.title}</a>
      </li>
    )
  });

  return(
    <nav>
      {listHTML}
    </nav>
  )
}
function Article(props){
  return(
    <article>
      <h2>{props.title}</h2>
      <p>{props.desc}</p>
    </article>
  )
}


function App(){
  const [article,setArticle] = useState({
     title:'welcome',
     desc :'Hello, React & Ajax'
   });
  const [list,setList] = useState([]);
 
  useEffect(()=>{
   fetch('./data/task.json')
       .then(result => {
         return result.json();
       })
       .then(data => {
         setList(data);
     });
  }, []);
 
   return (
     <div className="App">
       <h1>Web</h1>
       <Nav list={list} onclick={ id=>{          
         fetch(`./data/${id}.json`)
           .then(result => {
             return result.json();
           })
           .then(data => {
            console.log(data);
            setArticle({
              title: data.title,
              desc:data.desc
            });
           }
         );
       }
     }/>
       <Article 
         title={article.title} 
         desc={article.desc} 
       />
     </div>
   );
 }


export default App;