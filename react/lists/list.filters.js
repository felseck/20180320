import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'


export default React.createClass({
    getInitialState(){
     return {  
         JobsFilters:{}

     };
 },

 propTypes:{
  onChange:PropTypes.func
  
 },

 selectFilter:function(this_){

    var JobsFilters= this.state.JobsFilters;




  if($.isArray(this_)) {
 
   var skills = [];
    this_.map(function(info,index){
      
       if(info.filter == 'skills'){
           skills.push(info.value);
       }
    });
    JobsFilters.skills = skills;
  }
  else  JobsFilters[this_.filter] = this_.value;
    _GlobalData.JobsFilters = $.extend(_GlobalData.JobsFilters,JobsFilters);


    this.setState({JobsFilters:JobsFilters});

    

    if(this.props.onChange) this.props.onChange();

},
render() {

	var filters = _GlobalData.JobsFilters || this.state.JobsFilters;
    var categories = _GlobalData.Categories || [];
    var cities = _GlobalData.Cities || [];
    var skills = _GlobalData.Skills || [];
    var timetypes = _GlobalData.TimeTypes || [];


    return (
      <div className="card bg-info">
      <div className="card-header bg-primary text-white">
      <h5>Busca por tipo o por ciudad</h5>
      </div>
      
       <div className="card-block">
      {/*   <Select placeholder='Categoria'  clearable name="category" onChange={this.selectFilter} value={filters.category} options={categories} ></Select>
        <br/>
            <br/>
         <Select placeholder='Habilidades'  multi onChange={this.selectFilter} value={filters.skills} options={skills} ></Select>
       
     */}

     <label htmlFor='tymetype_filter' className="col-form-label" >Tipo de Jornada</label>
           <Select id="tymetype_filter" placeholder='Tipo' clearable name="timetype" onChange={this.selectFilter} value={filters.timetype} options={timetypes} ></Select>
    
     <label htmlFor='city_filter' className="col-form-label" >Ciudad</label>
      <Select placeholder='Ciudad' id="city_filter" clearable name="city" onChange={this.selectFilter} value={filters.city} options={cities} ></Select>
      
    </div>

     </div>
        );
    }
});
