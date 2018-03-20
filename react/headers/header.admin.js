
import React from 'react'
import NavTop from '../navs/nav.top'
import AdSense from 'react-adsense';
var redirect = require('react-router').browserHistory;

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

  addToJobFilter(e){
    if(!_GlobalData.JobsFilters) _GlobalData.JobsFilters = {};
  	if (e.key === 'Enter') {
      _GlobalData.JobsFilters.title = e.target.value;

      if(e.target.value == '') delete _GlobalData.JobsFilters.title;

       redirect.push('jobs');
  	}
    
    
  },

	render() {

		return(
			<header className='pb-4 '>
			<NavTop />

			

			</header>
			);
	}
})
