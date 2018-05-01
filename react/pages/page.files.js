import React from 'react'

import MixinAjax from '../mixins/mixin.ajax'
import MixinAjax_1_1 from '../mixins/mixin.ajax_1_1'
import BusinnesFiles from './page.filesbusiness'
import PageConflictForm from './page.conflictform'
import VendorApplication from './page.documentvendorapplication'
import WNineForms from './page.documentw9form'

import moment from 'moment'

global.userid = false;
global.businesstypeid = false;
global.documentvendorapplicationid = false;
global.documentw9formid = false;
global.freefillonline = false;


export default React.createClass({
  mixins:[MixinAjax,MixinAjax_1_1],

  getInitialState() { //react method
    return {  
      render:true,
      businesstypes:[],
      documentstypes:[]

    };
  },

  componentWillReceiveProps: function(props) {
  //this.forceUpdate();
  this.getUserBusinessTypes();
},

componentWillMount(){


 global.fileschart =[0,100];
 global.totalfiles = 0;
 global.totaluploaded = 0;


 if(this.props.props_) {
  if(this.props.props_.params.id) global.userid = this.props.props_.params.id;
  if(this.props.props_.params.documenttype) global.freefillonline = true;
}

 this.getUserBusinessTypes();

if(!global.freefillonline) {
   this.onChart();
  
}
// if(global.userid) this.getDocumentsTypes(true);
 this.getDocumentsTypes(true);
 
  },

componentDidMount(){



},

onChart:function(action_){
  global.fileschart[0] = Math.round((global.totaluploaded/global.totalfiles)*100);
  global.fileschart[1] = Math.round(((global.totalfiles-global.totaluploaded)/(global.totalfiles))*100);


    // -- Pie Chart Example
    var ctx = $("#myPieChart");
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [_GlobalData.language.uploaded+" "+global.fileschart[0]+'%', _GlobalData.language.nouploaded+" "+global.fileschart[1]+'%'],
        datasets: [{
          data: global.fileschart,
          backgroundColor: ['#007bff', '#dc3545'],
        }],
      },
    });

    if(action_) this.forceUpdate();

  },

  openConflictForm:function(){
    this.forceUpdate();
  },

  onSuccessConflictForm:function(){
    $('.bd-example-modal-lg').modal('hide');
    this.forceUpdate();
  },

  deleteConflictForm:function(){
    this.forceUpdate();
  },

update:function(){
    this.forceUpdate();
  },

newFiledDocument:function(data_){
  global.documentvendorapplicationid = false;
  global.documentw9formid = false;
     $('.'+data_.typename+'Modal').modal();
     this.forceUpdate();
},

closeModal:function(modal){
   $('.'+modal+'Modal').modal('hide');
   this.componentWillMount();
},

