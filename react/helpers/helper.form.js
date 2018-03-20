
import React from 'react'
import Select from 'react-select'
import MixinAjax from '../mixins/mixin.ajax'
import MixinOthers from '../mixins/mixin.others'


var FormHelper = React.createClass({
  mixins:[MixinAjax, MixinOthers],
  getInitialState() { //react method
  	return {  
  		FormInfo:this.props.config.defaultProps || {},
  		render:true,
      uploaderdisplay:'none',
      addedfiles:[]
  	};
  },
  componentDidMount(){
   this.setState({FormInfo:{}},function(){
    this.setFormInfo();
  }.bind(this));
 },

 loadMethods(){

  this.props.config.ajaxMethods.map(function(method,index){
   eval(method);
 }.bind(this));

},


componentWillMount(){
  this.loadMethods();
  this.setOptions(this.props)

 /* console.log('carga this.props en willmount')
    console.log(this.props)*/

},


componentWillReceiveProps(props_){

 this.setOptions(props_)

 this.setState({render:true},function(){
  }.bind(this));


},

onCheckBoxChange:function(name_, value_){

 var FormInfo = this.state.FormInfo;

 FormInfo[name_] = value_.target.checked;
 this.deleteKey(name_);
 this.setState({FormInfo:FormInfo},function(){
  this.setFormInfo();
}.bind(this));

},


onMultiSelectChange:function(name_, value_){

 var FormInfo = this.state.FormInfo;

 FormInfo[name_] = value_.split(',');


 FormInfo[name_].map(function(value,index){
   if(value == '')  delete FormInfo[name_][index];
 });


 this.deleteKey(name_);

 this.setState({FormInfo:FormInfo},function(){
  this.setFormInfo();
}.bind(this));

},

onSelectChange:function(name_, value_){

 var FormInfo = this.state.FormInfo;

 FormInfo[name_] = value_;

 if(!FormInfo[name_]) {
  delete FormInfo[name_];
  
} 


this.deleteKey(name_);
this.setState({FormInfo:FormInfo},function(){
  this.setFormInfo();
}.bind(this));

},

buttomMethod:function(this_){
  _GlobalData.ajaxmessages = {}
  this.props.config.button.method();
},

onChange:function(this_){

 var FormInfo = this.state.FormInfo;
 var value = this_.target.value;
 var name = this_.target.name;


 FormInfo[name] = value;

 this.deleteKey(name);

 this.setState({FormInfo:FormInfo},function(){
  this.setFormInfo();
}.bind(this));

},

  onChangeFile:function(this_){

  var files = $(this_.target)[0].files;
  var formData = new FormData();
  var filename = files[0].name;

  console.log(files[0]);

 formData.append('file', files[0]);


 /* jQuery.each(files, function(i, file) {
    formData.append('file[]', file);
});*/

  formData.append('businesstypeid', this.props.businesstypeid);
  formData.append('documenttypeid', this.props.documenttypeid);
  this.uploadFiles(formData,filename);

  },


setFormInfo:function(){
  if(!global.FormInfo) global.FormInfo = {};
  global.FormInfo[this.props.config.formName] = this.state.FormInfo;

},

setVirtualdoc(props_){
 var doc = props_.config.doc;

 props_.config.options.map(function(option,index){
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


setDropDownData(props_){
  props_.config.options.map(function(option,index){

    if(option.dropdowndata) {
      option.dropdowndata = typeof option.dropdowndata === 'string' ? !eval(option.dropdowndata)?option.dropdowndata:eval(option.dropdowndata):option.dropdowndata;

    }
  }.bind(this));
},

setOptions(props_){

 var doc = props_.config.doc;

 if(doc.addDoc) doc = this.setVirtualdoc(props_);

 var keys = Object.keys(doc);
 var values = Object.values(doc);

 props_.config.options.map(function(option,index){
  keys.map(function(key,index){

        //if(option.fieldtype == 'checkbox') this.state.FormInfo[key] = values[index];


        if(option.key == key){

          if(option.forminfoload) this.state.FormInfo[option.key] = values[index];

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

      }.bind(this))

}.bind(this)

)
 

},

deleteKey:function(key){




  if(_GlobalData.ajaxmessages.error) if(_GlobalData.ajaxmessages.error.errors) {
    delete _GlobalData.ajaxmessages.error.errors[key];
    $(this.refs[key]).text('');
  }


},

setErrors:function(){
  if(!_GlobalData.ajaxmessages) _GlobalData.ajaxmessages = {};
  if(!_GlobalData.ajaxmessages.error) _GlobalData.ajaxmessages.error = {};
  if(!_GlobalData.ajaxmessages.error.errors) _GlobalData.ajaxmessages.error.errors = {};
  var values = Object.values(_GlobalData.ajaxmessages.error.errors);
  var keys = Object.keys(_GlobalData.ajaxmessages.error.errors);
  keys.map(function(key,index){
   $(this.refs[key]).text(values[index].message);
 }.bind(this));

},

render(){
  var lang = _GlobalData.language;
  this.setErrors();

  var options = this.props.config.options;
  var doc = this.props.config.doc;

  this.setDropDownData(this.props);

  if(doc == -1) return (<div></div>);

    var removecard = !this.props.removecard?'':this.props.removecard;


    return (

    <div className={"card"+removecard}>

    {this.props.config.header?<div className="card-header text-center">

    <h2>{this.props.config.header}</h2>

    </div>:''}

    <div className={"card-block"+removecard}>


    {options.map(function(option,index){

     if(option.editable)  return (
      <div key={index} >
    {option.fieldtype == 'text' || option.fieldtype == 'number'?
    <div className="form-group row">
    <label htmlFor={"label"+option.key} className="col-2 col-form-label" >{option.label}</label>
    <div className="col-10">

    <input className="form-control" id={"label"+option.key} name={option.key} onChange={this.onChange} type={option.fieldtype}  value={eval('this.state.FormInfo.'+option.key) || option.value} defaultValue={eval('this.state.FormInfo.'+option.key) || option.value} />
    <span ref={option.key}></span>
    </div>
    </div>
    :''}

    {option.fieldtype == 'textarea'?
    <div className="form-group row">
    <label htmlFor={"label"+option.key} className="col-2 col-form-label" >{option.label}</label>
    <div className="col-10">

    <textarea style={{ height: 300 }} className="form-control" name={option.key} onChange={this.onChange}  value={eval('this.state.FormInfo.'+option.key) || option.value} defaultValue={eval('this.state.FormInfo.'+option.key) || option.value} ></textarea>
    <span ref={option.key}></span>
    </div>
    </div>
    :''}


    {option.fieldtype == 'select'?
    <div className="form-group row">
    <label htmlFor={"label"+option.key} className="col-2 col-form-label" >{option.label}</label>
    <div className="col-10">

    <Select placeholder='Seleccionar' simpleValue name={option.key} onChange={this.onSelectChange.bind(this,option.key)} value={eval('this.state.FormInfo.'+option.key) || option.value} options={typeof option.dropdowndata === 'string'?[]:option.dropdowndata}/>
    <span ref={option.key}></span>
    </div>
    </div>
    :''} 

    {option.fieldtype == 'multiselect'?
    <div className="form-group row">
    <label htmlFor={"label"+option.key} className="col-2 col-form-label" >{option.label}</label>
    <div className="col-10">
    <Select placeholder='Seleccionar' multi simpleValue name={option.key} onChange={this.onMultiSelectChange.bind(this,option.key)} value={eval('this.state.FormInfo.'+option.key) || option.value} options={typeof option.dropdowndata === 'string'?[]:option.dropdowndata}/>
    <span ref={option.key}></span>
    </div>
    </div>
    :''} 

    {option.fieldtype == 'checkbox'?
    <label className="custom-control custom-checkbox">
    <input type="checkbox" className="custom-control-input" onChange={this.onCheckBoxChange.bind(this,option.key)} name={option.key} checked={typeof eval('this.state.FormInfo.'+option.key) == 'undefined'? option.value:eval('this.state.FormInfo.'+option.key)} />
    <span className="custom-control-indicator"></span>
    <span className="custom-control-description">{option.label}</span>
    </label>
    :''}

    
   {option.fieldtype == 'file'?
 <div>

 {/* {this.state.addedfiles.map(function(filename,index){
     return(
     <span><i className="fa  fa-check mr-2 text-success" aria-hidden="true"></i> {filename} <br/></span>
)
 })}
 */}
 
  <div className="fileUpload btn btn-primary" style={{margin:'0px'}}>
    <span><i className="fa fa-upload mr-2" aria-hidden="true"> <img style={{position:'absolute',top:0,left:'8px', display:this.state.uploaderdisplay}} src="img/upload.gif"/> </i>  {lang.upload}</span>
    <input type="file" name={option.key} className="upload" onChange={this.onChangeFile} />
</div>
</div>
 
    :''}


    {option.fieldtype == 'hr'?<hr/>:''}
    {option.fieldtype == 'h1'?<h1>{option.label}</h1>:''}
    {option.fieldtype == 'h5'?<h5>{option.label}</h5>:''}



    </div>
    )
    else return ''
  }.bind(this))}

<div className="text-center pt-3">
{this.props.config.button?
  <button className="btn btn-primary" onClick={this.buttomMethod}>{this.props.config.button.text}</button>
  :''}
  </div>

  </div>



  </div>

  )
}
});

export default FormHelper;