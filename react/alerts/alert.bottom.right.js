
import React from 'react'
import Select from 'react-select'

var Alert = React.createClass({
  getInitialState() { //react method
  	return {  
  		message:'',
      display:'none'
  	};
  },
  componentDidMount(){

    _GlobalData.socket.on('usersonline',function(data_){
         this.setState({message:'Hay '+data_.number+' usuarios conectados'});
          this.setTimeout();
    }.bind(this));


    _GlobalData.socket.on('postjob',function(data_){
         
         this.setState({message:data_.message});
         this.setTimeout();
    }.bind(this));


  },

   setTimeout(){
     $('.alert-position').slideDown();
     setTimeout(function () {
        $('.alert-position').slideUp();
    }, 10000);

   },
 
	render(){

		return (
		
    <div className="alert alert-info alert-dismissable alert-position" role="alert" style={{display:this.state.display}}>
                <button type="button" className="close alert-close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true" style={{color: 'white'}}>Cerrar ×</span></button>
                <p className="alert-title">ChangoEmpleos.com</p>
                <p className="alert-body">
                {this.state.message}
                </p>
            </div> 

	)
}
});

export default Alert;