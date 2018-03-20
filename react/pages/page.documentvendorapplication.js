import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Ajax from '../mixins/mixin.ajax_1_1'
//import Files from './page.files'
import Link from '../navs/nav.link'
import Select from 'react-select'
export default React.createClass({
	mixins:[Ajax],
	getInitialState(){
		return {
			render:true,
      controller:'documentsvendorsapplications',
      //row:{}, remove row
      object:{},
      sending:false,
      objects:[],
      rowselected:false
    }
  },

  componentDidMount(){
    this.getObject();
  },

  getObject:function(){
    this.state.object = {};
    this.state.sending = false;

    if(global.documentvendorapplicationid){
      this.state.object.id = global.documentvendorapplicationid;
      this.get();
    }

  },

  componentWillReceiveProps(){
    this.getObject();
  },

  changeInput:function(name,this_){

    this.state.object[name] = this_.target.value;
    this.forceUpdate();
  },

  changeRadio:function(name,this_){

    this.changeInput(name,this_);
  },

  render() {


    var buyersgroups = [
    {id:0,name:'DSD'},
    {id:1,name:'WHS'},
    {id:2,name:'EXP'}
    ];

    var legalsstructures = [
        {id:0,name:'Solepropriotorship '},
        {id:1,name:'Partnership '},
        {id:2,name:'Corporation '},
        {id:3,name:'Other'},
    ];

    var premises = [
    {id:0,name:'Owned'},
    {id:1,name:'Leased'},
    ];

    var ownerscompaniestypes = [
    {id:0,name:'Domestic Entity '},
    {id:1,name:'Foreign/Foreign affiliate'},
    ];


   return (
    <div style={{fontSize:'14px'}}>
    <div className="card text-white"  style={{background:"#757575"}}>
    <div className="modal-header text-center bg-secondary">
    <h1>Vendor Application</h1>
    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div className="card-block">

    <div className="row p-3">
    <div className="col-md-4 col-lg-4">
    <label><b>Vendor No:</b></label>
    <input type='text' className="form-control" value={this.state.object.vendorno} onChange={this.changeInput.bind(this,'vendorno')} />
    </div>	

    <div className="col-md-8 col-lg-8">
    <label><b>Buyer Group:</b></label>
    <input type='text' className="form-control" value={this.state.object.buyergroup} onChange={this.changeInput.bind(this,'buyergroup')} />
    
    {buyersgroups.map(function(buyergroup,index){
    return(

    <label key={index} className="custom-control custom-radio">
  <input name="buyergroupid" type="radio" className="custom-control-input" onChange={this.changeRadio.bind(this,'buyergroupid')} value={buyergroup.id} checked={this.state.object.buyergroupid==buyergroup.id?true:false} />
  <span className="custom-control-indicator"></span>
  <span className="custom-control-description">{buyergroup.name}</span>
</label>

    )
    }.bind(this))}
    </div>

    

    
    </div>
    </div>
    </div>


    <div className="card m-1 text-white"  style={{background:"#757575"}}>
    <div className="card-header text-center bg-secondary">
    <h5 className="text-center">General Company Information</h5>
    </div>
    <div className="card-block">

    <div className="row p-3">

    <div className="col-md-5 col-lg-5">
    <label><b>Company Name:</b></label>
    <input type='text' className="form-control" value={this.state.object.companyname} onChange={this.changeInput.bind(this,'companyname')} />
    </div>

    <div className="col-md-3 col-lg-3">
    <label><b>DBA Name:</b></label>
    <input type='text' className="form-control" value={this.state.object.dbaname} onChange={this.changeInput.bind(this,'dbaname')} />
    </div>  

     <div className="col-md-4 col-lg-4">
    <label><b>Contact person <small style={{fontSize:'11px'}}>(No sales
persons)</small>:</b></label>
    <input type='text' className="form-control" value={this.state.object.contactperson} onChange={this.changeInput.bind(this,'contactperson')} />
    </div>

     <div className="col-md-9 col-lg-9">
    <label><b>Physical address of Corporate Headquarter ( <small>(No PO Boxes)</small>:</b></label>
    <input type='text' className="form-control" value={this.state.object.hqphysicaladdress} onChange={this.changeInput.bind(this,'hqphysicaladdress')} />
    </div> 

     <div className="col-md-3 col-lg-3">
    <label><b>Name of NGM buyer:</b></label>
    <input type='text' className="form-control" value={this.state.object.ngmbuyer} onChange={this.changeInput.bind(this,'ngmbuyer')} />
    </div> 

    <div className="col-md-8 col-lg-8">
    <label><b>Physical Address of Primary Manufacturing or Shipping Facility ( <small>(No PO Boxes)</small>:</b></label>
    <input type='text' className="form-control" value={this.state.object.pmphysicaladdress} onChange={this.changeInput.bind(this,'pmphysicaladdress')} />
    </div> 

    <div className="col-md-4 col-lg-4">
    <label><b>Has your firm ever done business under any other name:</b></label>

    <YesOrNo name="hasyourfirmever" value={this.state.object.hasyourfirmever} changeRadio={this.changeRadio} />
    <label><b>under what name(s):</b></label>
    <input type='text' className="form-control" value={this.state.object.underwhatname} onChange={this.changeInput.bind(this,'underwhatname')} />
    </div> 

    <div className="col-md-3 col-lg-3">
    <label><b>Main Phone #:</b></label>
    <input type='text' className="form-control" value={this.state.object.mainphone} onChange={this.changeInput.bind(this,'mainphone')} />
    </div> 

    <div className="col-md-3 col-lg-3">
    <label><b>Main Fax #:</b></label>
    <input type='text' className="form-control" value={this.state.object.mainfax} onChange={this.changeInput.bind(this,'mainfax')} />
    </div> 

    <div className="col-md-3 col-lg-3">
    <label><b>Email:</b></label>
    <input type='text' className="form-control" value={this.state.object.email} onChange={this.changeInput.bind(this,'email')} />
    </div> 

    <div className="col-md-3 col-lg-3">
    <label><b>Website:</b></label>
    <input type='text' className="form-control" value={this.state.object.website} onChange={this.changeInput.bind(this,'website')} />
    </div> 


    <div className="col-md-3 col-lg-3">
    <label><b>CFO name: </b></label>
    <input type='text' className="form-control" value={this.state.object.cfoname} onChange={this.changeInput.bind(this,'cfoname')} />
    </div> 

    <div className="col-md-3 col-lg-3">
    <label><b>Phone #: </b></label>
    <input type='text' className="form-control" value={this.state.object.phone} onChange={this.changeInput.bind(this,'phone')} />
    </div> 

    <div className="col-md-3 col-lg-3">
    <label><b>Fax #: </b></label>
    <input type='text' className="form-control" value={this.state.object.fax} onChange={this.changeInput.bind(this,'fax')} />
    </div> 

    <div className="col-md-3 col-lg-3">
    <label><b>Email:</b></label>
    <input type='text' className="form-control" value={this.state.object.email2} onChange={this.changeInput.bind(this,'email2')} />
    </div> 



    <div className="col-md-9 col-lg-9">
    <label><b>Legal Structure:</b></label><br/>
    
    {legalsstructures.map(function(legalstructure,index){
    return(

    <label key={index} className="custom-control custom-radio">
        <input name="legalstructureid" type="radio" className="custom-control-input" onChange={this.changeRadio.bind(this,'legalstructureid')} value={legalstructure.id} checked={this.state.object.legalstructureid==legalstructure.id?true:false} />
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">{legalstructure.name}</span>
    </label>

    )
    }.bind(this))}

    </div> 


    <div className="col-md-4 col-lg-4">
    <label><b>Premises:</b></label><br/>
    {premises.map(function(premise,index){
    return(

    <label key={index} className="custom-control custom-radio">
        <input name="premiseid" type="radio" className="custom-control-input" onChange={this.changeRadio.bind(this,'premiseid')} value={premise.id} checked={this.state.object.premiseid==premise.id?true:false} />
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">{premise.name}</span>
    </label>

    )
    }.bind(this))}
    </div> 

     <div className="col-md-4 col-lg-4">
    <label><b>Fed. Tax I.D. #: </b></label>
    <input type='text' className="form-control" value={this.state.object.fedtaxid} onChange={this.changeInput.bind(this,'fedtaxid')} />
    </div> 

     <div className="col-md-4 col-lg-4">
    <label><b>D&B #:</b></label>
    <input type='text' className="form-control" value={this.state.object.dandbnum} onChange={this.changeInput.bind(this,'dandbnum')} />
    </div>  


     <div className="col-md-3 col-lg-3">
    <label><b style={{fontSize:'14px'}}>Line of Business /Product/Department:</b></label>
    <input type='text' className="form-control" value={this.state.object.lineofbusiness} onChange={this.changeInput.bind(this,'lineofbusiness')} />
    </div> 

     <div className="col-md-3 col-lg-3">
    <label><b>Certificate of Liability Ins. #: </b></label>
    <input type='text' className="form-control" value={this.state.object.certificateliability} onChange={this.changeInput.bind(this,'certificateliability')} />
    </div> 

     <div className="col-md-3 col-lg-3">
    <label><b>Contact name to verify Certificate:</b></label>
    <input type='text' className="form-control" value={this.state.object.certificatecontactname} onChange={this.changeInput.bind(this,'certificatecontactname')} />
    </div> 

     <div className="col-md-3 col-lg-3">
    <label><b>Contact phone # for Cert.:</b></label>
    <input type='text' className="form-control" value={this.state.object.certificatecontactphone} onChange={this.changeInput.bind(this,'certificatecontactphone')} />
    </div> 

     <div className="col-md-6 col-lg-6">
    <label><b>Address to send Purchase Order (PO): </b></label>
    <input type='text' className="form-control" value={this.state.object.purchaseaddress} onChange={this.changeInput.bind(this,'purchaseaddress')} />
    </div> 

     <div className="col-md-3 col-lg-3">
    <label><b>Email to send Purchase Order (PO): </b></label>
    <input type='text' className="form-control" value={this.state.object.purchaseemail} onChange={this.changeInput.bind(this,'purchaseemail')} />
    </div> 

     <div className="col-md-3 col-lg-3">
    <label><b>Fax # to send Purchase Order (PO):</b></label>
    <input type='text' className="form-control" value={this.state.object.purchasefax} onChange={this.changeInput.bind(this,'purchasefax')} />
    </div> 

    <div className="col-md-3 col-lg-3">
    <label><b>Payment Terms Requested:</b></label>
    <input type='text' className="form-control" value={this.state.object.paymentterms} onChange={this.changeInput.bind(this,'paymentterms')} />
    </div> 

    <div className="col-md-2 col-lg-2">
    <label><b>Warehouse Delivery:</b></label>
    <YesOrNo name="warehousedelivery" value={this.state.object.warehousedelivery} changeRadio={this.changeRadio} />
   </div> 

   <div className="col-md-2 col-lg-2">
    <label><b>Store Delivery:</b></label>
    <YesOrNo name="storedelivery" value={this.state.object.storedelivery} changeRadio={this.changeRadio} />
   </div> 

   <div className="col-md-5 col-lg-5">
    <label><b>Are you registered with the Department of Conservation? <small>(CRV Recycling)</small></b></label>
    <YesOrNo name="registeredconservation" value={this.state.object.registeredconservation} changeRadio={this.changeRadio} />
   </div> 

   <div className="col-md-6 col-lg-6">
    <label><b>Payment Remit address: </b></label>
    <input type='text' className="form-control" value={this.state.object.paymentaddress} onChange={this.changeInput.bind(this,'paymentaddress')} />
    </div> 

    <div className="col-md-3 col-lg-3">
    <label><b>Beverage Manufacture ID#:</b></label>
    <input type='text' className="form-control" value={this.state.object.beveragemanufacture} onChange={this.changeInput.bind(this,'beveragemanufacture')} />
    </div> 

    <div className="col-md-3 col-lg-3">
    <label><b>Beverage Distributor ID#:</b></label>
    <input type='text' className="form-control" value={this.state.object.beveragedistributor} onChange={this.changeInput.bind(this,'beveragedistributor')} />
    </div> 

    </div>  
    </div>  
    </div>  



     <div className="card m-1 text-white"  style={{background:"#757575"}}>
    <div className="card-header text-center bg-secondary">
    <h5 className="text-center">Ownership Information</h5>
    </div>
    <div className="card-block">

    <div className="row p-3">

    <div className="col-md-4 col-lg-4">
    <label><b>Principal/Owner Name: </b></label>
    <input type='text' className="form-control" value={this.state.object.principalownername} onChange={this.changeInput.bind(this,'principalownername')} />
    </div>

    <div className="col-md-4 col-lg-4">
    <label><b>Phone #:</b></label>
    <input type='text' className="form-control" value={this.state.object.principalownerphone} onChange={this.changeInput.bind(this,'principalownerphone')} />
    </div>

    <div className="col-md-4 col-lg-4">
    <label><b>E-mail:</b></label>
    <input type='text' className="form-control" value={this.state.object.owneremail} onChange={this.changeInput.bind(this,'owneremail')} />
    </div>

    <div className="col-md-12 col-lg-12">
    <label><b>Company is:</b></label>
    {ownerscompaniestypes.map(function(ownercompanytype,index){
    return(

    <label key={index} className="custom-control custom-radio">
        <input name="ownercompanytypeid" type="radio" className="custom-control-input" onChange={this.changeRadio.bind(this,'ownercompanytypeid')} value={ownercompanytype.id} checked={this.state.object.ownercompanytypeid==ownercompanytype.id?true:false} />
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">{ownercompanytype.name}</span>
    </label>

    )
    }.bind(this))}

    <br/>

    Foreign/Foreign Affiliate - List ALL other 10% or more owners on a separate sheet and attach to Application (Name, Address, Phone #, % Owned) 

    </div>

    <div className="col-md-3 col-lg-3">
    <label><b>Owner name:</b></label>
    <input type='text' className="form-control" value={this.state.object.ownername} onChange={this.changeInput.bind(this,'ownername')} />
    </div>

    <div className="col-md-1 col-lg-1">
    <label><b>% owned:</b></label>
    <input type='text' className="form-control" value={this.state.object.ownerpercent} onChange={this.changeInput.bind(this,'ownerpercent')} />
    </div>

    <div className="col-md-6 col-lg-6">
    <label><b>Address:</b></label>
    <input type='text' className="form-control" value={this.state.object.owneraddress} onChange={this.changeInput.bind(this,'owneraddress')} />
    </div>

    <div className="col-md-2 col-lg-2">
    <label><b>Phone #:</b></label>
    <input type='text' className="form-control" value={this.state.object.ownerphone} onChange={this.changeInput.bind(this,'ownerphone')} />
    </div>

    </div>
    </div>
    </div>






     <div className="card m-1 text-white"  style={{background:"#757575"}}>
    <div className="card-header text-center bg-secondary">
    <h5 className="text-center">Bank Reference</h5>
    </div>
    <div className="card-block">

    <div className="row p-3">

    <div className="col-md-3 col-lg-3">
    <label><b>Bank Name:</b></label>
    <input type='text' className="form-control" value={this.state.object.bankname} onChange={this.changeInput.bind(this,'bankname')} />
    </div>

    <div className="col-md-3 col-lg-3">
    <label><b>Contact name</b></label>
    <input type='text' className="form-control" value={this.state.object.bankcontactname} onChange={this.changeInput.bind(this,'bankcontactname')} />
    </div>

    <div className="col-md-3 col-lg-3">
    <label><b>Phone #:</b></label>
    <input type='text' className="form-control" value={this.state.object.bankphone} onChange={this.changeInput.bind(this,'bankphone')} />
    </div>

    <div className="col-md-3 col-lg-3">
    <label><b>Fax #:</b></label>
    <input type='text' className="form-control" value={this.state.object.bankfax} onChange={this.changeInput.bind(this,'bankfax')} />
    </div>

    <div className="col-md-6 col-lg-6">
    <label><b>Address:</b></label>
    <input type='text' className="form-control" value={this.state.object.bankaddress} onChange={this.changeInput.bind(this,'bankaddress')} />
    </div>

    <div className="col-md-2 col-lg-2">
    <label><b>City:</b></label>
    <input type='text' className="form-control" value={this.state.object.bankcity} onChange={this.changeInput.bind(this,'bankcity')} />
    </div>

    <div className="col-md-2 col-lg-2">
    <label><b>State:</b></label>
    <input type='text' className="form-control" value={this.state.object.bankstate} onChange={this.changeInput.bind(this,'bankstate')} />
    </div>

    <div className="col-md-2 col-lg-2">
    <label><b>Zip:</b></label>
    <input type='text' className="form-control" value={this.state.object.bankzip} onChange={this.changeInput.bind(this,'bankzip')} />
    </div>

    </div>
    </div>
    </div>





     <div className="card m-1 text-white"  style={{background:"#757575"}}>
    <div className="card-header text-center bg-secondary">
    <h5 className="text-center">Trade Reference </h5>
    </div>
    <div className="card-block">

    <div className="row p-3">

    <div className="col-md-3 col-lg-3">
    <label><b>Company Name:</b></label>
    <input type='text' className="form-control" value={this.state.object.tradecompanyname} onChange={this.changeInput.bind(this,'tradecompanyname')} />
    </div>

    <div className="col-md-3 col-lg-3">
    <label><b>Contact name</b></label>
    <input type='text' className="form-control" value={this.state.object.tradecontactname} onChange={this.changeInput.bind(this,'tradecontactname')} />
    </div>


     <div className="col-md-3 col-lg-3">
    <label><b>Phone #:</b></label>
    <input type='text' className="form-control" value={this.state.object.tradephone} onChange={this.changeInput.bind(this,'tradephone')} />
    </div>


    <div className="col-md-3 col-lg-3">
    <label><b>Fax #:</b></label>
    <input type='text' className="form-control" value={this.state.object.tradefax} onChange={this.changeInput.bind(this,'tradefax')} />
    </div>

    <div className="col-md-4 col-lg-4">
    <label><b>Address:</b></label>
    <input type='text' className="form-control" value={this.state.object.tradeaddress} onChange={this.changeInput.bind(this,'tradeaddress')} />
    </div>

    <div className="col-md-2 col-lg-2">
    <label><b>City:</b></label>
    <input type='text' className="form-control" value={this.state.object.tradecity} onChange={this.changeInput.bind(this,'tradecity')} />
    </div>

     <div className="col-md-1 col-lg-2">
    <label><b>State:</b></label>
    <input type='text' className="form-control" value={this.state.object.tradestate} onChange={this.changeInput.bind(this,'tradestate')} />
    </div>

     <div className="col-md-1 col-lg-1">
    <label><b>Zip:</b></label>
    <input type='text' className="form-control" value={this.state.object.tradezip} onChange={this.changeInput.bind(this,'tradezip')} />
    </div>

     <div className="col-md-3 col-lg-3">
    <label><b>Items Purchased</b></label>
    <input type='text' className="form-control" value={this.state.object.tradeitemspurchased} onChange={this.changeInput.bind(this,'tradeitemspurchased')} />
    </div>


    <div className="col-md-3 col-lg-3"><hr/>
    <label><b>Company Name:</b></label>
    <input type='text' className="form-control" value={this.state.object.tradecompanyname2} onChange={this.changeInput.bind(this,'tradecompanyname2')} />
    </div>

    <div className="col-md-3 col-lg-3"><hr/>
    <label><b>Contact name</b></label>
    <input type='text' className="form-control" value={this.state.object.tradecontactname2} onChange={this.changeInput.bind(this,'tradecontactname2')} />
    </div>


     <div className="col-md-3 col-lg-3"><hr/>
    <label><b>Phone #:</b></label>
    <input type='text' className="form-control" value={this.state.object.tradephone2} onChange={this.changeInput.bind(this,'tradephone2')} />
    </div>


    <div className="col-md-3 col-lg-3"><hr/>
    <label><b>Fax #:</b></label>
    <input type='text' className="form-control" value={this.state.object.tradefax2} onChange={this.changeInput.bind(this,'tradefax2')} />
    </div>

    <div className="col-md-4 col-lg-4">
    <label><b>Address:</b></label>
    <input type='text' className="form-control" value={this.state.object.tradeaddress2} onChange={this.changeInput.bind(this,'tradeaddress2')} />
    </div>

    <div className="col-md-2 col-lg-2">
    <label><b>City:</b></label>
    <input type='text' className="form-control" value={this.state.object.tradecity2} onChange={this.changeInput.bind(this,'tradecity2')} />
    </div>

     <div className="col-md-1 col-lg-2">
    <label><b>State:</b></label>
    <input type='text' className="form-control" value={this.state.object.tradestate2} onChange={this.changeInput.bind(this,'tradestate2')} />
    </div>

     <div className="col-md-1 col-lg-1">
    <label><b>Zip:</b></label>
    <input type='text' className="form-control" value={this.state.object.tradezip2} onChange={this.changeInput.bind(this,'tradezip2')} />
    </div>

     <div className="col-md-3 col-lg-3">
    <label><b>Items Purchased</b></label>
    <input type='text' className="form-control" value={this.state.object.tradeitemspurchased2} onChange={this.changeInput.bind(this,'tradeitemspurchased2')} />
    </div>


    </div>
    </div>
    </div>






     <div className="card m-1 text-white"  style={{background:"#757575"}}>
    <div className="card-header text-center bg-secondary">
    <h5 className="text-center">Acceptance and Approval</h5>
    </div>
    <div className="card-block">

    <div className="row p-3">
     <div className="col-md-12 col-lg-12">
    By agreeing below, I authorize Northgate Gonzalez Markets(hereafter NGM) to obtain any information required concerning this statement and application hereon and affirm that the information is true and correct. I hereby authorize NGM or any credit bureau or other investigative agency employed by NGM to investigate the references herein listed or statements or other data obtained. 
    <hr/></div>

      <div className="col-md-5 col-lg-5">
    <label><b>Name of Authorized Representative:</b></label>
    <input type='text' className="form-control" value={this.state.object.acceptancename} onChange={this.changeInput.bind(this,'acceptancename')} />
    </div>

    <div className="col-md-5 col-lg-5">
    <label><b>Title:</b></label>
    <input type='text' className="form-control" value={this.state.object.acceptancetitle} onChange={this.changeInput.bind(this,'acceptancetitle')} />
    </div>

    <div className="col-md-2 col-lg-2">
    <label><b>Phone #:</b></label>
    <input type='text' className="form-control" value={this.state.object.acceptancephone} onChange={this.changeInput.bind(this,'acceptancephone')} />
    </div>

   

    </div>
    </div>
    </div>

    


<div className="modal-footer">
{this.state.sending?'Saving...':<button type="button" onClick={global.documentvendorapplicationid?this.put.bind(this,{callback:this.props.closeModal,sending:true}):this.post.bind(this,{userid:global.userid,sending:true,method:'beforecreate',callback:this.props.closeModal})} className="btn btn-danger">Save</button>}
<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
</div>



</div>
);
}
})




var YesOrNo = React.createClass({
    mixins:[Ajax],
    getInitialState(){
        return {
        value:this.props.value,
        name:this.props.name
    }
  },

  componentDidMount(){
    
  },

   componentWillReceiveProps(props_){
    this.state.value = props_.value;
    this.state.name = props_.name;
    this.forceUpdate();
  },

  changeRadio:function(name,this_){
    this.props.changeRadio(name,this_)
    this.state.value = this_.target.value;
    this.forceUpdate();
  },


  render(){
    return(
    <div>
  <label className="custom-control custom-radio">
  <input name={this.state.name} type="radio" className="custom-control-input" onChange={this.changeRadio.bind(this,this.state.name)} value={-1} checked={this.state.value==-1?true:false} />
  <span className="custom-control-indicator"></span>
  <span className="custom-control-description">Yes</span>
</label>

<label className="custom-control custom-radio">
  <input name={this.state.name} type="radio" className="custom-control-input" onChange={this.changeRadio.bind(this,this.state.name)} value={0} checked={this.state.value==0?true:false} />
  <span className="custom-control-indicator"></span>
  <span className="custom-control-description">No</span>
</label>
</div>
)
}

});