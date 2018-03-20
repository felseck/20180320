import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Ajax from '../mixins/mixin.ajax'
//import Files from './page.files'
import Link from '../navs/nav.link'
import Select from 'react-select'
export default React.createClass({
	mixins:[Ajax],
	getInitialState(){
		return {
			render:true,
		//	user:{},
			conflictform:{},
			sending:false,
     // businesstypes:[]
		}
	},

	componentDidMount(){
		//this.getUser();

    this.state.conflictform = {};

    if(global.buyerconflictformid){
      this.getBuyerConflictForm();
    }
   // this.getBusinessTypes();

 
	},

  componentWillReceiveProps(){
    //this.getUser();

    this.state.conflictform = {};
    this.state.sending = false;

    if(global.buyerconflictformid){
      this.getBuyerConflictForm();
    }
   // this.getBusinessTypes();

 
  },

	changeInput:function(name,this_){
        this.state.conflictform[name] = this_.target.value;
        this.forceUpdate();
	},

	changeRadio:function(name,this_){
		this.state.conflictform[name] = this_.target.value;
		this.forceUpdate();
	},

	render() {


	return (
		<div>
		<div className="card pb-5 text-white"  style={{background:"#757575"}}>
	  <div className="modal-header">
        <h1 className="text-center">New vendor Questionnaire</h1>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <div className="card-block">
     
        <div className="row p-3">
        <div className="col-md-8 col-lg-8">
			<label><b>Vendor Name:</b></label>
			<input type='text' className="form-control" value={this.state.conflictform.vendorname} onChange={this.changeInput.bind(this,'vendorname')} />
		</div>	

         <div className="col-md-4 col-lg-4">
			<label><b>Vendor FEIN :</b></label>
			<input type='text' className="form-control" value={this.state.conflictform.vendorfein} onChange={this.changeInput.bind(this,'vendorfein')} />
			</div>

			 <div className="col-md-12 col-lg-12">
            <label><b>Vendor Primary Contact:</b></label>
			<input type='text' className="form-control" value={this.state.conflictform.vendorprimarycontact} onChange={this.changeInput.bind(this,'vendorprimarycontact')} />
			</div>

			<div className="col-md-6 col-lg-6">
			<label><b>Vendor Phone:</b></label>
			<input type='text' className="form-control" value={this.state.conflictform.vendorphone} onChange={this.changeInput.bind(this,'vendorphone')} />
			</div>

            <div className="col-md-6 col-lg-6">
            <label><b>Fax Numbers :</b></label>
			<input type='text' className="form-control" value={this.state.conflictform.vendorfax} onChange={this.changeInput.bind(this,'vendorfax')} />
			</div>

			 <div className="col-md-12 col-lg-12">
            <label><b>Vendor Address:</b></label>
			<input type='text' className="form-control" value={this.state.conflictform.vendoraddress} onChange={this.changeInput.bind(this,'vendoraddress')} />
			</div>
			</div>
</div>
			</div>

			<table className="table table-striped">
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th className="text-center">YES</th>
      <th className="text-center">NO</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1.</th>
      <td>
      Have you obtained quotes/bids from at least 2 other different vendors?
      </td>
      <td className="text-center"><input type="radio" className="form-control" name='q1check' onChange={this.changeRadio.bind(this,'q1check')} value={-1} checked={this.state.conflictform.q1check==-1?true:false} /></td>
      <td className="text-center"><input type="radio" className="form-control" name='q1check' onChange={this.changeRadio.bind(this,'q1check')} value={0} checked={this.state.conflictform.q1check==0?true:false} /></td>
    </tr>
    <tr>
      <th scope="row">2.</th>
      <td>
       What product/service will this vendor provide Northgate Market?
      <textarea  className="form-control" value={this.state.conflictform.q2} onChange={this.changeInput.bind(this,'q2')} ></textarea>
			
			</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">3.</th>
        <td>
      If the pricing associated with this vendor is higher than other bids, what are the reasons for choosing this vendor (please explain below)
      <textarea  className="form-control" value={this.state.conflictform.q3} onChange={this.changeInput.bind(this,'q3')} ></textarea>
			
      </td>
      <td className="text-center"><input type="radio" className="form-control" name='q3check' onChange={this.changeRadio.bind(this,'q3check')} value={-1} checked={this.state.conflictform.q3check==-1?true:false} /></td>
      <td className="text-center"><input type="radio" className="form-control" name='q3check' onChange={this.changeRadio.bind(this,'q3check')} value={0} checked={this.state.conflictform.q3check==0?true:false} /></td>
   
    </tr>

    <tr>
      <th scope="row">4.</th>
        <td>
     Are the services or products covered by another contract or agreements?
      </td>
      <td className="text-center"><input type="radio" className="form-control" name='q4check' onChange={this.changeRadio.bind(this,'q4check')} value={-1} checked={this.state.conflictform.q4check==-1?true:false} /></td>
      <td className="text-center"><input type="radio" className="form-control" name='q4check' onChange={this.changeRadio.bind(this,'q4check')} value={0} checked={this.state.conflictform.q4check==0?true:false} /></td>
   
    </tr>

    <tr>
      <th scope="row">5.</th>
        <td>
    Will this vendor deliver product directly to Northgate store locations?
      </td>
      <td className="text-center"><input type="radio" className="form-control" name='q5check' onChange={this.changeRadio.bind(this,'q5check')} value={-1} checked={this.state.conflictform.q5check==-1?true:false} /></td>
      <td className="text-center"><input type="radio" className="form-control" name='q5check' onChange={this.changeRadio.bind(this,'q5check')} value={0} checked={this.state.conflictform.q5check==0?true:false} /></td>
   
    </tr>

     <tr>
      <th scope="row">6.</th>
        <td>
    Will this vendor deliver product directly to Northgate Distribution Center?
      </td>
      <td className="text-center"><input type="radio" className="form-control" name='q6check' onChange={this.changeRadio.bind(this,'q6check')} value={-1} checked={this.state.conflictform.q6check==-1?true:false} /></td>
      <td className="text-center"><input type="radio" className="form-control" name='q6check' onChange={this.changeRadio.bind(this,'q6check')} value={0} checked={this.state.conflictform.q6check==0?true:false} /></td>
   
    </tr>

     <tr>
      <th scope="row">7.</th>
        <td>
    Does this vendor resale product that will be sold to Northgate?
      </td>
      <td className="text-center"><input type="radio" className="form-control" name='q7check' onChange={this.changeRadio.bind(this,'q7check')} value={-1} checked={this.state.conflictform.q7check==-1?true:false} /></td>
      <td className="text-center"><input type="radio" className="form-control" name='q7check' onChange={this.changeRadio.bind(this,'q7check')} value={0} checked={this.state.conflictform.q7check==0?true:false} /></td>
   
    </tr>

     <tr>
      <th scope="row">8.</th>
        <td>
    Do you understand that you must notify the Northgate Ethics Committee at ethics@northgatemarkets.com in writing, immediately, when you or an employee in your charge gains a personal interest in the company or in products re-sold or manufactured by this company?
      </td>
      <td className="text-center"><input type="radio" className="form-control" name='q8check' onChange={this.changeRadio.bind(this,'q8check')} value={-1} checked={this.state.conflictform.q8check==-1?true:false} /></td>
      <td className="text-center"><input type="radio" className="form-control" name='q8check' onChange={this.changeRadio.bind(this,'q8check')} value={0} checked={this.state.conflictform.q8check==0?true:false} /></td>
   
    </tr>


     <tr>
      <th scope="row">9.</th>
        <td>
    Do you understand that you must notify the Northgate Ethics Committee at ethics@northgatemarkets.com in writing, immediately, when you or an employee in your charge obtains a gift or gratuity from this vendor, even if you intend not to keep the gift or intend to give it to someone else? 
      </td>
      <td className="text-center"><input type="radio" className="form-control" name='q9check' onChange={this.changeRadio.bind(this,'q9check')} value={-1} checked={this.state.conflictform.q9check==-1?true:false} /></td>
      <td className="text-center"><input type="radio" className="form-control" name='q9check' onChange={this.changeRadio.bind(this,'q9check')} value={0} checked={this.state.conflictform.q9check==0?true:false} /></td>
   
    </tr>

     <tr>
      <th scope="row">10.</th>
        <td>
    Do you have any conflict of interest?
      </td>
      <td className="text-center"><input type="radio" className="form-control" name='q10check' onChange={this.changeRadio.bind(this,'q10check')} value={-1} checked={this.state.conflictform.q10check==-1?true:false} /></td>
      <td className="text-center"><input type="radio" className="form-control" name='q10check' onChange={this.changeRadio.bind(this,'q10check')} value={0} checked={this.state.conflictform.q10check==0?true:false} /></td>
   
    </tr>

     <tr>
      <th scope="row"></th>
        <td>
    a.	Are you or any family member or relative an investor/Shareholder/Partner of this vendor?
      </td>
      <td className="text-center"><input type="radio" className="form-control" name='q10acheck' onChange={this.changeRadio.bind(this,'q10acheck')} value={-1} checked={this.state.conflictform.q10acheck==-1?true:false} /></td>
      <td className="text-center"><input type="radio" className="form-control" name='q10acheck' onChange={this.changeRadio.bind(this,'q10acheck')} value={0} checked={this.state.conflictform.q10acheck==0?true:false} /></td>
   
    </tr>

     <tr>
      <th scope="row"></th>
        <td>
    b.	Do you have any family members, relatives, friends working for the vendor?
      </td>
      <td className="text-center"><input type="radio" className="form-control" name='q10bcheck' onChange={this.changeRadio.bind(this,'q10bcheck')} value={-1} checked={this.state.conflictform.q10bcheck==-1?true:false} /></td>
      <td className="text-center"><input type="radio" className="form-control" name='q10bcheck' onChange={this.changeRadio.bind(this,'q10bcheck')} value={0} checked={this.state.conflictform.q10bcheck==0?true:false} /></td>
   
    </tr>

     <tr>
      <th scope="row"></th>
        <td>
  c.	Do you have any financial interest in this vendor?
      </td>
      <td className="text-center"><input type="radio" className="form-control" name='q10ccheck' onChange={this.changeRadio.bind(this,'q10ccheck')} value={-1} checked={this.state.conflictform.q10ccheck==-1?true:false} /></td>
      <td className="text-center"><input type="radio" className="form-control" name='q10ccheck' onChange={this.changeRadio.bind(this,'q10ccheck')} value={0} checked={this.state.conflictform.q10ccheck==0?true:false} /></td>
   
    </tr>

     <tr>
      <th scope="row"></th>
        <td>
    d.	Will/Do/Did you receive any gifts or perks from this vendor?
      </td>
      <td className="text-center"><input type="radio" className="form-control" name='q10dcheck' onChange={this.changeRadio.bind(this,'q10dcheck')} value={-1} checked={this.state.conflictform.q10dcheck==-1?true:false} /></td>
      <td className="text-center"><input type="radio" className="form-control" name='q10dcheck' onChange={this.changeRadio.bind(this,'q10dcheck')} value={0} checked={this.state.conflictform.q10dcheck==0?true:false} /></td>
   
    </tr>

    <tr>
      <th scope="row">11.</th>
        <td>
	Is there a/an contract/agreement with this vendor?
      </td>
      <td className="text-center"><input type="radio" className="form-control" name='q11check' onChange={this.changeRadio.bind(this,'q11check')} value={-1} checked={this.state.conflictform.q11check==-1?true:false} /></td>
      <td className="text-center"><input type="radio" className="form-control" name='q11check' onChange={this.changeRadio.bind(this,'q11check')} value={0} checked={this.state.conflictform.q11check==0?true:false} /></td>
   
    </tr>

     <tr>
      <th scope="row"></th>
        <td>
   a.	If so, has the contract/agreement gone through legal review?
      </td>
      <td className="text-center"><input type="radio" className="form-control" name='q11acheck' onChange={this.changeRadio.bind(this,'q11acheck')} value={-1} checked={this.state.conflictform.q11acheck==-1?true:false} /></td>
      <td className="text-center"><input type="radio" className="form-control" name='q11acheck' onChange={this.changeRadio.bind(this,'q11acheck')} value={0} checked={this.state.conflictform.q11acheck==0?true:false} /></td>
   
    </tr>

    <tr>
      <th scope="row">12.</th>
        <td>
  	Is there a minimum or maximum purchase level from this vendor?
      </td>
      <td className="text-center"><input type="radio" className="form-control" name='q12check' onChange={this.changeRadio.bind(this,'q12check')} value={-1} checked={this.state.conflictform.q12check==-1?true:false} /></td>
      <td className="text-center"><input type="radio" className="form-control" name='q12check' onChange={this.changeRadio.bind(this,'q12check')} value={0} checked={this.state.conflictform.q12check==0?true:false} /></td>
   
    </tr>

    <tr>
      <th scope="row"></th>
        <td>
   a.	If so, what is the level? 
   <label className="sr-only" for="inlineFormInputGroup">level</label>
  <div className="input-group mb-2 mr-sm-2 mb-sm-0">
    <div className="input-group-addon">$</div>
    <input type="text" className="form-control" value={this.state.conflictform.q12a} onChange={this.changeInput.bind(this,'q12a')} id="inlineFormInputGroup" placeholder="level"/>
  </div>   
      </td>
      <td className="text-center"></td>
      <td className="text-center"></td>
   
    </tr>

     <tr>
      <th scope="row">13.</th>
        <td>
   	Expected annual purchases from vendor 
   	<label className="sr-only" for="inlineFormInputGroup2">level</label>
  <div className="input-group mb-2 mr-sm-2 mb-sm-0">
    <div className="input-group-addon">$</div>
    <input type="text" className="form-control" value={this.state.conflictform.q13} onChange={this.changeInput.bind(this,'q13')} id="inlineFormInputGroup2" placeholder=""/>
  </div> 
      </td>
      <td className="text-center"><input type="radio" className="form-control" name='q13check' onChange={this.changeRadio.bind(this,'q13check')} value={-1} checked={this.state.conflictform.q13check==-1?true:false} /></td>
      <td className="text-center"><input type="radio" className="form-control" name='q13check' onChange={this.changeRadio.bind(this,'q13check')} value={0} checked={this.state.conflictform.q13check==0?true:false} /></td>
   
    </tr>



  </tbody>
</table>


<div className="card text-white" style={{background:"#757575"}}>
	
        <div className="card-block p-3">
        <h5>I declare that I have answered the above questions truthfully and to the best of my ability. </h5>
       
        <div className="row">
        <div className="col-md-8 col-lg-8 pt-3">
			<label>Northgate Primary Buyer</label>
			<input type='text' className="form-control" value={this.state.conflictform.northgateprimarybuyer} onChange={this.changeInput.bind(this,'northgateprimarybuyer')} />
		</div>

		<div className="col-md-4 col-lg-4 pt-3">
			<label>Date</label>
			<input type='date' className="form-control date_" value={this.state.conflictform.northgateprimarybuyerdate} onChange={this.changeInput.bind(this,'northgateprimarybuyerdate')} id="northgateprimarybuyerdate"/>
		</div>

		<div className="col-md-8 col-lg-8 pt-3">
			<label>Northgate Department Manager Name & Signature</label>
			<input type='text' className="form-control" value={this.state.conflictform.northgatedepartmentmanagername} onChange={this.changeInput.bind(this,'northgatedepartmentmanagername')} />
		</div>

		<div className="col-md-4 col-lg-4 pt-3">
			<label>Date</label>
			<input type='date' className="form-control date_" value={this.state.conflictform.northgatedepartmentmanagernamedate} onChange={this.changeInput.bind(this,'northgatedepartmentmanagernamedate')} id="northgatedepartmentmanagernamedate"/>
		</div>

		<div className="col-md-8 col-lg-8 pt-3">
			<label>Northgate Director of Food Safety & Quality Assurance*</label>
			<input type='text' className="form-control" value={this.state.conflictform.northgatedirector} onChange={this.changeInput.bind(this,'northgatedirector')} />
		</div>

		<div className="col-md-4 col-lg-4 pt-3">
			<label>Date</label>
			<input type='date' className="form-control date_" value={this.state.conflictform.northgatedirectordate} onChange={this.changeInput.bind(this,'northgatedirectordate')} id="northgatedirectordate" />
		</div>


		<div className="col-md-8 col-lg-8 pt-3">
			<label>Northgate Department VP/VP of Operations Name & Signature</label>
			<input type='text' className="form-control" value={this.state.conflictform.northgatedepartmentvp} onChange={this.changeInput.bind(this,'northgatedepartmentvp')} />
		</div>

		<div className="col-md-4 col-lg-4 pt-3">
			<label>Date</label>
			<input type='date' className="form-control date_" value={this.state.conflictform.northgatedepartmentvpdate} onChange={this.changeInput.bind(this,'northgatedepartmentvpdate')} id="northgatedepartmentvpdate" />
		</div>

		<div className="col-md-8 col-lg-8 pt-3">
			<label>Northgate Accounts Payable Supervisor Name & Signature</label>
			<input type='text' className="form-control" value={this.state.conflictform.northgateaccounts} onChange={this.changeInput.bind(this,'northgateaccounts')} />
		</div>

		<div className="col-md-4 col-lg-4 pt-3">
			<label>Date</label>
			<input type='date' className="form-control date_" value={this.state.conflictform.northgateaccountsdate} onChange={this.changeInput.bind(this,'northgateaccountsdate')} id="northgateaccountsdate"/>
		</div>

		<div className="col-md-8 col-lg-8 pt-3">
			<label>Northgate  Controller/VP Finance*/CFO* Name & Signature<br/>
<small>* Required for perishable vendors (Meat, Kitchen, Produce))</small>
</label>
			<input type='text' className="form-control" value={this.state.conflictform.northgateacontroller} onChange={this.changeInput.bind(this,'northgateacontroller')} />
		</div>

		<div className="col-md-4 col-lg-4 pt-4">
			<label>Date</label>
			<input type='date' className="form-control date_" value={this.state.conflictform.northgateacontrollerdate} onChange={this.changeInput.bind(this,'northgateacontrollerdate')} id="northgateacontrollerdate" />
		</div>


        </div>

        </div>

</div>


 <div className="modal-footer">
 {this.state.sending?'Saving...':<button type="button" onClick={this.saveBuyerConflictForm} className="btn btn-danger">Save</button>}
      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>


	
		</div>
		);
	}
})
