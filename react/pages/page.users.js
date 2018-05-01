import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Ajax from '../mixins/mixin.ajax'
import Ajax_1_1 from '../mixins/mixin.ajax_1_1'
//import Files from './page.files'
import Link from '../navs/nav.link'
import Select from 'react-select'

export default React.createClass({
	mixins:[Ajax,Ajax_1_1],
	getInitialState(){
		return {
			users:[],
			render:true,
			user:{buyergroupid:null},
			businesstypes:[],
			userbusinesstypes:[],
			bussinestypesselected:[],
			userbusinessdocumentstypes:{},
			documentstypes:[],
			activefilter:'all',
			activefiltercheck:{},
			supplierapproved:'',
			supermarkets:[],
			usersupermarkets:[],
			buyersgroups:[]		
		}
	},

	componentDidMount(){

		var method = null;
		if(_GlobalData.supermarketid) method = 'supermarketusers';

		this.getUsers(method);
		this.getBusinessTypes();
		this.getDocumentsTypes();


		this.gets({
			controller:'supermarkets',
			query:{hasmainsupermarket:0}
		});
		
		this.gets({
			controller:'buyersgroups',
		});

	},

	onRowClick:function(row){
		global.userid = row.id;
		this.getUser();
	},

	onAddRow:function(row){
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
		clickToSelect: true 
	},

	priceFormatter:function(cell, row) {
		return (
			<span>
			{cell}  
			<Link  to={_GlobalData.supermarketid?'supermarkets/userfiles/'+row.id:'admin/userfiles/'+row.id} >
			<i className="fa fa-eye mr-1 ml-2" aria-hidden="true"></i> See files
			</Link>
			</span>
			)
		},

		disapproveuser:function(row){

			if(_GlobalData.supermarketid) return;

      	if(!confirm('Are you sure you want to DISAPPROVE this user?')) return;

      	var data ={id:row.id,approved:0,approvebutton:-1}

        this.saveUser({data:data,callback:function(){

        	this.state.users.map(function(user,index){
						if(row.id == user.id) this.state.users[index].approved = 0;
					}.bind(this));

        	this.forceUpdate();
        }.bind(this)});
      },

      approveuser:function(row){

      	if(_GlobalData.supermarketid) return;

      	if(!confirm('Are you sure you want to approve this user?')) return;

      	
      	var data ={id:row.id,approved:-1,approvebutton:-1}


        this.saveUser({data:data,callback:function(){

        	this.state.users.map(function(user,index){
						if(row.id == user.id) this.state.users[index].approved = -1;
					}.bind(this));

        	this.forceUpdate();
        }.bind(this)});
      },

       approveUserFormat:function(cell, row, enumObject, index) {
			row.index = index;

		
			return (
<div>
			{row.approved == '0'?
				<button className="btn btn-warning" onClick={this.approveuser.bind(this,row)}>
			    Pending
			</button>:
			<button className="btn btn-success" onClick={this.disapproveuser.bind(this,row)} >
			    <i className="fa fa-check-circle mr-1 ml-2" aria-hidden="true" ></i> Approved
			</button>}
</div>
			)
		},


		deleteUserFormat:function(cell, row, enumObject, index) {
			row.index = index;

			if(_GlobalData.supermarketid) return null;

			return (

			<button className="btn btn-danger" onClick={this.deleteUser.bind(this,row)}>
			<i className="fa fa-trash mr-1 ml-2" aria-hidden="true"></i>
			</button>

			)
		},

		selectbuyergroup:function(name, value){

			this.state.user.buyergroupid = value;

			console.log('value',value);

			if(name == 'filter') this.refs.buyergroupid.applyFilter(value || '');
		    this.forceUpdate();
       
		},


		selectsupermarkets:function(this_){


		
			var usersupermarkets = [];
			this_.map(function(usersupermarket,index){

				usersupermarkets.push(usersupermarket.value);

			}.bind(this));

			this.setState({usersupermarkets:usersupermarkets},function(){

				
              this.getusersbysupermarket();

			}.bind(this));

		},

		getusersbysupermarket:function(){

			if(this.props.params.reporttype == 'files'){

             this.gets({
             	controller:'users',
             	method:'usersbysupermarket',
             	query:{supermarketsids:this.state.usersupermarkets}
             })
				
			}

		},



		selectBusinessTypes:function(this_){

			var keys = $.map(this.state.userbusinessdocumentstypes, function(val, key) { return key; });
			var userbusinesstypes = [];
			this_.map(function(userbusinesstype,index){

				userbusinesstypes.push(userbusinesstype.value);

				if(keys.indexOf(userbusinesstype.value) == -1) {
                 this.state.userbusinessdocumentstypes[userbusinesstype.value] = {};
				 this.state.userbusinessdocumentstypes[userbusinesstype.value]['documentstypes'] = [];
				}

			}.bind(this));


			keys.map(function(key,index){
				if(userbusinesstypes.indexOf(key) == -1) this.state.userbusinessdocumentstypes[key]['documentstypes'] = [];
			}.bind(this))

			this.setState({bussinestypesselected:this_,userbusinesstypes:userbusinesstypes});

		},

		setStartBusinessTypes:function(){

		},

		selectDocumentsTypes:function(businesstype,this_){

			var documentstypes = [];
			this_.map(function(documenttype,index){

				documentstypes.push(documenttype.id);

			});

			this.state.userbusinessdocumentstypes[businesstype.id]['documentstypes'] = documentstypes;
			this.forceUpdate();

		},

		NumberFilter:function(filtername_){

			var filter = { 
            type: 'NumberFilter', 
            delay: 100, 
            numberComparators: [ '=', '>', '<=', '>=','<' ],
            defaultValue: { number: 0, comparator: '>' } 
            }

            if(filtername_ == 'totalpayments_') filter.defaultValue.comparator = '=';
           if(this.state.activefilter != filtername_) filter = {};

			
			return filter; 

		},

		onChangeFilefilter:function(filtername_){

			if(this.state.activefilter == filtername_) return;
			this.refs.totalpayments_.cleanFiltered();
			this.refs.totalpayments.cleanFiltered();
			this.refs.uploadednum.cleanFiltered();
			this.refs.notuploadednum.cleanFiltered();
			this.refs.pendingchecknum.cleanFiltered();
			this.refs.rejectednum.cleanFiltered();
			this.refs.approvednum.cleanFiltered();
			this.refs.expirednum.cleanFiltered();

			this.state.activefilter = filtername_;


			this.forceUpdate();
		},


		NumberFilterCheck:function(filtername_){

			var filter = { 
            type: 'NumberFilter', 
            delay: 100, 
            numberComparators: [ '=', '>', '<=', '>=','<' ],
            defaultValue: { number: 0, comparator: '>' } 
            }


            var checked = $('.'+filtername_).is(':checked');

             

            if(!checked) filter = {};
console.log('this.state.activefiltercheck',this.state.activefiltercheck);
        
			return filter; 

		},



		onChangeFileCheckBoxFilter:function(filtername_){
			
			var checked = $('.'+filtername_).is(':checked');

			if(!checked) this.refs[filtername_].cleanFiltered();

			this.state.activefiltercheck[filtername_] = checked;
			
			this.forceUpdate();
		},

		uncheckall:function(){


          
        var filters = $.map(this.state.activefiltercheck, function(val, key) { return key; });

        filters.map(function(val,index){

        	if(val != 'all') {
        		this.state.activefiltercheck[val] = false;
        		 this.refs[val].cleanFiltered();
        	}
        }.bind(this));
          

		},

		changeapprove:function(event){
         //  this.refs.supplierapproved.cleanFiltered();
        

           this.setState({supplierapproved:event.target.value},function(){

this.refs.supplierapproved.cleanFiltered();

           }.bind(this));
		},

		approveUserCheck:function(filtername_){

		//	return filter = {};

			var filter = { 
            type: 'NumberFilter', 
            delay: 100, 
            numberComparators: [ '=', '>', '<=', '>=','<' ],
            defaultValue: { number: '0', comparator: '<=' } 
            }

         

			if(this.state.supplierapproved == '') filter.defaultValue.comparator = '<=';
            else if(this.state.supplierapproved == 0) filter.defaultValue.comparator = '=';
            else if(this.state.supplierapproved == -1) filter.defaultValue.comparator = '<';
        
        
        
			return filter;
		},


		buyergroupfilter:function(){   //Convertimos el filtro al formato de 'react-bootstrap-table'

		var selectvalues = {10000000000:''};
		this.state.buyersgroups.map(function(buyergroup,index){
			selectvalues[buyergroup.id] = buyergroup.name;
		});


		var selectfilter = { type: 'SelectFilter', options: selectvalues};

		return {values:selectvalues,filter:selectfilter}

		},

		enumFormatter:function(cell, row, enumObject) {
           return enumObject[cell];
        },

		render() {

			var qualityType = {0:'No',1:'Yes'};
			var ReportType = this.props.params.reporttype;
			console.log('ReportType',ReportType);


			var options = {
				onRowClick: this.onRowClick,
				ignoreEditable: true,
				onAddRow: this.onAddRow
			};

			if(_GlobalData.supermarketid) delete options.onRowClick;

			var insertRow = true;

			console.log('_GlobalData.businesstypeid');
			console.log(_GlobalData.businesstypeid);

			if(_GlobalData.businesstypeid != 0) insertRow = false;


			var users = this.state.users;


			return (
			<div className="pt-5 pb-5">
			<h1 className="text-center">Users</h1>

{ReportType?
<div className="text-center mt-3 mb-3">
			<div className="btn-group" >

 {ReportType == 'payments'?
			<label className="btn btn-primary active_">
    <input type="radio" name="filefilter" value="all" autocomplete="off" checked={this.state.activefilter=='all'?true:false}  onChange={this.onChangeFilefilter.bind(this,'all')} /> All
  </label>:''}

  {ReportType == 'payments'?	<label className="btn btn-primary">
    <input type="radio" name="filefilter" value="totalpayments" autocomplete="off" checked={this.state.activefilter=='totalpayments'?true:false}  onChange={this.onChangeFilefilter.bind(this,'totalpayments')} /> Payments
  </label>:''}

  	{ReportType == 'payments'? <label className="btn btn-primary">
    <input type="radio" name="filefilter" value="totalpayments_" autocomplete="off" checked={this.state.activefilter=='totalpayments_'?true:false}  onChange={this.onChangeFilefilter.bind(this,'totalpayments_')} />  Not Payments
  </label>:''}


{/*ReportType == 'files'?	<label className="btn btn-primary active_">
    <input type="checkbox"  className="all" autocomplete="off" checked={this.state.activefiltercheck.all}  onChange={this.onChangeFileCheckBoxFilter.bind(this,'all')} /> All
  </label>:''*/}


{ReportType == 'files'?
  <label className="btn btn-primary">
    <input type="checkbox" autocomplete="off" checked={this.state.activefiltercheck.uploadednum} onChange={this.onChangeFileCheckBoxFilter.bind(this,'uploadednum')} className="uploadednum" /> Files Uploaded
  </label>:''}

  {ReportType == 'files'?
  <label className="btn btn-primary">
    <input type="checkbox"  autocomplete="off" checked={this.state.activefiltercheck.notuploadednum} onChange={this.onChangeFileCheckBoxFilter.bind(this,'notuploadednum')} className="notuploadednum" /> Files Not Uploaded
  </label>:''}

  {ReportType == 'files'?
  <label className="btn btn-primary">
    <input type="checkbox" autocomplete="off" checked={this.state.activefiltercheck.rejectednum} onChange={this.onChangeFileCheckBoxFilter.bind(this,'rejectednum')} className="rejectednum" /> Files Rejected
  </label>:''}

  {ReportType == 'files'?
   <label className="btn btn-primary">
    <input type="checkbox" autocomplete="off" checked={this.state.activefiltercheck.approvednum} onChange={this.onChangeFileCheckBoxFilter.bind(this,'approvednum')} className="approvednum" /> Files Approved
  </label>:''}



{ReportType == 'files'?
  <label className="btn btn-primary">
    <input type="checkbox"autocomplete="off" checked={this.state.activefilter.expirednum} onChange={this.onChangeFileCheckBoxFilter.bind(this,'expirednum')} className="expirednum" /> Files Expired
  </label>:''}

{ReportType == 'files'?
  <label className="btn btn-primary">
    <input type="checkbox"  autocomplete="off" checked={this.state.activefilter.pendingchecknum} onChange={this.onChangeFileCheckBoxFilter.bind(this,'pendingchecknum')} className="pendingchecknum" /> Files Not Approved
  </label>:''}
</div>

<br/><br/>
<div className="btn-group" >
{ReportType == 'files'?
  <label className="btn btn-primary">
Supplier status
<select value={this.state.supplierapproved} className="form-control supplierapproved" onChange={this.changeapprove}>
<option value="">All</option>
<option value="-1">Approved</option>
<option value="0">Not Approved</option>
</select>
 </label>:''}

  {ReportType == 'files'?
  <label className="btn btn-primary" style={{width:'300px'}}>
Buyers groups
	<Select placeholder='buyer group'  simpleValue onChange={this.selectbuyergroup.bind(this,'filter')} value={this.state.user.buyergroupid}  options={this.state.buyersgroups} ></Select>
              	

 </label>:''}
  

{ReportType == 'files' && !_GlobalData.supermarketid?
  <label className="btn btn-primary" style={{width:'300px'}}>
Supermarkets
	<Select placeholder='Supermarkets'  multi onChange={this.selectsupermarkets} value={this.state.usersupermarkets} options={this.state.supermarkets} ></Select>
			

 </label>:''}

</div>


</div>:''}

			<BootstrapTable ref="mitabla" data={users} exportCSV={ ReportType?true:false } insertRow={ReportType?false:insertRow}  striped hover  options={options} version='4' selectRow={this.selectRowProp } pagination>

			<TableHeaderColumn width="150" isKey dataField='id' dataFormat={this.priceFormatter} hiddenOnInsert>ID</TableHeaderColumn>
			<TableHeaderColumn width="150" dataField='name' filter={ { type: 'TextFilter', delay: 100 }}>Primary contact</TableHeaderColumn>
			<TableHeaderColumn width="250" dataField='username' filter={ { type: 'TextFilter', delay: 100 }}>Username</TableHeaderColumn>
			<TableHeaderColumn width="150" dataField='password' hidden>Password</TableHeaderColumn>

		

		<TableHeaderColumn width="150" dataField='companyname' filter={ { type: 'TextFilter', delay: 100 }} >Company Name</TableHeaderColumn>
		
		<TableHeaderColumn dataField='buyergroupid' width="150" hidden={ReportType == 'files'?false:true} ref="buyergroupid" dataFormat={ this.enumFormatter } filterFormatted  formatExtraData={this.buyergroupfilter().values} filter={this.buyergroupfilter().filter} hiddenOnInsert>Buyer group</TableHeaderColumn>
       
		<TableHeaderColumn width="150" hidden={ReportType == 'payments' && this.state.activefilter != 'totalpayments_'?false:true} ref="totalpayments" dataField='totalpayments' filter={this.NumberFilter('totalpayments')} hiddenOnInsert>Payments</TableHeaderColumn>
	
		<TableHeaderColumn width="150" hidden={ReportType == 'payments' && this.state.activefilter == 'totalpayments_'?false:true} ref="totalpayments_" dataField='totalpayments' filter={this.NumberFilter('totalpayments_')} hiddenOnInsert>Payments</TableHeaderColumn>
		
	
		<TableHeaderColumn width="150" hidden={ReportType == 'files'?false:true} ref="uploadednum" dataField='uploadednum'  filter={this.NumberFilterCheck('uploadednum')} hiddenOnInsert>Files<br/>Uploaded#</TableHeaderColumn>
		

		
		<TableHeaderColumn width="150" hidden={ReportType == 'files'?false:true} ref="notuploadednum" dataField='notuploadednum' filter={this.NumberFilterCheck('notuploadednum')} hiddenOnInsert>Files<br/>NotUploaded#</TableHeaderColumn>
	

      
		<TableHeaderColumn width="150" hidden={ReportType == 'files'?false:true} ref="pendingchecknum" dataField='pendingchecknum'  filter={this.NumberFilterCheck('pendingchecknum')} hiddenOnInsert>Files<br/>PendingCheck#</TableHeaderColumn>
      

      
		<TableHeaderColumn width="150" hidden={ReportType == 'files'?false:true} ref="rejectednum" dataField='rejectednum'  filter={this.NumberFilterCheck('rejectednum')} hiddenOnInsert>Files<br/> Rejected#</TableHeaderColumn>
	

      
		<TableHeaderColumn width="150" hidden={ReportType == 'files'?false:true} ref="approvednum" dataField='approvednum' filter={this.NumberFilterCheck('approvednum')} hiddenOnInsert>Files<br/>Approved#</TableHeaderColumn>
	

       
		<TableHeaderColumn width="150" hidden={ReportType == 'files'?false:true} ref="expirednum" dataField='expirednum'  filter={this.NumberFilterCheck('expirednum')} hiddenOnInsert>Files<br/>Expired#</TableHeaderColumn>
      
      
       <TableHeaderColumn width="150"  dataField='approved'  ref='supplierapproved'   dataFormat={this.approveUserFormat} filter={this.approveUserCheck('supplierapproved')} hiddenOnInsert>Supplier</TableHeaderColumn>
		
		<TableHeaderColumn width="50"  hidden={!ReportType?false:true} dataFormat={this.deleteUserFormat}></TableHeaderColumn>
		

		</BootstrapTable>


		{global.userid && this.state.user && !ReportType?
			<div>
			<hr/>
			<h2>{this.state.user.name}</h2>	

			<br/>
			<label><b>Buyer Group:</b></label>			
			<Select placeholder='Buyer Group'  simpleValue  onChange={this.selectbuyergroup.bind(this,'buyergroupid')} value={this.state.user.buyergroupid}  options={this.state.buyersgroups}></Select>
			<br/>

			<br/>
			<label><b>Supermarkets:</b></label>
			<Select placeholder='Supermarkets'  multi onChange={this.selectsupermarkets} value={this.state.usersupermarkets} options={this.state.supermarkets} ></Select>
			<br/>

			<br/>
			<label><b>Business types:</b></label>
			<Select placeholder='Business types'  multi onChange={this.selectBusinessTypes} value={this.state.userbusinesstypes} options={this.state.businesstypes} ></Select>
			<br/>
			

			{this.state.bussinestypesselected.length >0?
				<div className="card">
				<h5>CUSTOM DOCUMENTS TYPES <br/><small>By default, all documents of the type of business are assigned. If you want to customize the documents, select them right away.</small></h5>
				<ul className="list-group list-group-flush">
				{this.state.bussinestypesselected.map(function(businesstype,index){


					return(
					<li className="list-group-item" key={index} >
					<label><b>{businesstype.name} documents:</b></label>

					<Select placeholder='Documents types'  multi onChange={this.selectDocumentsTypes.bind(this,businesstype)} value={this.state.userbusinessdocumentstypes[businesstype.id]?this.state.userbusinessdocumentstypes[businesstype.id].documentstypes:[]} options={this.state.documentstypes} ></Select>

					</li>

					)
				}.bind(this))}

				</ul>

               <div className="row">
               <div className="col-md-6 col-lg-6 mt-2">
                </div>
				<div className="col-md-6 col-lg-6 mt-2">
				<label><b>Send documents valid until:</b></label>
				<input type='date' className="form-control" value={this.state.user.documentsexpiredate} onChange={this.changeInput.bind(this,'documentsexpiredate')} />
                </div>
               </div>

				</div>
				: ''}

				<br/>
				<label><b>Primary contact:</b></label>
				<input type='text' className="form-control" value={this.state.user.name} onChange={this.changeInput.bind(this,'name')} />

				<br/>
				<label><b>Company name:</b></label>
				<input type='text' className="form-control" value={this.state.user.companyname} onChange={this.changeInput.bind(this,'companyname')} />


				<label><b>Username:</b></label>
				<input type='text' className="form-control" value={this.state.user.username} onChange={this.changeInput.bind(this,'username')} />

				<br/>
				<label><b>Password:</b> - <small>(Leave empty field if you do not want to change password)</small></label>
				<input type='text' className="form-control" value={this.state.user.password} onChange={this.changeInput.bind(this,'password')} />

				<div className="text-right mt-3">
				<button type="button" onClick={this.saveUser.bind(this,null)} className="btn btn-danger">Save</button>
				</div>
				</div>:''}

				</div>
				);
			}
		})
