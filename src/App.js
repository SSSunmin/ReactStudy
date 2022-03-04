import React, { Component } from 'react';
import TOC from "./component/TOC";
import ReadContent from './component/ReadContent';
import CreateContent from './component/CreateContent';
import UpdateContent from './component/UpdateContent';
import Subject from './component/Subject';
import Control from './component/Control';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state ={
      mode:'welcome',
      selected_content_id :1,
      subject:{title:'WEB', sub:'world wide web!'},
      welcome:{title:'Welcome', desc: 'Hello, React'},
      contents:[
        {id : 1, title:'HTML', desc: 'HTML is HyperText...'},
        {id : 2, title:'CSS', desc: 'CSS is for design'},
        {id : 3, title:'JavaScripts', desc: 'JavaScript is for interactive!'},
      ]
    }
  }
  getReadContent(){
    let i =0;
    while(i< this.state.contents.length){
      let data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
        break;
      }
      i=i+1;
    }
  }
  
  getContent(){
    let _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc=this.state.welcome.desc;
      _article=<ReadContent title={_title} desc ={_desc}></ReadContent>
    }else if(this.state.mode ==='read'){   
      let _content = this.getReadContent(); 
      _article=<ReadContent title={_content.title} desc ={_content.desc}></ReadContent>
    }else if(this.state.mode === 'create'){
      _article=<CreateContent onSubmit={function(_title, _desc){
        // add create to this.state.contents
        this.max_content_id = this.max_content_id+1;
        //this.state.contents.push({ id:this.max_content_id, title:_title, desc:_desc}); 
        //let _contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc});
        let newcontents = Array.from(this.state.contents);
        newcontents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({contents:newcontents, mode: 'read', selected_content_id: this.max_content_id});
        console.log(_title,_desc);
      }.bind(this)}></CreateContent>
    }else if(this.state.mode ==='update'){
      let _content=this.getReadContent();
      _article=<UpdateContent data={_content} onSubmit={
        function(_id,_title, _desc){
        let _contents = Array.from(this.state.contents);
        var i = 0;
        while(i<_contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id:_id, title:_title, desc: _desc};
            break;
          }
          i = i + 1;
        }
        this.setState({contents: _contents, mode: 'read'})
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  render() {
    
    return (
      <div className='App'>
        <Subject title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
          ></Subject>
        <TOC onChangePage={function(id){
          this.setState({
            mode:'read',
            selected_content_id:Number(id)
          });
        }.bind(this)}data={this.state.contents}></TOC>
        <Control onChangeMode={function(_mode){
          if(_mode==='delete'){
            if(window.confirm('정말 삭제하시겠습니까?')){
              let _contents = Array.from(this.state.contents);
              let i=0;
              while(i<_contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1);
                  break;
                }

                i=i+1;
              }
              this.setState({contents:_contents, mode:'welcome'})
              alert('삭제되었습니다.');
            }
          }else{
            this.setState({mode:_mode});
          }
        }.bind(this)}></Control>
        
        {this.getContent()}
      </div>
    );
  }
}

export default App;
