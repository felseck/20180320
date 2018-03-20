import React from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Ajax from '../mixins/mixin.ajax_1_1'
import Link from '../navs/nav.link'
import Others from '../mixins/mixin.others_1_1'

export default React.createClass({
	mixins:[Ajax,Others],
	getInitialState(){
		return {
			controller:'userspayments',
			objecttext:'Buyers Payments',
			objects:[],
			render:true,
			object:{},
			row:{},
			selectedobjects:[],
			rowselected:false,
		}
	},

	componentDidMount(){
		var options = {
			method:'allbuyerspayments',
		};

		this.gets(options);
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
			insertText: 'NUEVO',
			deleteText: 'Eliminar',
			sizePerPageList: [20],
			insertModalHeader: this.createCustomModalHeader,
			insertModalFooter: this.createCustomModalFooter
		};

		var objects = this.state.objects;
		var object = this.state.object;

		var display = 'none';


		return (
			<div className="pt-5 pb-5">
			<h1 className="text-center">{this.state.objecttext}</h1>

			<BootstrapTable data={objects} exportCSV={ false } insertRow={ false } striped hover  options={options} version='4' selectRow={selectRowProp } pagination>

			<TableHeaderColumn isKey dataField='id' hidden hiddenOnInsert>ID</TableHeaderColumn>
			<TableHeaderColumn dataField='name' filter={ { type: 'TextFilter', delay: 100 }} >Buyer</TableHeaderColumn>
			<TableHeaderColumn dataField='username' filter={ { type: 'TextFilter', delay: 100 }} >Email</TableHeaderColumn>
			<TableHeaderColumn dataField='amount'  filter={ { type: 'TextFilter', delay: 100 }}>Amount</TableHeaderColumn>
			<TableHeaderColumn dataField='concept'  filter={ { type: 'TextFilter', delay: 100 }}>Concept</TableHeaderColumn>
			<TableHeaderColumn dataField='company'  filter={ { type: 'TextFilter', delay: 100 }}>Company</TableHeaderColumn>
			<TableHeaderColumn dataField='date'  filter={ { type: 'TextFilter', delay: 100 }}>Date</TableHeaderColumn>

			</BootstrapTable>


			</div>
			);
	}
})
