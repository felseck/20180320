
import React from 'react'

var SesionHelper = React.createClass({
  mixins:[],
  getInitialState() { //react method
  	return {  
  		render:true
  	};
  },
  componentDidMount(){
  
 },



componentWillMount(){
  
},


componentWillReceiveProps(props_){

 
},



render(){

 
 return(

    <div className="card p-5 m-6">

    <div className="card-block">
    <h2>{this.props.title}</h2>
    <a href="/auth/facebook" className="btn btn-labeled btn-primary">
                <span className="btn-label"><i className="fa fa-facebook-square "></i></span>Iniciar Sesión con Facebook</a>
    </div>

    </div>
  )
}

});

export default SesionHelper;