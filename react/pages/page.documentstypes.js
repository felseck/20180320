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
			documentstypes:[],
			uploaderdisplay:'none',
			documenttype:{}
		}
	},

	componentDidMount(){
		this.getDocumentsTypes();
	},

	onRowClick:function(row){
		global.documenttypeid = row.id;
		this.getDocumentType(); 
	},

	



	selectRowProp: {
		mode: 'radio',
		bgColor: '#F2FFA8', 
		hideSelectColumn: true,  
		clickToSelect: true 
	},

	

	onAfterInsertRow:function(row){
		delete row.id;
		this.addBusinessType(row);
		//this.state.businesstypes.push(row);
	},

	onAddRow:function(row){
		console.log('on addrow');
		console.log(row)
		delete row.id;
		this.addDocumentType(row);
		
	},

	changeInput:function(name,this_){
        this.state.documenttype[name] = this_.target.value;
        this.forceUpdate();
	},

	onChangeFile:function(this_){

		var files = $(this_.target)[0].files;
		var formData = new FormData();
		var filename = files[0].name;
		formData.append('file', files[0]);
		formData.append('documenttypeid', global.documenttypeid);
		this.simpleUploadFiles(formData,filename);

	},

	deleteFormat:function(cell, row, enumObject, index) {
		row.index = index;
		row.options = {singularstate:'documentstypes', pluralstate:'documenttype', object:'Document', controller:'DocumentsTypesController',method:'deletedocument'};
		return (
			
			<button className="btn btn-danger" onClick={this.deleteRow.bind(this,row)}>
			<i className="fa fa-trash mr-1 ml-2" aria-hidden="true"></i>
			</button>
			
			)
		},

		onDeleteFile:function(row) {
		row.options = {singularstate:'documentstypes', pluralstate:'documenttype', object:'File', controller:'DocumentsTypesController',method:'deletefile'};
		this.deleteFile_(row);
		},


	render() {


		var options = {
			onRowClick: this.onRowClick,
			afterInsertRow: this.onAfterInsertRow,
			ignoreEditable: true,
			onAddRow: this.onAddRow
		};

	
			//$(".react-bs-table-insert-modal input[placeholder='ID']").attr('disabled','disabled').val(businesstypeslength+1);




		var documentstypes = this.state.documentstypes;
		return (
			<div>

			<h1>Documents Types </h1>

			<BootstrapTable insertRow={ true } data={documentstypes}  striped hover  options={options} version='4' selectRow={this.selectRowProp } pagination>

			<TableHeaderColumn isKey dataField='id' hidden hiddenOnInsert>ID</TableHeaderColumn>
			<TableHeaderColumn dataField='name' filter={ { type: 'TextFilter', delay: 100 }} >Name</TableHeaderColumn>
			<TableHeaderColumn dataField='description'  filter={ { type: 'TextFilter', delay: 100 }} >Description</TableHeaderColumn>

			<TableHeaderColumn dataField='name_es' filter={ { type: 'TextFilter', delay: 100 }} >Spanish Name</TableHeaderColumn>
			<TableHeaderColumn dataField='description_es'  filter={ { type: 'TextFilter', delay: 100 }} >Spanish Description</TableHeaderColumn>

            <TableHeaderColumn dataField='button' width="100" dataFormat={this.deleteFormat} hiddenOnInsert></TableHeaderColumn>
			</BootstrapTable>

		
{global.documenttypeid?<div>
      <label><b>Name:</b></label>
			<input type='text' className="form-control" value={this.state.documenttype.name} onChange={this.changeInput.bind(this,'name')} />
			 <br/>
            <label><b>Description:</b></label>
            <textarea className="form-control" value={this.state.documenttype.description} onChange={this.changeInput.bind(this,'description')}></textarea>
<br/>
 <label><b>Spanish Name:</b></label>
			<input type='text' className="form-control" value={this.state.documenttype.name_es} onChange={this.changeInput.bind(this,'name_es')} />
			 <br/>
            <label><b>Spanish Description:</b></label>
            <textarea className="form-control" value={this.state.documenttype.description_es} onChange={this.changeInput.bind(this,'description_es')}></textarea>

           <hr/>

				
                
                <div className="row align-items-center">
                <div className="col-md-1 col-lg-1">
                <h2>File</h2>
                </div>
				<div className="col-md-2 col-lg-2">
				<div className="fileUpload btn btn-primary">
				<span><i className="fa fa-upload mr-2" aria-hidden="true"> <img style={{position:'absolute',top:0,left:'8px', display:this.state.uploaderdisplay}} src="img/upload.gif"/> </i>  Upload</span>
				<input type="file" name='file1' className="upload" onChange={this.onChangeFile} />
				</div>
              </div>

 <div className="col-md-2 col-lg-2">
    {this.state.documenttype.filename?<button className="btn btn-danger" onClick={this.onDeleteFile.bind(this,this.state.documenttype)} ><i className="fa fa-trash mr-2" aria-hidden="true"></i>Delete File</button>:''}
      
				</div>

               <div className="col-md-7 col-lg-7">
				{this.state.documenttype.filename?<span><i className="fa  fa-file mr-2 text-info" aria-hidden="true"></i> {this.state.documenttype.filename}</span>:''}
				</div>

				</div>
				 <hr/>

			<div className="text-right mt-3">
				<button type="button" onClick={this.saveDocumentType} className="btn btn-danger">Save</button>
				</div>

                </div>:''}

			</div>
			);
		}
	})
