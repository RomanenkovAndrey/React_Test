import React from 'react'
import { connect } from 'react-redux'
import {changeText,changeDataModel} from '../actions/index.js'


var ViewItem = React.createClass({
  render:function(){
    var showField = this.props.showField;
    var className = 'itemView' + (this.props.isSelected==true?' selected':' ')
                               + (this.props.isHover==true?' hover':' ');

    return (<div className={className} id={this.props.index}>
              <span id ={this.props.index}>{this.props.data[showField]}</span>
            </div>);
  }
});

var ListView = React.createClass({
  render :function(){
    var isEmpty = (this.props.data==undefined||
                   this.props.data.length==undefined||
                   this.props.data.length==0);
    if(isEmpty)
      return (<div className='listView empty'/>);
    var items = this.props.data.map(function(item,index){
        return <ViewItem key={index} index={index} data={item} 
        isSelected={this.props.selectedItem==index?true:false}
        isHover={this.state.hoverItem==index?true:false}
        showField={this.props.showField} />;
    }.bind(this));
    return (<div className='listView' style={this.props.style} ref='listView'
      onFocus={this.handleFocusIn} onClick={this.handleClick} onMouseOut={this.handleMouseOut} 
      onMouseMove={this.handleMouseMove}>
              {items}
            </div>);
  },
  handleClick:function(e){
    var id = e.target.attributes['id'];
    if(id!=undefined)
    {
      this.setState({hoverItem:-1});
      this.props.handleClick(e.target.textContent,id);
    }
  },
  getInitialState:function(){
    return {
      hoverItem:this.props.hoverItem
    }
  },
  handleMouseMove:function(e){
    this.focusIn = true;
    var id = e.target.attributes['id'];
    if(id!=undefined)
    {
      this.state.hoverItem!=id.value?this.setState({hoverItem:id.value}):'';
    }
  },
  handleMouseOut:function(){
    this.focusIn = false;
    this.setState({hoverItem:-1});    
  }
});

var SearchInput =React.createClass( {
 render:function(){
    return (<div className='searchInput'>
                <input type='text' ref='input' onChange={this.handleChangeText} 
                placeholder='Search Twitter users...' value={this.props.inputText}
                onFocus={this.handleFocusIn} onBlur={this.handleBlur} onKeyUp={this.handleKeyUp}/>
                <ListView style={(this.state.showPopup==true &&this.props.isLoading==false) ?this.state.show:this.state.hide}
                data={this.props.dataModel} selectedItem={this.state.selectedItem}
                handleClick={this.handleSelectItem} ref='listView' showField={this.props.showField}/>
                <div className='' style={this.props.isLoading==true?this.state.show:this.state.hide}>
                    <div className='bounce1'></div>
                    <div className='bounce2'></div>
                    <div className='bounce3'></div>
                </div>
            </div>
          );
  },
  handleSelectItem:function(text, item){
    this.props.handleChangeText(text);
    this.updatePopUp(false,item);
  },
  handleKeyUp:function(e){
    var isShow = true;
    var item = this.state.selectedItem;
    var oldItem = item;
    switch(e.key){
      case 'ArrowDown':
        item = (item+1) >this.props.dataModel.length?this.props.dataModel.length:item+1;
      break;
      case 'ArrowUp':
        item = (item-1) <-1?0:item-1;
        break;
      case 'Enter':
        isShow = false;
        break;
      default:
    }
    if(oldItem!=item){
      var text = (item==-1)?'':this.props.dataModel[item].data;
      this.props.handleChangeText(text);
    }
    this.updatePopUp(isShow,item);
  },
  updatePopUp:function(isShow, selectItem=-1){
    var newState={};
    if(isShow){
      newState.showPopup = true;
      newState.selectedItem = selectItem;
    }else{
      newState.showPopup = false;
    }
    this.setState(newState);
  },
  handleFocusIn:function(){
    this.updateFind();
    this.setState({
                    showPopup:true,
                    selectedItem:-1
                  });
  },
  handleBlur:function(){
    if(this.refs.listView.focusIn!=true){
      this.setState({
                      showPopup:false,
                      selectedItem:-1,
                    });
    }
  },
  updateFind:function(text=this.refs.input.value){
    var findText = text.trim();
    this.props.functionFind(findText);
  },
  handleChangeText:function(e){
    var text = e.target.value;
    this.props.handleChangeText(text);
    this.updateFind(text);
  },
  getInitialState:function(){
    return {
      hide:{display:'none'},
      show:{display:'block'},
      findText:'',
      showPopup:false,
      selectedItem:-1
    }
  }
});

function mapStateToProps (state) {
  return {
    inputText:state.inputText,
    currentItem:state.currentItem,
    dataModel:state.dataModel,
    isLoading:state.isLoading
  }
}

function mapDispatchToProps (dispatch) {
  return {
    handleChangeText: (text) => {
      dispatch(changeText(text))
    },
    handleChangeDataModel: (newModel) => {
      dispatch(changeDataModel(newModel))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)

