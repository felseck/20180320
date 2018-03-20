import React from 'react'
import Modal from './modal.main'

export default React.createClass({

  render() {
  
   if(!_GlobalData.ajaxmessages)	_GlobalData.ajaxmessages = {type:''};

    return(


    
    <div className="modal fade bs-example-modal-lg" id='SuccessMessageModal' tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">

    
   {_GlobalData.ajaxmessages.type?_GlobalData.ajaxmessages.type == 'success'?<SuccessBody/>:<ErrorBody/>:''}

      
    </div>
  </div>
</div>

);
  }
});


var SuccessBody = React.createClass({
	render(){
		return (

		<div className="modal-body bg-modal-body-cuccess">
    <button type="button" className="close" data-dismiss="modal" aria-label="Close">×</button>
     
      <h2>Mensaje:</h2>
      <h4>{_GlobalData.ajaxmessages.success}</h4>
     
      </div>

			)
	}

});

var ErrorBody = React.createClass({
   
	render(){
    
    if(!_GlobalData.ajaxmessages.error.errors) _GlobalData.ajaxmessages.error.errors = {};
    var values = Object.values(_GlobalData.ajaxmessages.error.errors);
    console.log(values);
		return (

		<div className="modal-body bg-modal-body-warning">
     <button type="button" className="close" data-dismiss="modal" aria-label="Close">×</button>
   
      <h4>{_GlobalData.ajaxmessages.errormessage} tezt</h4>

<ul>
      {values.map(function(value,index){
        return(<li key={index}>{value.message}</li>)
      })}
      </ul>
     
      </div>
      
			)
	}


});
