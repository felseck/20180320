import React from 'react'
import Ajax from '../mixins/mixin.ajax'

export default React.createClass({
  mixins:[Ajax],
	getInitialState(){
       return {  
      PostJobForm:{
        title:'',
        description:'',
        category:'',
        city:'',
        salary:'',
        skills:[],
        timetype:''
      }
     
    };
	},

  

  onChange:function(this_){

     var JobForm = this.state.PostJobForm;
     var value = this_.target.value;
     var name = this_.target.name;

     if(name == 'skills') {
        console.log(JobForm[name].indexOf(value));
      if(JobForm[name].indexOf(value) != -1) JobForm[name].splice(JobForm[name].indexOf(value), 1);
      else JobForm[name].push(value);
    }
     else JobForm[name] = value;

     this.setState({PostJobForm:JobForm});

  },

  render() {

    var categories = _GlobalData.Categories || [];
    var cities = _GlobalData.Cities || [];
    var skills = _GlobalData.Skills || [];
    var timetypes = _GlobalData.TimeTypes || [];
    var companies = _GlobalData.Companies || [];


    return(
    
    <div className="modal fade" id='PostJobModal' tabIndex={1} role="dialog"> 
    <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
            <div className="modal-header bg-primary">
               <h4 className="modal-title" id="myModalLabel">Publicar Empleo</h4> 
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                </button>
            </div>
            <div className="modal-body bg-success" >
                
                <div className="ch-padding PostJobForm">
                <div className="form-group row">
                  <label htmlFor="example-text-input" className="col-2 col-form-label">Título</label>
                    <div className="col-10">
                     <input className="form-control" name='title' onChange={this.onChange} type="text" defaultValue={this.state.PostJobForm.title} value={this.state.PostJobForm.title}  />
                    </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="example-text-input" className="col-2 col-form-label">Descripción</label>
                    <div className="col-10">
                     <textarea className="form-control"  name='description' onChange={this.onChange}  defaultValue={this.state.PostJobForm.description} value={this.state.PostJobForm.description}  ></textarea>
                    </div>
                </div>


                <div className="form-group row">
                  <label htmlFor="example-text-input" className="col-2 col-form-label">Categoria</label>
                    <div className="col-10">
                     <select  name='category'className="form-control" onChange={this.onChange}  defaultValue={this.state.PostJobForm.category} value={this.state.PostJobForm.category}  >
                     
                     <option value=''>Seleccionar</option>

                     {categories.map(function(category,index){
                        return(
                          
                          <option key={index} value={category._id}>{category.name}</option>
                          
                          )
                     })}

                     </select>
                    </div>
                </div>


                <div className="form-group row">
                  <label htmlFor="example-text-input" className="col-2 col-form-label">Lugar</label>
                    <div className="col-10">
                     <select  name='city'className="form-control" onChange={this.onChange}  defaultValue={this.state.PostJobForm.city} value={this.state.PostJobForm.city}  >
                     
                     <option value=''>Seleccionar</option>

                     {cities.map(function(city,index){
                        return(
                          
                          <option key={index} value={city._id}>{city.name}</option>
                          
                          )
                     })}

                     </select>
                    </div>
                </div>


                <div className="form-group row">
                  <label htmlFor="example-text-input" className="col-2 col-form-label">Habilidades</label>
                    <div className="col-10">
                     <select  multiple name='skills'className="form-control" onChange={this.onChange}  defaultValue={this.state.PostJobForm.skills} value={this.state.PostJobForm.skills}  >
                     
                     <option value=''>Seleccionar</option>

                     {skills.map(function(skill,index){
                        return(
                          
                          <option key={index} value={skill._id}>{skill.name}</option>
                          
                          )
                     })}

                     </select>
                    </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="example-text-input" className="col-2 col-form-label">Tipo de tiempo</label>
                    <div className="col-10">
                     <select  name='timetype'className="form-control" onChange={this.onChange}  defaultValue={this.state.PostJobForm.timetype} value={this.state.PostJobForm.timetype}  >
                     
                     <option value=''>Seleccionar</option>

                     {timetypes.map(function(timetype,index){
                        return(
                          
                          <option key={index} value={timetype._id}>{timetype.name}</option>
                          
                          )
                     })}

                     </select>
                    </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="example-text-input" className="col-2 col-form-label">Empresa</label>
                    <div className="col-10">
                     <select  name='company'className="form-control" onChange={this.onChange}  defaultValue={this.state.PostJobForm.copany} value={this.state.PostJobForm.company}  >
                     
                     <option value=''>Seleccionar</option>

                     {companies.map(function(company,index){
                        return(
                          
                          <option key={index} value={company._id}>{company.name}</option>
                          
                          )
                     })}

                     </select>
                    </div>
                </div>



<label className="sr-only" htmlFor="inlineFormInputGroup">Salario</label>
  <div className="input-group mb-2 mr-sm-2 mb-sm-0">
    <div className="input-group-addon">$</div>
    <input type="text" className="form-control" onChange={this.onChange}  id="inlineFormInputGroup" defaultValue={this.state.PostJobForm.salary} value={this.state.PostJobForm.salary} name='salary' placeholder="Salario" />
  </div>


                 </div>

            </div>
            <div className="modal-footer bg-success">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-success-outline" onClick={this.publishPost} data-dismiss="modal">Publicar</button>
            </div>
        </div>
    </div>
</div>

);
  }
})
