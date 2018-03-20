import React from 'react'
import Form from '../helpers/helper.form'
//import MixinAjax from '../mixins/mixin.ajax'
//import MixinOthers from '../mixins/mixin.others'
//import SesionHelper from '../helpers/helper.sesion'

export default React.createClass({
  //mixins:[MixinAjax],

  getInitialState() { //react method
  	return { 
      index:this.props.index,
      businesstypeid:this.props.businesstypeid,
      documenttypeid:this.props.documenttypeid,
  		render:true,
  		formConfig:{
        formName:'uploadfiles'+this.props.index,

        doc:{},
        options:[
        {label:'File'+this.props.index+this.props.businesstypeid+this.props.documenttypeid, key:'file'+this.props.index+this.props.businesstypeid+this.props.documenttypeid, editable:true,fieldtype:'file'}

        ],
        ajaxMethods:[
  			 // 'this.getCategories()'
        ],
      //  apiUrl:{create:'job/create'},

  			//button:{method:this.publishPost,text:'Enviar'},


  		},


  	};
  },

  componentDidMount(){

  },

  componentWillReceiveProps: function(props) {
   
    this.setState({
      index:props.index,
      businesstypeid:props.businesstypeid,
      documenttypeid:props.documenttypeid,
    }); 
  },

  render() {


    return (
      <div>
      {this.state.formConfig.doc != -1?<Form businesstypeid={this.state.businesstypeid} documenttypeid={this.state.documenttypeid} onChart={this.props.onChart} config={this.state.formConfig} removecard={'true'} />:''}
     </div>
      )
  }
});




