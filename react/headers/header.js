
import React from 'react'
import NavTop from '../navs/nav.top.fixed'
import AdSense from 'react-adsense';
var redirect = require('react-router').browserHistory;
import MixinOthers from '../mixins/mixin.others'

export default React.createClass({
mixins:[MixinOthers],
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
      _GlobalData.Jobs = [];

      $(this.refs.headersearch).trigger('blur');
      this.progressBar();

       redirect.push('jobs');
  	}
    
    
  },

	render() {

		return(
			<header className='pb-4 '>
			<NavTop />

			<div className="container">
			<div className="row">
             <div className="col-md-8 col-lg-8">

             <AdSense.Google client='ca-pub-9456391153352424'
                slot='4875304826'
                style={{display:'block'}}
                format='auto' />
             </div>

			<div className="col-md-4 col-lg-4">
			<h4><span className="badge badge-danger" data-toggle='tooltip' data-placement="left" title="Es la cantidad de usuarios que se encuantran conectados en este momento">{this.state.usersonline}</span> usuarios en este momento</h4>
			
			<div className="inline-block rounded bg-info p-1" data-toggle='tooltip' data-placement="bottom" title="Ingresa una palabra por ejemplo: doctor, ingeniero, diseñador, etc.. y despées presiona ENTER">
			<div className="input-group" >
			<span className="input-group-addon bg-primary" id="basic-addon1"><i className="fa fa-tags fa-2x_ text-white" aria-hidden="true"></i></span>
			<input type="search" className="form-control" ref="headersearch" onKeyPress={this.addToJobFilter} placeholder="busca un empleo" aria-describedby="basic-addon1" />
			</div>
			</div> 

			</div>
			</div>



			</div>

			</header>
			);
	}
})