editFilledDocument:function(filleddocument){
   $('.'+filleddocument.typename+'Modal').modal();

   if(filleddocument.typename == 'documentsvendorsapplications') global.documentvendorapplicationid = filleddocument.id;
   else if(filleddocument.typename == 'documentsw9forms') global.documentw9formid = filleddocument.id;
   this.forceUpdate();
},


  render() {

    var lang = _GlobalData.language;

    return (
     <div className="col-md-12 col-lg-12">

     <h1 className="text-center">{lang.userfiles}</h1>
     <hr/>
     <div className="row">
     <div className="col-lg-9">

     {this.state.businesstypes[0] && !global.freefillonline?
      <div>
      <b>{lang.username}:</b> {this.state.businesstypes[0].username}<br/>
      <b>{lang.name}:</b> {this.state.businesstypes[0].primarycontact}<br/>
      <b>{lang.nameofcompany}:</b> {this.state.businesstypes[0].companyname}
      <br/><br/><b>Date of the last file uploaded:</b> {moment(this.state.businesstypes[0].lastuploaddate).format('LLL')}

      </div>:''
    } 
    </div>
    <div className="col-lg-3">

    {!global.freefillonline?<div className="card mb-3">
    <div className="card-header">
    <i className="fa fa-pie-chart"></i> {lang.chartfiles}</div>
    <div className="card-body">
    <canvas id="myPieChart" width="50%" height="50"></canvas>
    </div>
    <div className="card-footer small text-muted">{lang.updatedtoday}</div>
    </div>:''}
    </div>
    </div>

    {this.state.businesstypes.map(function(businesstype,index){

      return(


      <div className="card mb-5" >
      <h2 className="card-header text-white bg-success">
      {businesstype.name}
      </h2>
      <BusinnesFiles businesstypeid={businesstype.id} onChart={this.onChart} />

       

      {global.userid || global.freefillonline?<ConflictForms businesstype={businesstype}  onSuccess={this.update} onDelete={this.deleteConflictForm} onClick={this.openConflictForm} />:''}
 

      {businesstype.filename?    <div className="card-footer text-white bg-info_">
      <div><a href={"/smithconnenandgarcia/uploads/"+businesstype.fullfilename} download>
      <button className="btn btn-info"><i className="fa fa-download mr-2" aria-hidden="true"></i>{lang.download} - <i className="fa  fa-file mr-2 " aria-hidden="true"></i> {businesstype.filename}</button>
      </a></div>
      </div>:''}

   </div>



      )


    }.bind(this))}





    {this.state.documentstypes.length>0?
      <div className="card mb-5" >
    <h2 className="card-header text-white bg-info">
    Downloads
    </h2>
    <ul className="list-group list-group-flush">

    {this.state.documentstypes.map(function(documenttype,index){
      

      return(

   
          <li key={index} className="list-group-item">

        <div className="row mb-2">
        <div className="col-md-4 col-lg-4">  
        <b>{documenttype.name}</b>
        </div>
        <div className="col-md-3 col-lg-3">
<a href={"/smithconnenandgarcia/uploads/"+documenttype.fullfilename} download>
        <button className="btn btn-info"><i className="fa fa-download mr-2" aria-hidden="true"></i>Unfiled {lang.download}</button>
        </a>
        </div>

{documenttype.typename!=''?<div className="col-md-3 col-lg-3">
         <button className="btn btn-primary" onClick={this.newFiledDocument.bind(this,documenttype)} ><i className="fa fa-plus mr-2" aria-hidden="true"></i>Fill online</button>
       
</div>:''}
        </div>

        {documenttype.filleddocuments.length>0?documenttype.filleddocuments.map(function(filleddocument,index){
          
          filleddocument.typename = documenttype.typename;
          return(
          <div  className="list-group-item">

        <div className="row">

        <div className="col-md-2 col-lg-2">  
        </div>

        <div className="col-md-2 col-lg-2">  
        {filleddocument.date}
        </div>

          <div className="col-md-3 col-lg-3">  
        <a href={"/smithconnenandgarcia/api/"+documenttype.typename+"/downloadpdf?id="+filleddocument.id} download>
        <button className="btn btn-success"><i className="fa fa-download mr-2" aria-hidden="true"></i>{lang.download} filled</button>
        </a>
        </div>

        <div className="col-md-4 col-lg-4">  
        </div>

        <div className="col-md-1 col-lg-1">
        <div className="btn-group" role="group" aria-label="File Actions">
        <button onClick={this.editFilledDocument.bind(this,filleddocument)} className="btn btn-info btn-sm"><i className="fa fa-edit" aria-hidden="true" ></i></button>
        <button onClick={this.delete.bind(this,{controller:documenttype.typename,id:filleddocument.id,objectname:'Filled Document',callback:this.getDocumentsTypes.bind(this,true)})} className="btn btn-danger btn-sm"><i className="fa fa-trash" aria-hidden="true" ></i></button>
      </div>
       </div>

        </div>

         </div>
         )
          }.bind(this))

         :''}

        </li>


        )


    }.bind(this))}
 
    </ul>


     <div className={"modal fade documentsvendorsapplicationsModal"} tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg" style={{maxWidth:'99%'}}>
  <button type="button" className="close" data-dismiss="modal" aria-label="Close" />
    <div className="modal-content">
      <VendorApplication  closeModal={this.closeModal.bind(this,'documentsvendorsapplications')} />
    </div>
  </div>
</div>

<div className={"modal fade documentsw9formsModal"} tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg" style={{maxWidth:'99%'}}>
  <button type="button" className="close" data-dismiss="modal" aria-label="Close" />
    <div className="modal-content">
      <WNineForms  closeModal={this.closeModal.bind(this,'documentsw9forms')} />
    </div>
  </div>
</div>

    </div>
    :''}


   <div className="modal fade bd-example-modal-lg bg-success_" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
  <button type="button" className="close" data-dismiss="modal" aria-label="Close" />
    <div className="modal-content">

      <PageConflictForm  onSuccess={this.onSuccessConflictForm} />
    </div>
  </div>
</div>

    </div>
    )
  }
});



