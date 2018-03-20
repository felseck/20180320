import React from 'react'

import MixinAjax from '../mixins/mixin.ajax'
import Upload from './page.filesuploadform'

var buyerid = _GlobalData.buyerid || false;

export default React.createClass({
  mixins:[MixinAjax],

  getInitialState() { //react method
  	return {  
  		render:true,
      businessfiles:[],
      fileschart:[],

    };
  },

  componentWillReceiveProps: function(props) {
   this.getUserBusinessFiles();
 },

 componentDidMount(){
  this.getUserBusinessFiles(this.setChartFiles);
},

aprovedFile:function(index){
 if(global.userid && !buyerid){
  var businessfile = this.state.businessfiles[index];
  if(!businessfile.expiredate || businessfile.expiredate == ''){
   this.state.businessfiles[index].alertmessagevaliduntil = 'Enter an expiration date';
   this.forceUpdate();
   return;
 }

 this.updateBusinessAprovedFile(index);
}

},

rejectedFile:function(index){ 
 if(global.userid && !buyerid){

  var businessfile = this.state.businessfiles[index];
  if(!businessfile.rejectedreason || businessfile.rejectedreason == ''){
   this.state.businessfiles[index].alertmessage = 'Enter a reason reject';
   this.forceUpdate();
   return;
 }

 this.updateBusinessRejectedFile(index);

}
},



aprovedFileModal:function(index){
 if(global.userid && !buyerid){
  var businessfile = this.state.businessfiles[index];
  
  if(!businessfile.filename){
   return;
 }

 if(businessfile.expiredate || businessfile.expiredate != ''){
   this.state.businessfiles[index].alertmessagevaliduntil = '';
   this.forceUpdate();
 }

 $("#aprovedfilemodal"+businessfile.businesstypeid+businessfile.documenttypeid+index).modal();
}

},

rejectedFileModal:function(index){ 
 if(global.userid && !buyerid){


  var businessfile = this.state.businessfiles[index];
  
  if(!businessfile.filename){
   return;
 }

 if(businessfile.rejectedreason || businessfile.rejectedreason != ''){
   this.state.businessfiles[index].alertmessage = '';
   this.forceUpdate();
 }

 $("#rejectedfilemodal"+businessfile.businesstypeid+businessfile.documenttypeid+index).modal();
}
},

onChangeRejectedReason:function(index,this_){
 if(global.userid && !buyerid){
  this.state.businessfiles[index].rejectedreason = this_.target.value;
  this.forceUpdate();
}
},

onChangeValidUntil:function(index,this_){
 if(global.userid && !buyerid){
  this.state.businessfiles[index].expiredate = this_.target.value;
  this.forceUpdate();
}
},

setChartFiles:function(){

 var length = this.state.businessfiles.length;
 global.totalfiles = global.totalfiles+length;
 this.state.businessfiles.map(function(businessfile,index){

   if(businessfile.filename) {
    global.totaluploaded = global.totaluploaded+1;
   }

   if(length-1 == index) this.props.onChart(true);

 }.bind(this));

},


render() {

  var lang = _GlobalData.language;
  var businessfilenamelast = '';
  return (

    <div>


   <ul className="list-group list-group-flush">
   {this.state.businessfiles.map(function(businessfile,index){

   var businessfilename = businessfile.name;

   if(businessfilename == businessfilenamelast) {
      
     businessfilename = '';
   }else  businessfilenamelast = businessfilename;
   
   var bordertop = {};
   if(businessfilename == '') bordertop = {borderTop:'0px solid red'};
   
    var aproveddisabled = true;
    var rejecteddisabled =true;

    var rejected = businessfile.rejected == -1? true:false;
    var aproved = businessfile.aproved == -1? true:false;

    if(global.userid){
      aproveddisabled = false;
      rejecteddisabled = false;

      if(!businessfile.filename){
       aproveddisabled = true;
       rejecteddisabled =true;
     }
   }

   

   if(buyerid){
      aproveddisabled = true;
      rejecteddisabled = true;
    }



   return(
    <li key={index} className="list-group-item" style={bordertop}>

    <div className="row">

    {rejected?<div className="col-md-12 col-lg-12"><div className="alert alert-danger text-right" role="alert">
    <strong>{lang.rejectedreason}:</strong> {businessfile.rejectedreason}
    </div></div>:''}

    <div className="col-md-3 col-lg-3">
    <b> {businessfilename}</b>
    </div>
    <div className="col-md-5 col-lg-5">
   {businessfile.filename?<span><i className="fa  fa-file mr-2 text-info" aria-hidden="true"></i>  {businessfile.filename} </span>:''}
    
    <div className="row">
    <div className="col-md-4 col-lg-4">
    {buyerid?'':<Upload index={index} onChart={this.props.onChart} businesstypeid={businessfile.businesstypeid} documenttypeid={businessfile.documenttypeid}/>}
    </div>
    {global.userid && businessfile.filename && !buyerid?<div className="col-md-4 col-lg-4"><a href={"/smithconnenandgarcia/uploads/"+businessfile.fullfilename} download>
    <button className="btn btn-success"><i className="fa fa-download mr-2" aria-hidden="true"></i>{lang.download}</button>
    </a></div>:''}
    {businessfile.filename && !buyerid?<div className="col-md-4 col-lg-4">
    <button className="btn btn-danger text-white" onClick={this.deleteFile.bind(this,businessfile)} ><i className="fa fa-trash mr-1" aria-hidden="true"></i>{lang.delete}</button>
    </div>:''}
     </div>
     </div>
    <div className="col-md-4 col-lg-4 text-center">

    <label className="custom-control custom-radio" onClick={this.aprovedFileModal.bind(this,index)} >
    <input id={"radio1"+businessfile.businesstypeid+businessfile.documenttypeid+index} name={"radio"+businessfile.businesstypeid+businessfile.documenttypeid+index} type="radio" checked={aproved} disabled={aproveddisabled}  className="custom-control-input" />
    <span className="custom-control-indicator"></span>
    <span className="custom-control-description" >
    {aproved?<i className="fa fa-check-square text-success mr-1" aria-hidden="true"></i>:''}
    {lang.aproved}</span>
    </label>
    <label className="custom-control custom-radio" onClick={this.rejectedFileModal.bind(this,index)} >
    <input id={"radio2"+businessfile.businesstypeid+businessfile.documenttypeid+index} name={"radio"+businessfile.businesstypeid+businessfile.documenttypeid+index} type="radio" checked={rejected} disabled={rejecteddisabled}  className="custom-control-input text-danger" />
    <span className="custom-control-indicator"></span>
    <span className="custom-control-description"> 
    {rejected?<i className="fa   fa-window-close text-danger mr-1" aria-hidden="true"></i>:''}
    {lang.rejected}</span>
    </label>

    {aproved?<div className="col-md-12 col-lg-12 text-right pt-3">
    <b>{lang.validuntil}:</b> {businessfile.expiredate} {businessfile.expired == -1?<span className="text-danger"> ({lang.expired})</span>:''}
    </div>:''}

    </div>

    </div>



    <div className="modal fade" id={"aprovedfilemodal"+businessfile.businesstypeid+businessfile.documenttypeid+index} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
    <div className="modal-content">
    <div className="modal-header">
    <h5 className="modal-title" id="exampleModalLabel">Approve. Are you sure?</h5>
    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div className="modal-body">
    <p>Are you sure you want to approve this file?</p>

    <label>Valid Until:</label>
    <input className="form-control" type="date" onChange={this.onChangeValidUntil.bind(this,index)} value={businessfile.expiredate} />
    <i className="text-danger">{businessfile.alertmessagevaliduntil}</i>

    </div>
    <div className="modal-footer">
    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
    <button type="button" className="btn btn-primary" onClick={this.aprovedFile.bind(this,index)}>Yes, approve</button>
    </div>
    </div>
    </div>
    </div>


    <div className="modal fade" id={"rejectedfilemodal"+businessfile.businesstypeid+businessfile.documenttypeid+index} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
    <div className="modal-content">
    <div className="modal-header">
    <h5 className="modal-title" id="exampleModalLabel">Are you sure?</h5>
    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div className="modal-body">
    <p>Are you sure you want to reject this file?</p>

    <label>Reject reason:</label>
    <textarea className="form-control" onChange={this.onChangeRejectedReason.bind(this,index)} value={businessfile.rejectedreason} ></textarea>
    <i className="text-danger">{businessfile.alertmessage}</i>
    </div>
    <div className="modal-footer">
    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
    <button type="button" className="btn btn-primary" onClick={this.rejectedFile.bind(this,index)}>Yes, reject</button>
    </div>
    </div>
    </div>
    </div>

    </li>

    )


  }.bind(this))}
  </ul>
</div>
  )
}
});




