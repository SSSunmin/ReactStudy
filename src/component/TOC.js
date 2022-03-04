import React, { Component } from 'react';

class Toc extends Component{
    shouldComponentUpdate(newPros, newState){
      console.log('====>TOC render shouldComponentUpdate'
        ,newPros.data,
        this.props.data
      );
      if(newPros.data=== this.props.data){
        return false; // render함수 호출 X
      }
      return true; // render함수 호출 O (기본값)
      
    }
    render(){
      console.log('render');
      let lists =[];
      let data = this.props.data;
      let i = 0;
      while(i < data.length){
        lists.push(<li key={data[i].id}>
          <a href={"/content/"+data[i].id} 
          data-id ={data[i].id}
            onClick={function(e){
            e.preventDefault();
            this.props.onChangePage(e.target.dataset.id);}.bind(this)}>{data[i].title}</a></li>);
        i = i + 1;
      }
      return(
        <nav>
              <ul>
                {lists}
              </ul>
          </nav>
      );
    }
  }

  export default Toc;