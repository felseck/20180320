// modules/NavLink.js
import React from 'react'
import Link from './nav.link'
import AdSense from 'react-adsense';
//import Filters from '../lists/list.filters'


export default React.createClass({

  notShowPages:function(){
     return ['/resume','/jobs', '/', '']; //['/jobs'];
  },

   
  render() {

    if(this.notShowPages().indexOf(this.props.props.location.pathname) != -1) return(<div></div>);
    return(
    	 <div className="col-md-3 col-lg-3">

    	  <h2></h2>

    <AdSense.Google client='ca-pub-9456391153352424'
                slot='4875304826'
                style={{display:'block'}}
                format='auto' />
           

         

            
        </div>
);
  }
})
