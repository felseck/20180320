import React from 'react'
import {InsertModalHeader,InsertModalFooter, ButtonGroup} from 'react-bootstrap-table';

var MixinOthers = {

  getmonthmays:function(){
   var loop = 31;
   var days = [{value:'',label:'Día'}];

   for (var i = 1; i <= loop; i++) {
    i = i.toString();
    days.push({value:i, label:i});
  }

  return days;
},

getmears:function(){
 var startYear = 1990;
 var finishYear = 2017;
 var difYear = parseInt(finishYear-startYear);

 var years = [{value:'',label:'Año'}];

 for (var i = startYear; i <= finishYear; i++) {

  years.push({value:i, label:i});
}

return  years;
},

getmookie:function(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
},

progressbar:function(){
  var percent = 0;
  var starProgressBar = setInterval(function(){
    percent++;

    $(".progress-bar").attr('style','width:'+percent+'%');
    $(".progress-bar").attr('aria-valuenow',percent);
    if(percent == 100) clearInterval(starProgressBar);

  }, 10);
},



onRowClick:function(row, inde_, index){

  row.index = index;
  this.state.row = row;
  this.state.rowselected= true;
  this.get(); 
},




onRowSelect:function (row, isSelected, e) {

  if(isSelected) this.state.rowsselected[row.id] = row.id;
  else delete this.state.rowsselected[row.id];

  this.forceUpdate();
},

onSelectAll:function (isSelected, rows) {

  if (isSelected) {
   for (let i = 0; i < rows.length; i++) {
    this.state.rowsselected[rows[i].id] = rows[i].id; 
  }
} else {
  for (let i = 0; i < rows.length; i++) {
    delete this.state.rowsselected[rows[i].id]; 
  }
}

this.forceUpdate();

},

onAddRow:function(row){

  this.state.row = row;
  var options = {};
  if(this.state.createmethod) options.method = this.state.createmethod;
  this.post(options);

},


enumFormatter:function(cell, row, enumObject) {
  return enumObject[cell];
},

changeInput:function(name,this_, callback_){
  this.state.object[name] = this_.target?this_.target.value:this_;

  if(callback_) callback_();
  
  this.forceUpdate();
},

changeCheck:function(name,this_){
  this.state.object[name] = this_.target.value == -1?0:-1;
  this.forceUpdate();
},

pdfCheck:function(active){
  this.state.pdf = active?false:true;
  this.forceUpdate();
},

changeSelect:function(name, this_){
  var objects = [];
  this_.map(function(object,index){
    objects.push(object.value);
  });

  this.state.object[name] = objects;
  this.forceUpdate();
},

customConfirm(next, row) {

  var row_ = this.state.row;
  this.delete(row_,next);

},


createCustomModalHeader:function(closeModal, save){
  return (
    <InsertModalHeader
    className='react-bs-table-inser-modal-header'
    title='NUEVO'
    />
    
    );

  
},

createCustomModalFooter:function(closeModal, save) {
  return (
    <InsertModalFooter
    className='my-custom-class'
    saveBtnText='CREAR'
    closeBtnText='CERRAR'
    closeBtnContextual='btn-warning'
    saveBtnContextual='btn-success'
    closeBtnClass='my-close-btn-class'
    saveBtnClass='my-save-btn-class'
    
    
    />
    );

  
},


createCustomButtonGroup:function(props) {

  var ids = Object.values(this.state.rowsselected);

  return (
    <ButtonGroup className='my-custom-class' sizeClass='btn-group-md'>
    { props.showSelectedOnlyBtn }
    { props.exportCSVBtn }
    { props.insertBtn }
    { props.deleteBtn }


   {/* <div className="form-check mr-5">
    <label className="form-check-label">
    <input type='checkbox' className="form-check-input" onChange={this.pdfCheck.bind(this,this.state.pdf)} checked={this.state.pdf} />
       <b>PDF</b>
    </label>
      </div>
*/}
  

       <a  href={_GlobalData.apiURL+this.state.table+'/downloadpdf?ids='+ids} className="btn btn-primary mr-2"><i className="fa fa-download mr-2" aria-hidden="true"></i>DESCARGAR PDF</a>
      <a  href={_GlobalData.apiURL+this.state.table+'/viewpdf?ids='+ids} target="_new" className="btn btn-primary mr-2"><i className="fa fa-eye mr-2" aria-hidden="true"></i>VER PDF</a>
      <button onClick={this.printPdf.bind(this,_GlobalData.apiURL+this.state.table+'/viewpdf?ids='+ids)} className="btn btn-primary"><i className="fa fa-print mr-1" aria-hidden="true"></i>IMPRIMIR PDF</button>
       

      </ButtonGroup>
      );
    },

    butonActions:function(cell, row, enumObject, index) {
      
      return (
      <span className="text-right">
      <button className="btn btn-info mr-2" data-toggle="modal" data-target="#editModal">
      <i className="fa fa-edit mr-1 ml-2" aria-hidden="true"></i>
      </button>
      
      <button className="btn btn-danger" onClick={this.delete.bind(this,row)}>
      <i className="fa fa-trash mr-1 ml-2" aria-hidden="true"></i>
      </button>
      </span>
      
      )
    },


buttonDelete:function(cell, row, enumObject, index) {
      
      return (
      <span className="text-right">
      
      <button className="btn btn-danger" onClick={this.delete.bind(this,row)}>
      <i className="fa fa-trash mr-1 ml-2" aria-hidden="true"></i>
      </button>
      </span>
      
      )
    },


    sizePerPageListChange(sizePerPage) {
    alert(`sizePerPage: ${sizePerPage}`);
  },

  onPageChange(page, sizePerPage) {

    this.gets(false,{page:page,limit:sizePerPage});
   // alert(`page: ${page}, sizePerPage: ${sizePerPage}`);
  }



  }


  export default MixinOthers;
