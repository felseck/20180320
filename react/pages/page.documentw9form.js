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
      controller:'documentsw9forms',
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

    if(global.documentw9formid){
      this.state.object.id = global.documentw9formid;
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

    if(name == 'taxclassificationid'){
        this.state.object.semitaxclassification = '-';
    }

    this.changeInput(name,this_);
  },

  render() {


    var taxclassifications = [
        {id:0,name:'ndividual/sole proprietor or single-member LLC'},
        {id:1,name:'C Corporation'},
        {id:2,name:'S Corporation'},
        {id:3,name:'Partnership'},
        {id:4,name:'Trust/estate'},
        {id:5,name:'Limited liability company'},
        {id:6,name:'Other '},
    ];

   

   return (
    <div style={{fontSize:'14px'}}>
    <div className="card text-white"  style={{background:"#757575"}}>
    <div className="modal-header text-center bg-secondary">
    <h1>W-9 Taxpayer Identification Form</h1>
    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div className="card-block">

    <div className="row p-3">
    <div className="col-md-12 col-lg-12">
    <label>1 <b>Name (as shown on your income tax return). Name is required on this line; do not leave this line blank.</b></label>
    <input type='text' className="form-control" value={this.state.object.name} onChange={this.changeInput.bind(this,'name')} />
    </div>	

    <div className="col-md-12 col-lg-12"><hr/>
    <label>2 <b>Business name/disregarded entity name, if different from above.</b></label>
    <input type='text' className="form-control" value={this.state.object.businessname} onChange={this.changeInput.bind(this,'businessname')} />
    </div>  

    <div className="col-md-12 col-lg-12"><hr/>
    <label>3 <b>Check appropriate box for federal tax classification; check only one of the following seven boxes</b></label><br/>
   
    {taxclassifications.map(function(taxclassification,index){
    return(

    <label key={index} className="custom-control custom-radio">
  <input name="taxclassificationid" type="radio" className="custom-control-input" onChange={this.changeRadio.bind(this,'taxclassificationid')} value={taxclassification.id} checked={this.state.object.taxclassificationid==taxclassification.id?true:false} />
  <span className="custom-control-indicator"></span>
  <span className="custom-control-description">{taxclassification.name}</span>
</label>

    )
    }.bind(this))}
    </div>

    <div className="col-md-9 col-lg-9 taxclassificationid5" style={{textAlign:'right',display:this.state.object.taxclassificationid == 5?'block':'none'}}><hr/>
    <label><b>Enter the tax classification (C=C corporation, S=S corporation,P=partnership).</b></label>
   </div>

    <div className="col-md-3 col-lg-3 taxclassificationid5"  style={{display:this.state.object.taxclassificationid == 5?'block':'none'}}><hr/>
    <input type='text' className="form-control" value={this.state.object.semitaxclassification} onChange={this.changeInput.bind(this,'semitaxclassification')} />
    </div>

    <div className="col-md-12 col-lg-12"><hr/>
    <label>4. <b>  Exemptions (codes apply only to certain entities, not individuals; see instructions on page 3):</b></label>
   </div>

   <div className="col-md-6 col-lg-6">
    <label><b>Exempt payee code (if any)</b></label>
    <input type='text' className="form-control" value={this.state.object.payeecode} onChange={this.changeInput.bind(this,'payeecode')} />
   </div>
   <div className="col-md-6 col-lg-6">
    <label><b>Exemption from FATCA reporting code (if any)</b></label>
    <input type='text' className="form-control" value={this.state.object.reportingcode} onChange={this.changeInput.bind(this,'reportingcode')} />
   </div>

    <div className="col-md-12 col-lg-12"><hr/>
    <label>5. <b>Address (number, street, and apt. or suite no.)</b></label>
    <input type='text' className="form-control" value={this.state.object.address} onChange={this.changeInput.bind(this,'address')} />
    </div>

    <div className="col-md-12 col-lg-12"><hr/>
    <label>6. <b>City, state, and ZIP code</b></label>
    <input type='text' className="form-control" value={this.state.object.restaddress} onChange={this.changeInput.bind(this,'restaddress')} />
    </div>

    <div className="col-md-12 col-lg-12"><hr/>
    <label>7. <b>List account number(s) here <small>(optional)</small></b></label>
    <input type='text' className="form-control" value={this.state.object.listaccountnums} onChange={this.changeInput.bind(this,'listaccountnums')} />
    </div>

    <div className="col-md-12 col-lg-12"><hr/>
    <label><b>Requester’s name and address <small>(optional)</small></b></label>
    <input type='text' className="form-control" value={this.state.object.requesternames} onChange={this.changeInput.bind(this,'requesternames')} />
    </div>

    <div className="col-md-12 col-lg-12"><hr/>
    <h5><b>Taxpayer Identification Number (TIN)</b></h5>
    <p>
    Enter your TIN in the appropriate box. The TIN provided must match the name given on line 1 to avoid 
backup withholding. For individuals, this is generally your social security number (SSN). However, for a 
resident alien, sole proprietor, or disregarded entity, see the Part I instructions on page 3. For other 
entities, it is your employer identification number (EIN). If you do not have a number, see 
How to get a TIN on page 3.
<b>Note. </b>
If the account is in more than one name, see the instructions for line 1 and the chart on page 4 for 
guidelines on whose number to enter.
</p>
    </div>

    <div className="col-md-6 col-lg-6">
    <label><b>Social security number</b></label>
    <input type='text' className="form-control" placeholder="000-00-0000" value={this.state.object.ssn} onChange={this.changeInput.bind(this,'ssn')} />
   </div>
   <div className="col-md-6 col-lg-6">
    <label>OR <b>Employer identification number</b></label>
    <input type='text' className="form-control" placeholder="00-0000000" value={this.state.object.ein} onChange={this.changeInput.bind(this,'ein')} />
   </div>

    
    </div>
    </div>
    </div>



    

<div className="modal-footer">
{this.state.sending?'Saving...':<button type="button" onClick={global.documentw9formid?this.put.bind(this,{callback:this.props.closeModal,sending:true}):this.post.bind(this,{userid:global.userid,sending:true,method:'beforecreate',callback:this.props.closeModal})} className="btn btn-danger">Save</button>}
<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
</div>



</div>
);
}
})


