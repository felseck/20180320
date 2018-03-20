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
			businesstypes:[],
			render:true,
			documentstypes:[],
			selecteddocuments:[],
			uploaderdisplay:'none',
			businesstype:{}
		}
	},

	componentDidMount(){
		this.getBusinessTypes();
		this.getDocumentsTypes();
	},

	onRowClick:function(row){
		global.businesstypeid= row.id;
		this.getBusinessDocumentsTypes();

	},

	



	selectRowProp: {
		mode: 'radio',
		bgColor: '#F2FFA8', 
		hideSelectColumn: true,  
		clickToSelect: true 
	},

	selectDocument:function(this_){

		var documents = [];
		this_.map(function(document_,index){

			documents.push(document_.value);

		});
		
		

		this.setState({selecteddocuments:documents});

	},

	onAfterInsertRow:function(row){
		delete row.id;
	},

	onAddRow:function(row){
		delete row.id;
		this.addBusinessType(row);
		
	},


	deleteFormat:function(cell, row, enumObject, index) {
		row.index = index;
		row.options = {singularstate:'businesstypes', pluralstate:'businesstype', object:'Business', controller:'BusinessTypesController',method:'deletebusiness'};
		return (
			
			<button className="btn btn-danger" onClick={this.deleteRow.bind(this,row)}>
			<i className="fa fa-trash mr-1 ml-2" aria-hidden="true"></i>
			</button>
			
			)
		},


	render() {


		var options = {
			onRowClick: this.onRowClick,
			afterInsertRow: this.onAfterInsertRow,
			ignoreEditable: true,
			onAddRow: this.onAddRow
		};

     //  var lang = _GlobalData.language;

			var businesstypes = this.state.businesstypes;
			var businesstypeslength = businesstypes.length; 
			var documentstypes = this.state.documentstypes;
			return (
				<div>

				<h1>Business Types </h1>

				<BootstrapTable insertRow={ true } data={businesstypes}  striped hover  options={options} version='4' selectRow={this.selectRowProp } pagination>

				<TableHeaderColumn isKey dataField='id' hidden hiddenOnInsert>ID</TableHeaderColumn>
				<TableHeaderColumn dataField='name'  filter={ { type: 'TextFilter', delay: 100 }} >Name</TableHeaderColumn>
				<TableHeaderColumn dataField='description' filter={ { type: 'TextFilter', delay: 100 }} >Description</TableHeaderColumn>

                <TableHeaderColumn dataField='name_es' filter={ { type: 'TextFilter', delay: 100 }} >Spanish Name</TableHeaderColumn>
			    <TableHeaderColumn dataField='description_es'  filter={ { type: 'TextFilter', delay: 100 }} >Spanish Description</TableHeaderColumn>

                <TableHeaderColumn dataField='button'  width="100" dataFormat={this.deleteFormat} hiddenOnInsert></TableHeaderColumn>
			
				</BootstrapTable>

				{global.businesstypeid?<div>
				<hr/>

				<h2>Documents</h2>
				<Select placeholder='Documents'  multi onChange={this.selectDocument} value={this.state.selecteddocuments} options={documentstypes} ></Select>

              <br/>

             

				<div className="text-right mt-3">
				<button type="button" onClick={this.saveBusinessDocuments} className="btn btn-danger">Save</button>
				</div>

                </div>:''}


				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/><br/><br/>

				</div>
				);
			}
		})