var ConflictForms =  React.createClass({
  mixins:[MixinAjax],

  getInitialState() { //react method
    return {  
      render:true,
      bussinessconflictforms:[],
    };
  },
  componentDidMount(){
 
    this.getBusinessConflictForms();
  },

  componentWillReceiveProps: function(props) {
    
    this.getBusinessConflictForms();
},

   openConflictFormEdit:function(conflictform_){
   global.buyerconflictformid = conflictform_.id;
   global.businesstypeid = this.props.businesstype.id;
   $('.bd-example-modal-lg').modal();
   this.props.onClick();
  // this.forceUpdate();
  },

  openConflictFormAdd:function(conflictform_){
   global.buyerconflictformid = false;
   global.businesstypeid = this.props.businesstype.id;
   $('.bd-example-modal-lg').modal();
   this.props.onClick();
  // this.forceUpdate();
  },

  


  render(){
    var lang = _GlobalData.language;

    this.props.businesstype.isnotonline = true;
      return (

 <li  className="list-group-item" style={{background:'#F6FFCC'}}>
    
      <div className="row">

         <div className="col-md-6 col-lg-6 m-2 text-center">  
      
          <h5>Conflict of Interest form</h5>
        
        </div>

         {!global.freefillonline?<div className="col-md-3 col-lg-3 m-2">  

         <div className="fileUpload btn btn-primary btn-sm" style={{margin:'0px'}}>
    <span><i className="fa fa-upload mr-2" aria-hidden="true"> <img className={"conflictformuploading conflictformuploading_bussiness"+this.props.businesstype.id} style={{position:'absolute',top:0,left:'5px'}} src="img/upload.gif"/> </i>  {lang.upload} <small>signed</small></span>
    <input type="file"  className="upload" onChange={this.uploadConflictFormFile.bind(this,this.props.businesstype)} />
</div>
           
        </div>:''}

         <div className="col-md-2 col-lg-2 m-2">  
       
          <button onClick={this.openConflictFormAdd} className="btn btn-warning btn-sm"><i className="fa fa-plus mr-2" aria-hidden="true" ></i>Fill new online</button>
   
        </div>
 </div>


    
     {this.state.bussinessconflictforms.length>0?this.state.bussinessconflictforms.map(function(conflictform,index){

      return (
         <div className="row " key={index}  style={{borderTop:'1px solid rgba(0,0,0,.125)'}}>




         <div className="col-md-2 col-lg-2 mt-2  mb-2">  
        {conflictform.created.replace('00:00:00','')}
        </div>

           <div className="col-md-3 col-lg-3 mt-2 mb-2">
<a   href={"/smithconnenandgarcia/api/buyersconflictforms/downloadpdf?id="+conflictform.id}>
        <button className="btn btn-success btn-sm"><i className="fa fa-download mr-2" aria-hidden="true"></i>{lang.download} <small>unsigned</small></button>
        </a>
        </div>

        <div className="col-md-2 col-lg-2 mt-2  mb-2">  

         {!global.freefillonline?<div className="fileUpload btn btn-primary btn-sm" style={{margin:'0px'}}>
     
    <span><i className="fa fa-upload mr-2" aria-hidden="true"> <img className={"conflictformuploading conflictformuploading"+conflictform.id}style={{position:'absolute',top:0,left:'5px'}} src="img/upload.gif"/> </i>  {lang.upload} <small>signed</small></span>
    <input type="file"  name={'conflictform'+index} className="upload" onChange={this.uploadConflictFormFile.bind(this,conflictform)} />
    
</div>:''}
           
        </div>
       

        <div className="col-md-2 col-lg-2 mt-2  mb-2">  
        {conflictform.filename!='' && !global.freefillonline?<a href={"/smithconnenandgarcia/uploads/"+conflictform.fullfilename} download>
        <button className="btn btn-success btn-sm"><i className="fa fa-download mr-2" aria-hidden="true"></i>{lang.download} <small>signed</small></button>
        </a>:''}
        </div>
     
           <div className="col-md-1 col-lg-1 mt-2  mb-2">  
         
        </div>

        <div className="col-md-1 col-lg-1 mt-2  mb-2">
        <div className="btn-group" role="group" aria-label="File Actions">
        <button onClick={this.openConflictFormEdit.bind(this,conflictform)} className="btn btn-info btn-sm"><i className="fa fa-edit" aria-hidden="true" ></i></button>
        <button onClick={this.conflictFormDelete.bind(this,conflictform)} className="btn btn-danger btn-sm"><i className="fa fa-trash" aria-hidden="true" ></i></button>
      </div>
      </div>

         </div>
      )

     }.bind(this)):''}

      

     </li>
     )
 

  }

});



