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
			controller:'supermarkets',
			objecttext:this.props.params.workers?'Supermarket Worker':'Supermarket',
			objects:[],
			render:true,
			object:{},
			row:{},
			selectedobjects:[],
			rowselected:false,
			createmethod:'addsupermarket',
			supermarkets:[],
		}
	},

	componentDidMount(){

         var options = {query:{hasmainsupermarket:0}}

		if(this.props.params.workers) options.query.hasmainsupermarket = -1;

		this.gets(options);


		if(this.props.params.workers) this.gets({
			controller:'supermarkets',
			query:{hasmainsupermarket:0}
		});

	},

	savesupermarket(){
      
      if(this.state.object.normalpwd && this.state.object.normalpwd == '') delete this.state.object.normalpwd;
      this.put({
      	method:'savesupermarket'
      });
	},

onBeforeAddRow(row_){

	if(this.props.params.workers) row_.hasmainsupermarket = -1;

    this.onAddRow(row_);
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
			onAddRow: this.onBeforeAddRow,
			handleConfirmDeleteRow: this.customConfirm,
			//exportCSVText: 'EXPORTAR EXCEL',
			//insertText: 'NUEVO',
			deleteText: 'Eliminar',
			sizePerPageList: [20],
			//insertModalHeader: this.createCustomModalHeader,
			//insertModalFooter: this.createCustomModalFooter
		};

		var objects = this.state.objects;
		var object = this.state.object;

		var display = 'none';

        var mainsupermarketid = this.state.object.mainsupermarketid?this.state.object.mainsupermarketid.toString():'';

        var hiddenworkers = this.props.params.workers?true:false;
        var hiddensupermarkets = !this.props.params.workers?true:false;


        var selectvalues = {10000000000:''};
		this.state.supermarkets.map(function(supermarket,index){
			selectvalues[supermarket.id] = supermarket.name;
			supermarket.text = supermarket.name;
		});


		

		var selectfilter = { type: 'SelectFilter', options: selectvalues};

	

		return (
			<div className="pt-5 pb-5">
			<h1 className="text-center">.. Supermarkets {this.props.params.workers?'Workers':''}</h1>

			<BootstrapTable data={objects} exportCSV={true } insertRow={ true } striped hover  options={options} version='4' selectRow={selectRowProp } pagination>

			<TableHeaderColumn isKey dataField='id' hidden hiddenOnInsert>ID</TableHeaderColumn>

			<TableHeaderColumn hidden={hiddenworkers} hiddenOnInsert={hiddenworkers} dataField='name' filter={ { type: 'TextFilter', delay: 100 }} >Supermarket Name</TableHeaderColumn>
			
	
			<TableHeaderColumn  hidden={hiddenworkers} hiddenOnInsert={hiddenworkers} dataField='description' filter={ { type: 'TextFilter', delay: 100 }} >Description</TableHeaderColumn>
          
            <TableHeaderColumn hidden={hiddensupermarkets} hiddenOnInsert={hiddensupermarkets} dataField='mainsupermarketid' dataFormat={ this.enumFormatter } filterFormatted  formatExtraData={selectvalues} filter={selectfilter} editable={ { type: 'select', options: { values: this.state.supermarkets } } } >Supermarket</TableHeaderColumn>
			

			<TableHeaderColumn hidden={hiddensupermarkets} hiddenOnInsert={hiddensupermarkets} dataField='primarycontact' filter={ { type: 'TextFilter', delay: 100 }} >Primary Contact</TableHeaderColumn>
			<TableHeaderColumn hidden={hiddensupermarkets} hiddenOnInsert={hiddensupermarkets} dataField='username' filter={ { type: 'TextFilter', delay: 100 }} >Email</TableHeaderColumn>
			<TableHeaderColumn hidden={hiddensupermarkets} hiddenOnInsert={hiddensupermarkets} hidden={true} dataField='password' filter={ { type: 'TextFilter', delay: 100 }} >Password</TableHeaderColumn>
			
	        <TableHeaderColumn width="50"   dataFormat={this.buttonDelete} hiddenOnInsert></TableHeaderColumn>

			</BootstrapTable>

			{this.state.object.id? <div className="row mb-5">

         
            
{!hiddenworkers?
                <div className="col-md-12 col-lg-12 mt-2">
                 <label><b>Supermarket Name:</b></label>
				<input type='text' className="form-control" value={this.state.object.name} onChange={this.changeInput.bind(this,'name')} />
				
                </div>
:''}

{!hiddenworkers?
                <div className="col-md-12 col-lg-12 mt-2">
                 <label><b>Description:</b></label>
				<textarea  className="form-control"  value={this.state.object.description} onChange={this.changeInput.bind(this,'description')} ></textarea>
				
                </div>
:''}

{!hiddensupermarkets?<div className="col-md-12 col-lg-12 mt-2">
<label><b>Supermarket:</b></label>
			<Select placeholder='Supermarkets'  simpleValue onChange={this.changeInput.bind(this,'mainsupermarketid')} value={mainsupermarketid} options={this.state.supermarkets} ></Select>
			
</div>:''}

               {!hiddensupermarkets?<div className="col-md-12 col-lg-12 mt-2">
                 <label><b>Primary Contact:</b></label>
				<input type='text' className="form-control" value={this.state.object.primarycontact} onChange={this.changeInput.bind(this,'primarycontact')} />
				
                </div>:''}

{!hiddensupermarkets?
                <div className="col-md-4 col-lg-4 mt-2">
                 <label><b>Email:</b></label>
			    <input type='text' className="form-control" value={this.state.object.username} onChange={this.changeInput.bind(this,'username')} />
                </div>
:''}

{!hiddensupermarkets?
                <div className="col-md-8 col-lg-8 mt-2">
                 <label><b>Password:</b></label>
				<input type='text' className="form-control" value={this.state.object.normalpwd} onChange={this.changeInput.bind(this,'normalpwd')} />
                </div>

 :''}              

               
               <div className="col-md-10 col-lg-10 mt-2 text-right pt-5">
				<button type="button" onClick={this.savesupermarket} className="btn btn-danger">Save</button>
				</div>

                </div>:''}

                




			</div>
			);
	}
})
