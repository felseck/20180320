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
			admins:[],
			render:true,
			admin:{},
			businesstypes:[],
			users:[],
			selectedusers:[]
		}
	},

	componentDidMount(){
		this.getAdmins();
		this.getBusinessTypes();
		this.getUsers();
	},

	onRowClick:function(row){
		global.adminid = row.id;
		this.getAdmin(); 
	},

	



	selectRowProp: {
		mode: 'radio',
		bgColor: '#F2FFA8', 
		hideSelectColumn: true,  
		clickToSelect: true 
	},

	onAddRow:function(row){
		delete row.id;
		this.addAdmin(row);
		
	},


	enumFormatter:function(cell, row, enumObject) {
		return enumObject[cell];
	},

	changeInput:function(name,this_){
		this.state.admin[name] = this_.target.value;
		this.forceUpdate();
	},

	customUsersCheck:function(name,this_){
		this.state.admin[name] = this_.target.value == -1?0:-1;
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
		row.options = {singularstate:'admins', pluralstate:'admin',object:'Admin', controller:'AdminsController',method:'deleteadmin'};
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

			var admins = this.state.admins;
			var users = this.state.users;

			var display = 'none';


			var customusers = false;
			if(this.state.admin.customusers == -1) {
				customusers = true;
				display = 'block';
			}

            var insertRow = true;



			return (
			<div className="pt-5 pb-5">
			<h1 className="text-center">Admins</h1>

			<BootstrapTable data={admins} insertRow={insertRow} striped hover  options={options} version='4' selectRow={this.selectRowProp } pagination>

			<TableHeaderColumn isKey dataField='id' hidden hiddenOnInsert>ID</TableHeaderColumn>
			<TableHeaderColumn dataField='name'  filter={ { type: 'TextFilter', delay: 100 }}>Name</TableHeaderColumn>
			<TableHeaderColumn dataField='lastname'  filter={ { type: 'TextFilter', delay: 100 }}>Last Name</TableHeaderColumn>
			<TableHeaderColumn dataField='username' filter={ { type: 'TextFilter', delay: 100 }}>Username</TableHeaderColumn>
			<TableHeaderColumn dataField='password' >Password</TableHeaderColumn>
			 <TableHeaderColumn dataField='button'  dataFormat={this.deleteFormat} hiddenOnInsert></TableHeaderColumn>
			
			</BootstrapTable>

			{global.adminid?
				<div>
				<hr/>
				<h2>{this.state.admin.name} {this.state.admin.lastname}</h2>

				<label><b>Business Type:</b></label>
				<select className="form-control" onChange={this.changeInput.bind(this,'businesstypeid')} value={this.state.admin.businesstypeid} >
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
				<input type='checkbox' className="form-check-input" onChange={this.customUsersCheck.bind(this,'customusers')} checked={customusers} value={this.state.admin.customusers} />

				<b>Custom users</b>
				</label>
				</div>


				<div style={{display:display}}>
				<Select placeholder='Users'  multi onChange={this.selectUser} value={this.state.selectedusers} options={users} ></Select>
				</div>
				<br/>
				<label><b>Name:</b></label>
				<input type='text' className="form-control" value={this.state.admin.name} onChange={this.changeInput.bind(this,'name')} />
				<br/>
				<label><b>Lastname:</b></label>
				<input type='text' className="form-control" value={this.state.admin.lastname} onChange={this.changeInput.bind(this,'lastname')} />
				<br/>
				<label><b>Username:</b></label>
				<input type='text' className="form-control" value={this.state.admin.username} onChange={this.changeInput.bind(this,'username')} />
				<br/>
				<label><b>Password:</b> - <small>(Leave empty field if you do not want to change password)</small></label>
				<input type='text' className="form-control" value={this.state.admin.password} onChange={this.changeInput.bind(this,'password')} />


				<div className="text-right mt-3">
				<button type="button" onClick={this.saveAdmin} className="btn btn-danger">Save</button>
				</div>
				</div>:''}

				</div>
				);
			}
		})
