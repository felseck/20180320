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
			controller:'buyersgroups',   //Es el nombre del controlador o tabla de la db
			objecttext:'buyer group',    //Este texto es el texto que aprece el el alert cuando se elimina una fila
			objects:[],                  //Este contendra la lista completa de llos buyers groups
			render:true,
			object:{},                   //este contendra la informacion de la fila seleccionada
			row:{},                      //tambieneste contendra la informacion de la fila seleccionada 
			rowselected:false,           //nos inidica si una fila esta selleccionada
		}
	},

	componentDidMount(){
		this.gets();   // este metodo nos obtiene la informacion del controlador definido en controller:'buyersgroups',

	},

	


	render() {

		var selectRowProp = {        //Son opciones del modulo react-bootstrap-table
			mode: 'radio',
			bgColor: '#F2FFA8', 
			hideSelectColumn: true,  
			clickToSelect: true,

		}
 
		var options = {             //Son opciones del modulo react-bootstrap-table
			onRowClick: this.onRowClick,
			ignoreEditable: true,
			onAddRow: this.onAddRow,
			handleConfirmDeleteRow: this.customConfirm,
			//exportCSVText: 'EXPORTAR EXCEL',
			//insertText: 'NUEVO',
			deleteText: 'Eliminar',
			sizePerPageList: [20],
			//insertModalHeader: this.createCustomModalHeader,
			//insertModalFooter: this.createCustomModalFooter
		};

		var objects = this.state.objects;   //aqui obtenemos la info del controlador  definido en getInitialState()  con el estado objects:[],  
		var object = this.state.object;     //aqui obtenemos la info de la fila seleccionada  definido en getInitialState()  con el estado object:{},  este ya contendra name,description, etc.

       

        //aqui definomos todo el html
		return (  
			<div className="pt-5 pb-5">
			<h1 className="text-center">Buyers Groups</h1>

			<BootstrapTable data={objects} exportCSV={false } insertRow={ true } striped hover  options={options} version='4' selectRow={selectRowProp } pagination>

			<TableHeaderColumn isKey dataField='id' hidden hiddenOnInsert>ID</TableHeaderColumn>

			<TableHeaderColumn  dataField='name' filter={ { type: 'TextFilter', delay: 100 }} >Name</TableHeaderColumn>
			
	
			<TableHeaderColumn   dataField='description' filter={ { type: 'TextFilter', delay: 100 }} >Description</TableHeaderColumn>
          
            
	        <TableHeaderColumn width="50"   dataFormat={this.buttonDelete} hiddenOnInsert></TableHeaderColumn>

			</BootstrapTable>

			{this.state.object.id? <div className="row mb-5">

         
            

                <div className="col-md-12 col-lg-12 mt-2">
                 <label><b>Name:</b></label>
				<input type='text' className="form-control" value={this.state.object.name} onChange={this.changeInput.bind(this,'name')} />
				
                </div>



                <div className="col-md-12 col-lg-12 mt-2">
                 <label><b>Description:</b></label>
				<textarea  className="form-control"  value={this.state.object.description} onChange={this.changeInput.bind(this,'description')} ></textarea>
				
                </div>


               
               <div className="col-md-10 col-lg-10 mt-2 text-right pt-5">
				<button type="button" onClick={this.put} className="btn btn-danger">Save</button>
				</div>

                </div>:''}

                




			</div>
			);
	}
})
