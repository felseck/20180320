// modules/NavLink.js
import React from 'react'
import Link from './nav.link'
export default React.createClass({

     getInitialState(){
  return {
    usersonline:0
  }
},


  componentDidMount(){
    _GlobalData.socket.on('usersonline',function(data_){
        this.setState({usersonline:data_.number})
    }.bind(this))
  },

  render() {

  
    return(
    	<nav className="navbar navbar-fixed-top navbar-toggleable-sm navbar-inverse bg-primary mb-3">
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="flex-row d-flex">
        <a className="navbar-brand mb-1" href="#">ChanguoEmpleos</a>
        <button type="button" className="hidden-md-up navbar-toggler" data-toggle="offcanvas" title="Toggle responsive left sidebar">
            <span className="navbar-toggler-icon"></span>
        </button>
    </div>
    <div className="navbar-collapse collapse" id="collapsingNavbar">
        <ul className="navbar-nav">
            <li className="nav-item active">
                <Link className="nav-link" to="/" onlyActiveOnIndex>Inicio <span className="sr-only">Inicio</span></Link>
            </li>

           


            <li className="nav-item">
                <a  className="nav-link" href="/auth/facebook">Conectar con faceboo</a>
            </li>

        

            <li className="nav-item">
                <Link  className="nav-link" to="/admin/jobs">Empleos</Link >
            </li>

            <li className="nav-item">
                <Link  className="nav-link" to="/admin/categories">Categorias</Link >
            </li>

            <li className="nav-item">
                <Link  className="nav-link" to="/admin/locations">Lugares</Link >
            </li>

            <li className="nav-item">
                <Link  className="nav-link" to="/admin/timetypes">Tipos</Link >
            </li>

            <li className="nav-item">
                <Link  className="nav-link" to="/admin/skills">Habilidades</Link >
            </li>

            <li className="nav-item">
                <Link  className="nav-link" to="/admin/users">Usuarios</Link >
            </li>

            
        </ul>
        <ul className="navbar-nav ml-auto">
       
            
        </ul>
    </div>
</nav>
);
  }
})
