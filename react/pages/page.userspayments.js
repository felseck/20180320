import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Ajax from '../mixins/mixin.ajax_1_1'
import Link from '../navs/nav.link'
import Others from '../mixins/mixin.others_1_1'
import Select from 'react-select'

export default React.createClass({
	mixins:[Ajax,Others],
	getInitialState(){
		return {
			controller:'userspayments',
			createmethod:'createpayment',
			objecttext:'User Payment',
			objects:[],
			render:true,
			object:{},
			row:{},
			selectedobjects:[],
			rowselected:false,
			getallusers:[]
		}
	},

	componentDidMount(){
		var options = {
			method:'alluserspayments',
		};

		this.gets(options);

		options = {
			controller:'getallusers',
			method:'empty',
		};

		this.gets(options);
	},


   selectUser:function(value){
		
		this.state.object.userid = value;
		this.forceUpdate();
	},



	render() {

		var selectRowProp = {
			mode: 'radio',
			bgColor: '#F2FFA8', 
			hideSelectColumn: true,  
			clickToSelect: true,

		}

		var options = {
			onRowClick: this.onRowClick,
			ignoreEditable: true,
			onAddRow: this.onAddRow,
			handleConfirmDeleteRow: this.customConfirm,
			exportCSVText: 'EXPORTAR EXCEL',
			//insertText: 'NUEVO',
			deleteText: 'Eliminar',
			sizePerPageList: [20],
			//insertModalHeader: this.createCustomModalHeader,
			//insertModalFooter: this.createCustomModalFooter
		};

		var objects = this.state.objects;
		var object = this.state.object;

		var display = 'none';



		var selectvalues = {10000000000:''};
		this.state.getallusers.map(function(user,index){
			selectvalues[user.id] = user.name;
		});


		

		var selectfilter = { type: 'SelectFilter', options: selectvalues};


		var paymentsmethods = [
		{value:1,text:'Credit Card',label:'Credit Card'},
		{value:2,text:'Paypal',label:'Paypal'},
		{value:3,text:'Cash',label:'Cash'},
		{value:4,text:'Check',label:'Check'},
		{value:5,text:'Other',label:'Other'},
		];

		var paymentsmethodsvalues = {10000000000:''};

        paymentsmethods.map(function(paymentmethod,index){
			paymentsmethodsvalues[paymentmethod.value] = paymentmethod.text;
		});

		objects.map(function(object,index){
			if(!object.userid) {
				objects[index].userid = 10000000000;

			}
if(!object.paymentmethodid) {
			objects[index].paymentmethodid = 10000000000;
		}
		});

		var paymentsmethodsselectfilter = { type: 'SelectFilter', options: paymentsmethodsvalues};

        if(this.state.object.userid) this.state.object.userid = this.state.object.userid.toString()
        	if(this.state.object.paymentmethod) this.state.object.paymentmethod = this.state.object.paymentmethod.toString()

		return (
			<div className="pt-5 pb-5">
			<h1 className="text-center">Users Payments</h1>

			<BootstrapTable data={objects} exportCSV={ false } insertRow={ true } striped hover  options={options} version='4' selectRow={selectRowProp } pagination>

			<TableHeaderColumn isKey dataField='id' hidden hiddenOnInsert>ID</TableHeaderColumn>

			<TableHeaderColumn dataField='userid' dataFormat={ this.enumFormatter } filterFormatted  formatExtraData={selectvalues} filter={selectfilter} editable={ { type: 'select', options: { values: this.state.getallusers } } }>User</TableHeaderColumn>

			<TableHeaderColumn dataField='username' filter={ { type: 'TextFilter', delay: 100 }} hiddenOnInsert>Email</TableHeaderColumn>
			<TableHeaderColumn width="100" dataField='amount'  filter={ { type: 'TextFilter', delay: 100 }}>Amount</TableHeaderColumn>
			<TableHeaderColumn dataField='concept'  filter={ { type: 'TextFilter', delay: 100 }}>Concept</TableHeaderColumn>
			<TableHeaderColumn dataField='company'  filter={ { type: 'TextFilter', delay: 100 }}>Company</TableHeaderColumn>

			<TableHeaderColumn dataField='paymentmethodid' dataFormat={ this.enumFormatter } filterFormatted  formatExtraData={paymentsmethodsvalues} filter={paymentsmethodsselectfilter} editable={ { type: 'select', options: { values: paymentsmethods } } }>Payment Method</TableHeaderColumn>


			<TableHeaderColumn  dataField='date'  dataFormat={ this.dateFormatter } filter={ { type: 'DateFilter' } } editable={ { type: 'date' } } >Date</TableHeaderColumn>
			<TableHeaderColumn width="50"   dataFormat={this.buttonDelete} hiddenOnInsert></TableHeaderColumn>

			</BootstrapTable>

			{this.state.object.userid? <div className="row mb-5">

               <div className="col-md-6 col-lg-6 mt-2">

               <label><b>User:</b></label>
           
				<Select placeholder='Users'  simpleValue onChange={this.changeInput.bind(this,'userid')} value={this.state.object.userid}  options={this.state.getallusers} ></Select>
                </div>

<div className="col-md-1 col-lg-1 mt-2">
</div>

                  <div className="col-md-3 col-lg-3 mt-2">
                <label><b>Date:</b></label>
				<input type='date' className="form-control" value={this.state.object.date} onChange={this.changeInput.bind(this,'date')} />
				
                </div>

                <div className="col-md-2 col-lg-2 mt-2"> 
</div>

                <div className="col-md-2 col-lg-2 mt-2">
                 <label><b>Amount:</b></label>
				<input type='text' className="form-control" value={this.state.object.amount} onChange={this.changeInput.bind(this,'amount')} />
				
                </div>

                <div className="col-md-4 col-lg-3 mt-2">
                 <label><b>Concept:</b></label>
				<input type='text' className="form-control" value={this.state.object.concept} onChange={this.changeInput.bind(this,'concept')} />
				
                </div>

                <div className="col-md-4 col-lg-3 mt-2">
                 <label><b>Company:</b></label>
				<input type='text' className="form-control" value={this.state.object.company} onChange={this.changeInput.bind(this,'company')} />
				
                </div>

                <div className="col-md-2 col-lg-2 mt-2">
                <label><b>Payment Method:</b></label>
					<Select placeholder='Payment Method'  simpleValue onChange={this.changeInput.bind(this,'paymentmethodid')} value={this.state.object.paymentmethodid}  options={paymentsmethods} ></Select>
               
                </div>

               
               <div className="col-md-10 col-lg-10 mt-2 text-right pt-5">
				<button type="button" onClick={this.put} className="btn btn-danger">Save</button>
				</div>

                </div>:''}

                




			</div>
			);
	}
})
