import React, {Component, useState} from 'react';
import './App.css';
import Myheader from './component/Myheader';
import Mynav from './component/Mynav';
import ReadArticle from './component/ReadArticle';
import CreateArticle from './component/CreateArticle';
import UpdateArticle from './component/UpdateAriticle';


const App = ()=>{
  let max_menu_id = 3;
  const [mode, setMode] = useState('welcome');
  const [selected_id, setSelectedId] = useState(2);
  const subject= {
    title:'프론트엔드 개발자',
    desc:"기본언어인 html, css, javascript부터 학습합니다."
  };
  const[menus, setMenus] = useState([
    {id:1, title:'UI/UX 개발', desc:'사용자 인터페이스와 사용자가 웹사이트를 이용하면 느끼고 생각하는 총체적 경험을 개발 '},
    {id:2, title:'재사용이 가능한 UI 개발', desc:'앵귤러, 리엑트, 뷰등의 자바스크립트 프레임워크를 가지고 재사용할 수 있는 UI를 만든다. '},
    {id:3, title:'애니메이션 구현', desc:'CSS 또는 javascript를 사용해 다양한 효과의 애니메이션 구현한다. '}
  ]);
  const welcome = {title:'Welcome', desc:"Welcome to FrontEnd"};

  const getReadArticle = ()=>{
    const idx = menus.findIndex(item=>(item.id === selected_id));
    let data = menus[idx];
    return data;
  }
  const getArticles = ()=>{
    var _title, _desc, _article = null;
    if(mode === 'welcome'){
      _title = welcome.title;
      _desc = welcome.desc;
      _article = <ReadArticle title={_title} desc={_desc} mode={mode} ></ReadArticle>;
    } else if(mode === 'read'){

      let _data = getReadArticle();

      _article = <ReadArticle title={_data.title} desc={_data.desc} onChangeMode={(_mode)=>{
        if(_mode === 'delete'){
          if(window.confirm('정말 삭제할까요?')){
            let _menus = Array.from(menus); 
            const idx = _menus.findIndex(item=>(item.id === selected_id)); 
            _menus.splice(idx,1); 

            setMode('welcome');
            setMenus(_menus);

            alert('삭제되었습니다.'); 
          }
        } else{
          setMode(_mode);
        }

      }}></ReadArticle>;
    } else if(mode === 'create'){    

      _article = <CreateArticle onSubmit={(_title, _desc)=>{

        max_menu_id = max_menu_id + 1;
        var newMenus = Array.from(menus); 
        newMenus.push({id:max_menu_id, title:_title, desc:_desc}); 

        setMenus(newMenus);
        setMode('read');
        setSelectedId(max_menu_id);
        

      }}></CreateArticle>;
    } else if(mode === 'update'){
      var _content = getReadArticle();

      _article = <UpdateArticle data={_content} onSubmit={(_id, _title, _desc)=>{

        var _menus = Array.from(menus);
        _menus.forEach(function(item,index){
          if(item.id === _id){
            _menus[index] = {id:_id,title:_title, desc:_desc}            
          }
        });
        setMenus(_menus);
        setMode('read');

      }}></UpdateArticle>;
    }
    return _article;
  }
  return(

      <div className="App">  
          <Myheader
            title={subject.title}
            desc={subject.desc}  
            onChangePage={()=>{
              setMode('welcome');
            }}
            >      
          </Myheader> 
          <Mynav data={menus} onChangePage={(id)=>{
            setMode('read');
            setSelectedId(id);
          }}></Mynav> 
          {getArticles()}       
          <div className='menu'>
            <button type="button" className="primary" onClick={()=>{     
              setMode('create');
            }}>Create task</button>       
          </div>
      </div>

  )
}
export default App;
