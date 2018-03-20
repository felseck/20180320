// modules/NavLink.js
import React from 'react'
import Link from './nav.link'
import AdSense from 'react-adsense';
//import Filters from '../lists/list.filters'


export default React.createClass({

  notShowPages:function(){
    return []; //['/jobs'];
  },

   
  render() {

    if(!$.inArray(this.props.props.location.pathname,this.notShowPages())) return(<div></div>);
    return(
    	<div>

    	  <h2>Sidebar</h2>

           

    	 <ul className="nav flex-column">
 <li className="nav-item">
    <Link className="nav-link active" to="/admin/facebookgroups">Grupos Facebook</Link>
  </li>


    <li className="nav-item">
    <Link className="nav-link active" to="/admin/months">Meses</Link>
  </li>

    <li className="nav-item">
    <Link className="nav-link active" to="/admin/genders">Generos</Link>
  </li>

    <li className="nav-item">
    <Link className="nav-link active" to="/admin/civilstatus">Estados Civil</Link>
  </li>

    <li className="nav-item">
    <Link className="nav-link active" to="/admin/phonestypes">Tipos de Telefono</Link>
  </li>

    <li className="nav-item">
    <Link className="nav-link active" to="/admin/countries">Paises</Link>
  </li>

    <li className="nav-item">
    <Link className="nav-link active" to="/admin/states">Estados</Link>
  </li>

    <li className="nav-item">
    <Link className="nav-link active" to="/admin/cities">Ciudades</Link>
  </li>

    <li className="nav-item">
    <Link className="nav-link active" to="/admin/driverslicenses">Licencias de Manejo</Link>
  </li>

  <li className="nav-item">
                <Link  className="nav-link" to="/admin/notifications">Notificaciones</Link >
            </li>

            <li className="nav-item">
                <Link  className="nav-link" to="/admin/notificationsusers">Not Usuarios</Link >
            </li>

            <li className="nav-item">
                <Link  className="nav-link" to="/admin/notificationsstatus">Not Estatus</Link >
            </li>

            <li className="nav-item">
                <Link  className="nav-link" to="/admin/notificationstypes">Not Tipos</Link >
            </li>

            <li className="nav-item">
                <Link  className="nav-link" to="/admin/systemevents">Eventos</Link >
            </li>
            

            <li className="nav-item">
                <Link  className="nav-link" to="/admin/situationsstatus">Estatus de Situaciones</Link >
            </li>

            <li className="nav-item">
                <Link  className="nav-link" to="/admin/informatics">Informaticos</Link >
            </li>

            <li className="nav-item">
                <Link  className="nav-link" to="/admin/languages">Idiomas</Link >
            </li>

            <li className="nav-item">
                <Link  className="nav-link" to="/admin/studieslevelsstatus">Estatus de Niveles de Estudios</Link >
            </li>

            <li className="nav-item">
                <Link  className="nav-link" to="/admin/studieslevels">Niveles de Estudios</Link >
            </li>

            <li className="nav-item">
                <Link  className="nav-link" to="/admin/companiesactivities">Actividades de la Empresa</Link >
            </li>


            <li className="nav-item">
                <Link  className="nav-link" to="/admin/resumessent">CVs Enviados</Link >
            </li>


            <li className="nav-item">
                <Link  className="nav-link" to="/admin/resumessentstatus">CV Status</Link >
            </li>
  

            <li className="nav-item">
                <Link  className="nav-link" to="/admin/companies">Empresas</Link >
            </li>
</ul>

            <ul className="nav flex-column pl-1">

            
            {/* <Filters onChange={this.props.onChange} />  */}

            </ul>
        </div>
);
  }
})
