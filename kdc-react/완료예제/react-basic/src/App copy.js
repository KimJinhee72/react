import React, {Component, useState} from 'react';
import './App.css';
import Myheader from './component/Myheader';
import Mynav from './component/Mynav';
import ReadArticle from './component/ReadArticle';
import CreateArticle from './component/CreateArticle';
import UpdateArticle from './component/UpdateAriticle';

class App extends Component{
  constructor(props){
    super(props);
    this.max_menu_id = 3;
    this.state={
      mode:'welcome',  
      selected_id:2,
      subject:{
        title:'프론트엔드 개발자',
        desc:"기본언어인 html, css, javascript부터 학습합니다."
      },
      welcome:{title:'Welcome', desc:"Welcome to FrontEnd"},
      menus:[
        {id:1, title:'UI/UX 개발', desc:'사용자 인터페이스와 사용자가 웹사이트를 이용하면 느끼고 생각하는 총체적 경험을 개발 '},
        {id:2, title:'재사용이 가능한 UI 개발', desc:'앵귤러, 리엑트, 뷰등의 자바스크립트 프레임워크를 가지고 재사용할 수 있는 UI를 만든다. '},
        {id:3, title:'애니메이션 구현', desc:'CSS 또는 javascript를 사용해 다양한 효과의 애니메이션 구현한다. '}
      ]
    }
  }
  getReadArticle(){
    const idx = this.state.menus.findIndex(item=>(item.id === this.state.selected_id));
    let data = this.state.menus[idx];
    return data;
  }
  getArticles(){
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadArticle title={_title} desc={_desc} mode={this.state.mode} ></ReadArticle>;
    } else if(this.state.mode === 'read'){

      let _data = this.getReadArticle();

      _article = <ReadArticle title={_data.title} desc={_data.desc} onChangeMode={(_mode)=>{
        if(_mode === 'delete'){
          if(window.confirm('정말 삭제할까요?')){
            let _menus = Array.from(this.state.menus); //①
            const idx = _menus.findIndex(item=>(item.id === this.state.selected_id)); //②
            _menus.splice(idx,1); //③
            this.setState({ //④
              mode:'welcome',
              menus:_menus
            });
            alert('삭제되었습니다.'); //⑤
          }
        } else{
          this.setState({
            mode:_mode
          });
        }

      }}></ReadArticle>;
    } else if(this.state.mode === 'create'){    

      _article = <CreateArticle onSubmit={(_title, _desc)=>{

        this.max_menu_id = this.max_menu_id + 1;
        var newMenus = Array.from(this.state.menus); 
        newMenus.push({id:this.max_menu_id, title:_title, desc:_desc}); 

        this.setState({ 
          menus:newMenus,
          mode:'read',
          selected_id:this.max_menu_id
        });

      }}></CreateArticle>;
    } else if(this.state.mode === 'update'){
      var _content = this.getReadArticle();

      _article = <UpdateArticle data={_content} onSubmit={(_id, _title, _desc)=>{

        var _menus = Array.from(this.state.menus);
        _menus.forEach(function(item,index){
          if(item.id === _id){
            _menus[index] = {id:_id,title:_title, desc:_desc}            
          }
        });

        this.setState({
          menus:_menus,
          mode:'read'

        });

      }}></UpdateArticle>;
    }
    return _article;
  }

  render(){
    console.log('App render');   

    return(  
      <div className="App">
        <Myheader
          title={this.state.subject.title}
          desc={this.state.subject.desc}  
          onChangePage={()=>{
            this.setState({mode:'welcome'});
          }}
          >      
        </Myheader>  

        <Mynav data={this.state.menus} onChangePage={(id)=>{
          this.setState({
            mode:'read',
            selected_id:id
          });
        }}></Mynav>

        {this.getArticles()}

        <div className='menu'>
          <button type="button" className="primary" onClick={()=>{            
            this.setState({
              mode:'create',
            });         
          }}>Create task</button>       
        </div>
      </div>
    );
  }
}

export default App;