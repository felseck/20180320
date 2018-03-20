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
			users:[],
			render:true,
			user:{},
			businesstypes:[],
			userbusinesstypes:[]
		}
	},

	componentDidMount(){
		this.getUsers('supermarketusers');
		this.getBusinessTypes();
	},

	onRowClick:function(row){
		global.userid = row.id;
		//this.getUser();
	},

	onAddRow:function(row){
		console.log('on addrow');
		console.log(row)
		delete row.id;
		this.addUser(row);
		
	},

	
    changeInput:function(name,this_){
        this.state.user[name] = this_.target.value;
        this.forceUpdate();
	},


	selectRowProp: {
		mode: 'radio',
		bgColor: '#F2FFA8', 
		hideSelectColumn: true,  
		clickToSelect: false 
	},

	priceFormatter:function(cell, row) {
  return (
  	<span>
  	{cell}  
      <Link  to={'buyers/userfiles/'+row.id} >
       <i className="fa fa-eye mr-1 ml-2" aria-hidden="true"></i> See files
      </Link>
      </span>
    )
},




deleteUserFormat:function(cell, row, enumObject, index) {
	row.index = index;
	
  return (
  	
      <button className="btn btn-danger" onClick={this.deleteUser.bind(this,row)}>
       <i className="fa fa-trash mr-1 ml-2" aria-hidden="true"></i>
      </button>
    
    )
},



selectBusinessTypes:function(this_){

		var userbusinesstypes = [];
		this_.map(function(userbusinesstype,index){

			userbusinesstypes.push(userbusinesstype.value);

		});
		
		

		this.setState({userbusinesstypes:userbusinesstypes});

	},

	render() {


		var options = {
			onRowClick: this.onRowClick,
			ignoreEditable: true,
			onAddRow: this.onAddRow
		};

		 

	var users = this.state.users;
	return (
		<div className="pt-5 pb-5">
			<h1 className="text-center">Suppliers</h1>

		<BootstrapTable data={users}  exportCSV={true} striped hover  options={options} version='4' selectRow={this.selectRowProp } pagination>
		
		<TableHeaderColumn isKey dataField='id'  hiddenOnInsert>ID</TableHeaderColumn>
		<TableHeaderColumn dataField='name' filter={ { type: 'TextFilter', delay: 100 }}>Primary contact</TableHeaderColumn>
		<TableHeaderColumn dataField='username' filter={ { type: 'TextFilter', delay: 100 }}>Username</TableHeaderColumn>
		<TableHeaderColumn dataField='companyname' filter={ { type: 'TextFilter', delay: 100 }}>Company Name</TableHeaderColumn>
		</BootstrapTable>



		</div>
		);
	}
})
