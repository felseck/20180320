// modules/NavLink.js
import React from 'react'
import Link from './nav.link'

import MixinAjax from '../mixins/mixin.ajax'
import MixinOthers from '../mixins/mixin.others'
import SesionHelper from '../helpers/helper.sesion'

export default React.createClass({
mixins:[MixinAjax,MixinOthers],
getInitialState(){
  return {
    usersonline:0,
    formConfig:{
      doc:{}
    }
  }
},


  componentDidMount(){

    if(this.getCookie('authenticated') == 'true') this.getUserProfile();
   
    _GlobalData.socket.on('usersonline',function(data_){
        this.setState({usersonline:data_.number})
    }.bind(this))

    $(".nav-item").on('click',function(){

     this.progressBar();


    }.bind(this));
  },

  render() {

  
    return(
      <div>
  <div className="progress fixed-top">
  <div className="progress-bar bg-success" role="progressbar" style={{width: '0%'}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<nav className="navbar fixed-top_ navbar-toggleable-md navbar-light bg-default p-4_">
 {/* <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
 */}


   <div className="container">
  <img className="navbar-brand" style={{width:'150px'}} src="/img/changoempleos_logo.png"/>

   {/*<div className="collapse navbar-collapse" id="navbarSupportedContent">
 */}
    <ul className="navbar-nav ml-auto">
   {/*  <li className="nav-item active">
        <Link to="/" className="btn btn-labeled btn-info rounded-0">
                <span className="btn-label rounded-0"><i className="fa fa-home"></i></span>Inicio</Link>
      </li>
      */} 
      <li className="nav-item">
        <Link to="/jobs" className="btn btn-labeled btn-info rounded-0">
                <span className="btn-label rounded-0"><i className="fa fa-th-list"></i></span>Lista Empleos</Link>
      </li>

   {/*     <li className="nav-item">
        <Link to="/jobs" className="btn btn-labeled btn-info rounded-0">
                <span className="btn-label rounded-0"><i className="fa fa-user"></i></span>Perfil</Link>
      </li>
*/}
     <li className="nav-item">
        <Link to="/createcompany"  className="btn btn-labeled btn-warning rounded-0">
                <span className="btn-label rounded-0"><i className="fa fa-newspaper-o"></i></span>Publicar Empleo</Link>
      </li>

        {/*  <li className="nav-item">
        <Link to="/resume"  className="btn btn-labeled btn-info rounded-0">
                <span className="btn-label rounded-0"><i className="fa fa-newspaper-o"></i></span>Mi Curriculum</Link>
      </li>
 
      <li className="nav-item">
<div className="dropdown">
  <button className="btn btn-muted dropdown-toggle rounded-0" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <i className="fa fa-bell text-danger"></i>10
  </button>
  <ul className="dropdown-menu notifications" role="menu" aria-labelledby="dLabel">
    
    <div className="notification-heading"><h4 className="menu-title">Notifications</h4><h4 className="menu-title pull-right">View all<i className="glyphicon glyphicon-circle-arrow-right"></i></h4>
    </div> 
   <div className="notifications-wrapper"> 
     <a className="content" href="#"> 
       <div className="notification-item">
       <img src="http://www.leapcms.com/images/100pixels1.gif"/>
        <h4 className="item-title">Evaluation Deadline  <small> 1 day ago</small></h4>
        <p className="item-info">Mr hassan has followed you!</p>
      </div>  
    </a>

     <a className="content" href="#">
      <div className="notification-item">
       <img src="http://www.leapcms.com/images/100pixels1.gif"/>
        <h4 className="item-title">Evaluation Deadline  <small> 1 day ago</small></h4>
        <p className="item-info">Marketing 101, Video Assignment</p>
      </div>
    </a> 
     <a className="content" href="#"> 
       <div className="notification-item">
       <img src="http://www.leapcms.com/images/100pixels1.gif"/>
        <h4 className="item-title">Evaluation Deadline  <small> 1 day ago</small></h4>
        <p className="item-info">Mr hassan has followed you!</p>
      </div>  
    </a> 
     <a className="content" href="#"> 
       <div className="notification-item">
       <img src="http://www.leapcms.com/images/100pixels1.gif"/>
        <h4 className="item-title">Evaluation Deadline  <small> 1 day ago</small></h4>
        <p className="item-info">Mr hassan has followed you!</p>
      </div>  
    </a> 
     <a className="content" href="#"> 
       <div className="notification-item">
       <img src="http://www.leapcms.com/images/100pixels1.gif"/>
        <h4 className="item-title">Evaluation Deadline  <small> 1 day ago</small></h4>
        <p className="item-info">Mr hassan has followed you!</p>
      </div>  
    </a>
    
      

   </div> 
  </ul>
</div>
</li>*/} 

</ul>
<ul className="navbar-nav ml-auto">


    <li className="nav-item" data-toggle='tooltip' data-placement="bottom" title="Etas conectado con tu cuenta de facebook">
      
    {this.getCookie('authenticated') == 'true'?<span className="bg-primary p-1 text-white" ><i className="fa fa-user "></i> {this.state.formConfig.doc.name} {this.state.formConfig.doc.lastname}</span>:  <a href="/auth/facebook" className="btn btn-labeled btn-primary">
                <span className="btn-label"><i className="fa fa-facebook-square "></i></span>Regitrate o inicia sesión</a>
                }


           </li>

            

    </ul>
 
  {/*</div> */}
  </div>


</nav>
 </div>
);
  }
})
