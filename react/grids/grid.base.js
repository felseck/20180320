
import React from 'react'
import Ajax from '../mixins/mixin.ajax'
import Select from 'react-select'
import GridConfig from './grid.config'

export default React.createClass({
	mixins:[Ajax,GridConfig],
  getInitialState() { //react method
  	return {  
  		page:1,
  		paginator:false,
  		Jobs:[],
  		selectedRowIndex:-1,
  		addDoc:false,
  		
  	};
  },

  addDoc(){
  	this.setState({selectedRowIndex:-1,addDoc:true});
  },

  createdDoc(){
   this.setState({selectedRowIndex:0,addDoc:false},function(){
    this.componentDidMount();
   }.bind(this));
  },

  savedDoc(){
   this.setState({addDoc:false},function(){
    this.componentDidMount();
   }.bind(this));
  },

  componentWillMount(){
  },

  componentDidMount(){

  	eval('this.grid_'+this.props.location.pathname.replace(/\//gi,'')+'()').ajaxMethods.map(function(method,index){
           eval(method);
    }.bind(this));
  },

  selectRow(index_){
  	this.setState({selectedRowIndex:index_,addDoc:false});
  },

  render() {
  	var grid = eval('this.grid_'+this.props.location.pathname.replace(/\//gi,'')+'()');

  	var docs = grid.docs;

  	var doc = docs[this.state.selectedRowIndex];
    if(this.state.addDoc) doc = {addDoc:true};

    var apiUrl = grid.apiUrl;
  	var options = grid.options;

   
  return(
  	<div className="col-md-9 col-lg-10 main"> 
     <div className="card">
      <div className="card-header">
      <button className="btn btn-success cursor-pointer" onClick={this.addDoc}>Agregar</button>
      </div>

      <div className="card-block_">
  	<div className="table-responsive" style={{height:'300px'}}>
  	<table className="table table-striped table-hover_ table-bordered">
  	<thead className="thead-inverse">
  	<tr>
  	<th>#</th>
  	{options.map(function(option,index){
  		if(option.visible)  return (<th key={index}>{option.label}</th>)
  			
  	})}
  	</tr>
  	</thead>

  	<tbody>

  	{docs.map(function(doc,index){ 

      

  		var active = '';
  		if(index == this.state.selectedRowIndex) active = 'bg-success';
  		return(
  		<tr key={index} onClick={this.selectRow.bind(this,index)} className={'cursor-pointer table-active_ hover '+active}>
  		<td className="bg-info">{index+1}</td>
  		{options.map(function(option,index){
           var split_ = option.key.split('.'); 
           
           if(option.visible && option.fieldtype == 'checkbox') return (<td key={index}>{eval('doc.'+split_[0])?eval('doc.'+option.key)?'Si':'No':'No'}</td>)
           if(option.visible) return (<td key={index}>{eval('doc.'+split_[0])?eval('doc.'+option.key):''}</td>)

  				
  		})}

  		</tr>
  		)
  	}.bind(this))}

  	</tbody>
  	</table>

  	</div>

   <div className="card-footer text-center">
  	{this.state.paginator?<button className="btn btn-success cursor-pointer" onClick={this.getJobs.bind(this,false)}>Cargar mas Empleos</button>:''}
    </div>

      </div>
    </div>
     
  	<Tabs doc={doc || -1} selectedRowIndex={this.state.selectedRowIndex} options={options} defaultProps={{'category':{_id:-1}}} apiUrl={apiUrl} location={this.props.location} createdDoc={this.createdDoc} savedDoc={this.savedDoc} ></Tabs>
  	</div>

  	);
  }
});





var Tabs = React.createClass({
  mixins:[Ajax,GridConfig],
  getInitialState() { //react method
  	return {  
  		FormInfo:this.props.defaultProps || {},
  		render:true
  	};
  },
  componentDidMount(){
  	this.setState({FormInfo:{}});
  },

  componentWillReceiveProps(props_){
  
  	this.setOptions(props_)
    this.setState({FormInfo:{}});
  },

  onCheckBoxChange:function(name_, value_){

   var FormInfo = this.state.FormInfo;

   console.log(FormInfo[name_]);
   FormInfo[name_] = !FormInfo[name_];
console.log(FormInfo[name_]);
   this.setState({FormInfo:FormInfo});

  },


onMultiSelectChange:function(name_, value_){
 
     var FormInfo = this.state.FormInfo;

     FormInfo[name_] = value_.split(',');

     this.setState({FormInfo:FormInfo});

  },

  onSelectChange:function(name_, value_){
 
     var FormInfo = this.state.FormInfo;

     FormInfo[name_] = value_;

     this.setState({FormInfo:FormInfo});

  },
	
	onChange:function(this_){

     var FormInfo = this.state.FormInfo;
     var value = this_.target.value;
     var name = this_.target.name;

  
     FormInfo[name] = value;

     this.setState({FormInfo:FormInfo});

  },

  setVirtualdoc(props_){
  	var doc = props_.doc;
  	
  	props_.options.map(function(option,index){
       var keys = Object.keys(option);
       var values = Object.values(option);

       keys.map(function(key,index){



       if(key == 'key') { 
       	var split_ = values[index].split('.');


       	
       	if(split_.length == 1) doc[split_[0]] = '';



       	if(split_.length == 2 && option.editable) {
       		doc[split_[0]] = {}; doc[split_[0]][split_[1]] = '';
       	}
       
        
   } 
       });

  	});


  	return doc;

  },

  setOptions(props_){
  	
  	var doc = props_.doc;

    if(doc.addDoc) doc = this.setVirtualdoc(props_);
    
  	var keys = Object.keys(doc);
  	var values = Object.values(doc);

  	

  	props_.options.map(function(option,index){
  		keys.map(function(key,index){

        if(option.fieldtype == 'checkbox') this.state.FormInfo[key] = values[index];
  			if(option.key == key){

              option.value = values[index];

  				 if($.isArray(option.value)) {
               	var OptionValue = [];
               	option.value.map(function(optionvalue,index){
                    OptionValue.push(optionvalue._id);
               	});
               	option.value = OptionValue;
               }
  			} 

            var selectkey = option.key.split('.');
  			if(option.fieldtype == 'select' && selectkey[0] == key) {
  				
               option.key = selectkey[0]; 

               if(values[index]) option.value = values[index][selectkey[1]];
               
  			}
  		

  		}.bind(this))

  	}.bind(this)

  	)
  	return props_.options;

  },

	render(){

		var options = this.props.options;
    var doc = this.props.doc;
        
        if(doc == -1) return (<div></div>);

		return (
		
    <div className="card">
      <div className="card-header text-right">
		{doc.addDoc?
      <button className="btn btn-success cursor-pointer" onClick={this.createDoc}>Crear</button>
      :<button className="btn btn-primary cursor-pointer" onClick={this.saveDoc}>Guardar</button>
    }

    </div>
		
    <div className="card-block">

		{options.map(function(option,index){
  			if(option.editable)  return (
<div key={index} >
  				{option.fieldtype == 'text'?
  			     <span>
                  <label>{option.label}</label>
  			       <input className="form-control" name={option.key} onChange={this.onChange} type="text"  value={eval('this.state.FormInfo.'+option.key) || option.value} defaultValue={eval('this.state.FormInfo.'+option.key) || option.value} />
                 </span>
                 :''}

                 {option.fieldtype == 'textarea'?
  			     <span>
                  <label>{option.label}</label>
  			       <textarea className="form-control" name={option.key} onChange={this.onChange}  value={eval('this.state.FormInfo.'+option.key) || option.value} defaultValue={eval('this.state.FormInfo.'+option.key) || option.value} ></textarea>
                 </span>
                 :''}


                {option.fieldtype == 'select'?
                  <span>
                  <label>{option.label}</label>
                  <Select placeholder='Seleccionar' simpleValue name={option.key} onChange={this.onSelectChange.bind(this,option.key)} value={eval('this.state.FormInfo.'+option.key) || option.value} options={option.dropdowndata}/>
                  </span>
  			   :''} 

  			   {option.fieldtype == 'multiselect'?
                  <span>
                  <label>{option.label}</label>
                  <Select placeholder='Seleccionar' multi simpleValue name={option.key} onChange={this.onMultiSelectChange.bind(this,option.key)} value={eval('this.state.FormInfo.'+option.key) || option.value} options={option.dropdowndata}/>
                  </span>
  			   :''} 

{option.fieldtype == 'checkbox'?
           <label className="custom-control custom-checkbox">
      <input type="checkbox" className="custom-control-input" onChange={this.onCheckBoxChange.bind(this,option.key)} name={option.key} checked={typeof eval('this.state.FormInfo.'+option.key) == 'undefined'? option.value:eval('this.state.FormInfo.'+option.key)} />
      <span className="custom-control-indicator"></span>
      <span className="custom-control-description">{option.label}</span>
</label>
 :''}

</div>
  			)
  				else return ''
  		}.bind(this))}
    </div>
	</div>

	)
}
});