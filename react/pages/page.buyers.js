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
			buyers:[],
			render:true,
			buyer:{},
			businesstypes:[],
			users:[],
			selectedusers:[],
			buyerconflictforms:[]
		}
	},

	componentDidMount(){
		this.getBuyers();
		this.getBusinessTypes();
		this.getUsers();
		
	},

	onRowClick:function(row){
		global.buyerid = row.id;
		this.getBuyer(); 
		this.getBuyerConflictForms();
	},

	



	selectRowProp: {
		mode: 'radio',
		bgColor: '#F2FFA8', 
		hideSelectColumn: true,  
		clickToSelect: true 
	},

	onAddRow:function(row){
		delete row.id;
		this.addBuyer(row);
		
	},


	enumFormatter:function(cell, row, enumObject) {
		return enumObject[cell];
	},

	changeInput:function(name,this_){
		this.state.buyer[name] = this_.target.value;
		this.forceUpdate();
	},

	customUsersCheck:function(name,this_){
		this.state.buyer[name] = this_.target.value == -1?0:-1;
		this.forceUpdate();
	},

	selectUser:function(this_){
		var users = [];
		this_.map(function(user,index){

			users.push(user.value);

		});

		this.state.selectedusers = users;
		this.forceUpdate();
	},

	deleteFormat:function(cell, row, enumObject, index) {
		row.index = index;
		row.options = {singularstate:'buyers', pluralstate:'buyer',object:'Buyer', controller:'buyers',method:'delete'};
		return (
			
			<button className="btn btn-danger" onClick={this.deleteRow.bind(this,row)}>
			<i className="fa fa-trash mr-1 ml-2" aria-hidden="true"></i>
			</button>
			
			)
		},


		render() {


			var options = {
				onRowClick: this.onRowClick,
				ignoreEditable: true,
				onAddRow: this.onAddRow
			};

			var buyers = this.state.buyers;
			var users = this.state.users;

			var display = 'none';


			var customusers = false;
			if(this.state.buyer.customusers == -1) {
				customusers = true;
				display = 'block';
			}

            var insertRow = true;



			return (
			<div className="pt-5 pb-5">
			<h1 className="text-center">Buyers</h1>

			<BootstrapTable data={buyers}  insertRow={insertRow} striped hover  options={options} version='4' selectRow={this.selectRowProp } pagination>

			<TableHeaderColumn isKey dataField='id' hidden hiddenOnInsert>ID</TableHeaderColumn>
			<TableHeaderColumn dataField='name'  filter={ { type: 'TextFilter', delay: 100 }}>Name</TableHeaderColumn>
			<TableHeaderColumn dataField='username' filter={ { type: 'TextFilter', delay: 100 }}>Username</TableHeaderColumn>
			<TableHeaderColumn dataField='password' >Password</TableHeaderColumn>
			<TableHeaderColumn dataField='companyname' filter={ { type: 'TextFilter', delay: 100 }} >Company Name</TableHeaderColumn>
			<TableHeaderColumn dataField='totalpayments' filter={ { type: 'TextFilter', delay: 100 }} hiddenOnInsert>Payments</TableHeaderColumn>
			<TableHeaderColumn dataField='button'  dataFormat={this.deleteFormat} hiddenOnInsert></TableHeaderColumn>
			
			</BootstrapTable>

			{global.buyerid?
				<div>
				<hr/>
				<h2>{this.state.buyer.name}</h2>

				<label><b>Business Type:</b></label>
				<select className="form-control" onChange={this.changeInput.bind(this,'businesstypeid')} value={this.state.buyer.businesstypeid} >
				<option value='0' >All</option>
				{this.state.businesstypes.map(function(businesstype,index){
					return (
					<option value={businesstype.id} >{businesstype.name}</option>
					)
				})}
				</select>


				<br/>
				<div className="form-check">
				<label className="form-check-label">
				<input type='checkbox' className="form-check-input" onChange={this.customUsersCheck.bind(this,'customusers')} checked={customusers} value={this.state.buyer.customusers} />

				<b>Custom users</b>
				</label>
				</div>


				<div style={{display:display}}>
				<Select placeholder='Users'  multi onChange={this.selectUser} value={this.state.selectedusers} options={users} ></Select>
				</div>
				<br/>
				<label><b>Primary contact:</b></label>
				<input type='text' className="form-control" value={this.state.buyer.name} onChange={this.changeInput.bind(this,'name')} />
				<br/>
				
				<label><b>Username:</b></label>
				<input type='text' className="form-control" value={this.state.buyer.username} onChange={this.changeInput.bind(this,'username')} />
				<br/>
				<label><b>Password:</b> - <small>(Leave empty field if you do not want to change password)</small></label>
				<input type='text' className="form-control" value={this.state.buyer.password} onChange={this.changeInput.bind(this,'password')} />


				<div className="text-right mt-3">
				<button type="button" onClick={this.saveBuyer} className="btn btn-danger">Save</button>
				</div>
				</div>:''}

				<hr/>
                <br/>
                <br/>
                {this.state.buyerconflictforms.length>0?<h1>Conflict of Interest Form</h1>:''}
				{this.state.buyerconflictforms.map(function(conflictform,index){

					return(

					<div className="row" style={{borderTop:'1px solid rgba(0,0,0,.125)'}}>
                     
                     <div className="col-md-2 col-lg-2  mt-2  mb-2">
                     {conflictform.created.replace('00:00:00','')}
				      </div>

				       <div className="col-md-3 col-lg-3 mt-2  mb-2">
                       <Link  to={'admin/userfiles/'+conflictform.userid} >
                       <i className="fa fa-eye mr-1 ml-2" aria-hidden="true"></i> {conflictform.username}
                       </Link>
                      </div>

                      <div className="col-md-3 col-lg-3 mt-2  mb-2">
                      {conflictform.businesstypename}
                      </div>

                     

                       <div className="col-md-2 col-lg-2 mt-2 mb-2">
<a   href={"/smithconnenandgarcia/api/buyersconflictforms/downloadpdf?id="+conflictform.id}>
        <button className="btn btn-success btn-sm"><i className="fa fa-download mr-2" aria-hidden="true"></i>Download <small>unsigned</small></button>
        </a>
        </div>

        <div className="col-md-2 col-lg-2 mt-2  mb-2">  
        {conflictform.filename!=''?<a href={"/smithconnenandgarcia/uploads/"+conflictform.fullfilename} download>
        <button className="btn btn-info btn-sm"><i className="fa fa-download mr-2" aria-hidden="true"></i>Download <small>signed</small></button>
        </a>:''}
        </div>




				      
				    </div>

					)

				})}

				</div>
				);
			}
		})
