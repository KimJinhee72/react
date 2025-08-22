import './App.css';
import { Component } from 'react';
import Myheader from './components/Myheader';
import Nav from './components/Nav';
import ReadArticle from './components/readArticle';
import Controls from './components/Controls';
import CreateArticle from './components/CreateArticle';
import UpdateArticle from './components/UpdateArticle';

 class App extends Component {

  constructor(props){
    super(props);
    this.max_menu_id= 3;
    this.state={      
      mode:'welcome',
      selected_id:0,
      subject : {
        title:"프론트엔드 개발자",
        desc:"기본언어인 html, css, javascript부터 학습합니다. "
      },
      welcome : {
        title:"Welcome",
        desc:"Welcome to FrontEnd"
      },
      menus :[
        {id:1, title:'UI/UX 개발', desc:'사용자 인터페이스와 사용자가 웹사이트를 이용하면 느끼고 생각하는 총체적 경험을 개발'},
        {id:2, title:'재사용이 가능한 UI 개발', desc:'앵귤러, 리엑트, 뷰등의 자바스크립트 프레임워크를 가지고 재사용할 수 있는 UI를 만든다.'},
        {id:3, title:'애니메이션 구현', desc:'CSS 또는 javascript를 사용해 다양한 효과의 애니메이션 구현한다. '}
      ]
    }
  }
  getReadArticle(){
    let result;
    this.state.menus.forEach((item)=>{
      if(item.id === this.state.selected_id){
        result = item;
      }
    });
    return result;   
  }

  getArticle(){
    let _title, _desc, _article = null;

    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadArticle title={_title} desc={_desc}  mode={this.state.mode}/>        
    } else if (this.state.mode === "read"){
        let _data = this.getReadArticle();
      _article = <ReadArticle 
      title={_data.title} 
      desc={_data.desc} 
      onChangeMode={(_mode)=>{
        if(_mode === 'delete'){
          if(window.confirm('정말 삭제할까요')){
            let _menus = Array.from(this.state.menus);
            _menus.forEach((item,idx)=>{
              if(item.id === this.state.selected_id){
               _menus.splice(idx,1);
              }
            });
            this.setState({
              menus:_menus,
              mode:'welcome'
            });
          }
        } else{
          this.setState({
            mode:_mode
          });
        }
      }} />
     

    } else if(this.state.mode === "create"){
      _article = <CreateArticle onsubmit={(_title,_desc)=>{
        this.max_menu_id += 1;

        /*
        let _menus = this.state.menus.concat(
          {id:this.max_menu_id, title:_title, desc:_desc},
        );
        */
        let newMenus = Array.from(this.state.menus);
        newMenus.push({id:this.max_menu_id, title:_title, desc:_desc});
    
        this.setState({
          menus:newMenus
        });
      }}/>;
    } else if(this.state.mode === "update"){
        let _content = this.getReadArticle();
        _article = <UpdateArticle data={_content} onsubmit={(_id, _title,_desc)=>{
          console.log(_id,_title,_desc);

          let _menus = Array.from(this.state.menus);

          _menus.forEach((item, idx)=>{
            if(item.id === _id){
              _menus[idx] = {id:_id, title:_title, desc:_desc}
            }
          });  

          this.setState({
            menus:_menus,
            mode:'read'
          })        

        }} />
    } else if(this.state.mode === "delete"){

      _article = <h2>delete</h2>;
    }
    return _article;
  }

  render() {
    console.log('App 실행');
    return (
      <div>        
        <Myheader 
          title={this.state.subject.title} 
          desc={this.state.subject.desc} 
          onChangePage={()=>{
            this.setState({mode:'welcome'});
          }}
        />

        {/* <Myheader title="web" desc="for UI" /> */}
        <Nav 
          data={this.state.menus}  
          onChangePage={(id)=>{
            console.log(id);
            this.setState({
              mode:'read',
              selected_id: Number(id)
            });

          }}
        />
        {/* <Myarticle title={_title} desc={_desc}/> */}
        
        {this.getArticle()}
        <hr/>
        <Controls onChangeMode={(_mode)=>{
          if(_mode === 'delete'){
            if(window.confirm('정말 삭제할까요')){
              let _menus = Array.from(this.state.menus);
              _menus.forEach((item,idx)=>{
                if(item.id === this.state.selected_id){
                 _menus.splice(idx,1);
                }
              });
              this.setState({
                menus:_menus,
                mode:'welcome'
              });
            }
          } else{
            this.setState({
              mode:_mode
            });
          }
        }} />
      </div>
    )
  }
}

export default App;

