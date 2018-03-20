var redirect = require('react-router').browserHistory;
var ajax = {

	uploadConflictFormFile:function(conflictform_, this_){

		console.log('conflictform_ files');

		var files = $(this_.target)[0].files;
		var formData = new FormData();
		formData.append('file', files[0]);

		

		if(conflictform_.isnotonline) {

			//conflictform_.id es igual a bussinestypeid
			$('.conflictformuploading_bussiness'+conflictform_.id).show();
            
            formData.append('userid', global.userid);
            formData.append('businesstypeid', conflictform_.id);
		}
		else	{

			    formData.append('id', conflictform_.id);
				$('.conflictformuploading'+conflictform_.id).show();
			}

		$.ajax({
			url: _GlobalData.apiURL+'buyersconflictforms/upload',
			dataType: "JSON",
			method:'POST',
			data:formData,
			contentType: false,      
			cache: false,           
			processData:false,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					if(conflictform_.isnotonline) $('.conflictformuploading_bussiness'+conflictform_.id).hide();
					this.props.onSuccess();

				}else{
					alert(JSONResponse.errormessage)
				}


			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});

	},

	conflictFormDelete:function(conflictform_){

		if(!confirm('Are yoy sure you want to delete this File')) return;

		var data = {id:conflictform_.id};
		$.ajax({
			url: _GlobalData.apiURL+'buyersconflictforms/delete',
			dataType: "json",
			method:'POST',
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					this.props.onDelete();
				}else{
					alert(JSONResponse.errormessage)
				}


			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});

	},

	getBuyerConflictForm:function(){

		var data = {id:global.buyerconflictformid};
		$.ajax({
			url: _GlobalData.apiURL+'buyersconflictforms/single',
			dataType: "json",
			method:'GET',
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					var conflictformkeys = Object.keys(JSONResponse.data);
					var conflictformvalues = Object.values(JSONResponse.data);
					conflictformvalues.map(function(conflict, index){
						if(conflict == null) {
							console.log(conflictformkeys[index]);
							delete JSONResponse.data[conflictformkeys[index]];
						}
					});

					this.state.conflictform = JSONResponse.data;


					this.forceUpdate();
					
				}else{
					alert(JSONResponse.errormessage)
				}


			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});

	},

	saveBuyerConflictForm:function(){

		this.state.sending = true;
		this.forceUpdate();

		var data = this.state.conflictform;
		data.userid = global.userid;
		data.businesstypeid = global.businesstypeid;

		var action = "createconflictform";

		if(global.buyerconflictformid){
			action = "edit";
			data.id = global.buyerconflictformid;
		}

		$.ajax({
			url: _GlobalData.apiURL+'buyersconflictforms/'+action,
			dataType: "json",
			method:'POST',
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					//alert('SAv');
					if(!global.buyerconflictformid) this.state.conflictform = {};
					this.props.onSuccess();
					
				}else{
					alert(JSONResponse.errormessage)
				}

				this.state.sending = false;
				this.forceUpdate();

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},
	
	deleteFile_:function(row) {
		if(!confirm('Are you sure you want to delete this '+row.options.object+'?')) return;


		var data = row;

		$.ajax({
			url: _GlobalData.apiURL+row.options.controller+'/'+row.options.method,
			dataType: "json",
			method:'POST',
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					this.state[row.options.pluralstate].filename = '';
					this.state[row.options.pluralstate].fullfilename = '';
					this.state[row.options.pluralstate].fileuniqueid = '';
					//alert(JSONResponse.successmessage);
					this.forceUpdate();
					
				}else{alert(JSONResponse.errormessage);}

			}.bind(this),
			error:function(error,data){
				alert('Has ocurred an error, try again or contact to support.');
			}
		});

	},


	deleteRow:function(row) {
		if(!confirm('Are you sure you want to delete this '+row.options.object+'?')) return;


		var data = {id:row.id};

		$.ajax({
			url: _GlobalData.apiURL+'delete/'+row.options.controller+'/'+row.options.method,
			dataType: "json",
			method:'POST',
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					this.state[row.options.singularstate].splice(row.index,1);
					this.state[row.options.pluralstate] = {};
					this.forceUpdate();
					
				}else{alert(JSONResponse.errormessage);}

			}.bind(this),
			error:function(error,data){
				alert('Has ocurred an error, try again or contact to support.');
			}
		});

	},


	deleteUser:function(row) {
		if(!confirm('Are you sure you want to delete this user?')) return;


		var data = {id:row.id};

		$.ajax({
			url: _GlobalData.apiURL+'deleteuser',
			dataType: "json",
			method:'POST',
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					this.state.users.splice(row.index,1);
					this.state.user = {};
					this.forceUpdate();
					
				}else{alert('Has ocurred an error, try again or contact to support.');}

			}.bind(this),
			error:function(error,data){
				alert('Has ocurred an error, try again or contact to support.');
			}
		});

	},

	deleteFile:function(fileinfo){

		if(!confirm('Are you sure you want to delete this file?')) return;

		var data = {id:fileinfo.id,fullfilename:fileinfo.fullfilename};

		$.ajax({
			url: _GlobalData.apiURL+'deletefile',
			dataType: "json",
			method:'POST',
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					if(this.props.onChart) this.props.onChart(true);
					this.forceUpdate();
					
				}else{alert('Has ocurred an error, try again or contact to support.');}

			}.bind(this),
			error:function(error,data){
				alert('Has ocurred an error, try again or contact to support.');
			}
		});

	},

	updateBusinessAprovedFile:function(index){

		var data = {expiredate:this.state.businessfiles[index].expiredate, id:this.state.businessfiles[index].id,rejected:0,aproved:-1,rejectedreason:this.state.businessfiles[index].rejectedreason};

		$.ajax({
			url: _GlobalData.apiURL+'updatefile',
			dataType: "json",
			method:'POST',
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){

					var businessfile = this.state.businessfiles[index];
					this.state.businessfiles[index].rejected = 0;
					this.state.businessfiles[index].aproved = -1;
					this.forceUpdate();
					$("#aprovedfilemodal"+businessfile.businesstypeid+businessfile.documenttypeid+index).modal('hide');

				}else{alert('Has ocurred an error, try again or contact to support.');}

			}.bind(this),
			error:function(error,data){
				alert('Has ocurred an error, try again or contact to support.');
			}
		});

	},


	updateBusinessRejectedFile:function(index){

		var data = {id:this.state.businessfiles[index].id,rejected:-1,aproved:0,rejectedreason:this.state.businessfiles[index].rejectedreason};

		$.ajax({
			url: _GlobalData.apiURL+'updatefile',
			dataType: "json",
			method:'POST',
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){

					var businessfile = this.state.businessfiles[index];
					this.state.businessfiles[index].rejected = -1;
					this.state.businessfiles[index].aproved = 0;
					this.forceUpdate();
					
					$("#rejectedfilemodal"+businessfile.businesstypeid+businessfile.documenttypeid+index).modal('hide');

				}else{alert('Has ocurred an error, try again or contact to support.');}

			}.bind(this),
			error:function(error,data){
				alert('Has ocurred an error, try again or contact to support.');
			}
		});

	},

	
	addDocumentType:function(row_){

		$.ajax({
			url: _GlobalData.apiURL+'documenttype',
			dataType: "json",
			method:'POST',
			data:row_,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					this.state.documentstypes.unshift(JSONResponse.data);
					this.setState({documentstypes:this.state.documentstypes});
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	}, 

	addUser:function(row_){

		$.ajax({
			url: _GlobalData.apiURL+'user',
			dataType: "json",
			method:'POST',
			data:row_,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					this.state.users.unshift(JSONResponse.data);
					this.forceUpdate();
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	addBuyer:function(row_){

		$.ajax({
			url: _GlobalData.apiURL+'buyers/addbuyer',
			dataType: "json",
			method:'POST',
			data:row_,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					this.state.buyers.unshift(JSONResponse.data);
					this.forceUpdate();
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	addAdmin:function(row_){

		$.ajax({
			url: _GlobalData.apiURL+'admin',
			dataType: "json",
			method:'POST',
			data:row_,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					this.state.admins.unshift(JSONResponse.data);
					this.forceUpdate();
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	addBusinessType:function(row_){

		$.ajax({
			url: _GlobalData.apiURL+'businesstype',
			dataType: "json",
			method:'POST',
			data:row_,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					this.state.businesstypes.unshift(JSONResponse.data);
					this.setState({businesstypes:this.state.businesstypes});
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	saveUser:function(options_){

		var data = this.state.user;
		if(data.password && data.password == '') delete data.password;
		data.userbusinesstypes = this.state.userbusinesstypes;
		data.usersupermarkets = this.state.usersupermarkets;
		data.userbusinessdocumentstypes = this.state.userbusinessdocumentstypes;

		if(options_){

			if(options_.data) data = options_.data;
		}

		$.ajax({
			url: _GlobalData.apiURL+'saveuser',
			dataType: "json",
			method:'POST',
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){

					if(options_){
						if(options_.callback) options_.callback();
					}else
                       alert('User saved');
					//this.state.admins.unshift(JSONResponse.data);
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	saveDocumentType:function(){

		var data = this.state.documenttype;
		$.ajax({
			url: _GlobalData.apiURL+'savedocumenttype',
			dataType: "json",
			method:'POST',
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					alert('Document saved');
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},


	saveBuyer:function(){

		var data = this.state.buyer;
		if(data.password && data.password == '') delete data.password;
		data.usersids = this.state.selectedusers;

		$.ajax({
			url: _GlobalData.apiURL+'buyers/savebuyer',
			dataType: "json",
			method:'POST',
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					alert('Buyer saved');
					//this.state.buyers.unshift(JSONResponse.data);
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	saveAdmin:function(){

		var data = this.state.admin;
		if(data.password && data.password == '') delete data.password;
		data.usersids = this.state.selectedusers;

		$.ajax({
			url: _GlobalData.apiURL+'saveadmin',
			dataType: "json",
			method:'POST',
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					alert('Admin saved');
					//this.state.admins.unshift(JSONResponse.data);
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	saveBusinessDocuments:function(){

		$.ajax({
			url: _GlobalData.apiURL+'businessdocumentstypes',
			dataType: "json",
			method:'POST',
			data:{businesstypeid:global.businesstypeid, documentstypeids:this.state.selecteddocuments},
			success: function(JSONResponse) {

				if (JSONResponse.result){
					alert('Document saved');
					//this.setState({selecteddocuments:JSONResponse.data});
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},


	getBusinessDocumentsTypes:function(){

		$.ajax({
			url: _GlobalData.apiURL+'businessdocumentstypes',
			dataType: "json",
			data:{businesstypeid:global.businesstypeid},
			success: function(JSONResponse) {

				if (JSONResponse.result){

					this.setState({selecteddocuments:JSONResponse.data,businesstype:JSONResponse.businessinfo
					});
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	getDocumentsTypes:function(byfile_){

		var data = {};
		if(byfile_) data.byfile = true;

		if(global.userid) data.userid = global.userid;

		$.ajax({
			url: _GlobalData.apiURL+'documentstypes',
			dataType: "json",
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){

					this.setState({documentstypes:JSONResponse.data});
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	getUser:function(){

		$.ajax({
			url: _GlobalData.apiURL+'user',
			dataType: "json",
			data:{id:global.userid},
			success: function(JSONResponse) {

				if (JSONResponse.result){

					var bussinestypesselected = [];
					this.state.businesstypes.map(function(businesstype,index){
						if(JSONResponse.BusinessTypes.indexOf(businesstype.id) != -1)  {
							bussinestypesselected.push(businesstype);
							this.state.userbusinessdocumentstypes[businesstype.id] = {documentstypes:JSONResponse.businessdocumentstypes[businesstype.id]?JSONResponse.businessdocumentstypes[businesstype.id]['documentstypes'] || []:[]};
						}
					}.bind(this));

					this.setState({user:JSONResponse.data,userbusinesstypes:JSONResponse.BusinessTypes,usersupermarkets:JSONResponse.usersupermarkets,bussinestypesselected:bussinestypesselected
					});
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	getDocumentType:function(){

		$.ajax({
			url: _GlobalData.apiURL+'documenttype',
			dataType: "json",
			data:{id:global.documenttypeid},
			success: function(JSONResponse) {

				if (JSONResponse.result){

					this.setState({documenttype:JSONResponse.data});
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	getBuyer:function(){

		$.ajax({
			url: _GlobalData.apiURL+'buyers/buyerusers',
			dataType: "json",
			data:{id:global.buyerid},
			success: function(JSONResponse) {

				if (JSONResponse.result){

					this.setState({selectedusers:JSONResponse.users,buyer:JSONResponse.data});
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	getAdmin:function(){

		$.ajax({
			url: _GlobalData.apiURL+'admin',
			dataType: "json",
			data:{id:global.adminid},
			success: function(JSONResponse) {

				if (JSONResponse.result){

					this.setState({selectedusers:JSONResponse.users,admin:JSONResponse.data});
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},


	getBusinessTypes:function(){

		$.ajax({
			url: _GlobalData.apiURL+'businesstypes',
			dataType: "json",
			data:{},
			success: function(JSONResponse) {

				if (JSONResponse.result){

					this.setState({businesstypes:JSONResponse.data});
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	getBuyers:function(){

		$.ajax({
			url: _GlobalData.apiURL+'buyers/all',
			dataType: "json",
			data:{page:0,limit:100000},
			success: function(JSONResponse) {

				if (JSONResponse.result){

					this.setState({buyers:JSONResponse.data.subset});
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},


	getAdmins:function(){

		$.ajax({
			url: _GlobalData.apiURL+'admins',
			dataType: "json",
			data:{},
			success: function(JSONResponse) {

				if (JSONResponse.result){

					this.setState({admins:JSONResponse.data});
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	getUsers:function(method_){
		var method = method_?method_:'users';

		$.ajax({
			url: _GlobalData.apiURL+method,
			dataType: "json",
			data:{},
			success: function(JSONResponse) {

				if (JSONResponse.result){

					this.setState({users:JSONResponse.data});
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	getUserBusinessFiles:function(calback_){

		var data = {businesstypeid:this.props.businesstypeid};
		if(global.userid) data.userid = global.userid;

		$.ajax({
			url: _GlobalData.apiURL+'userbusinessfiles',
			dataType: "json",
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){

					

					this.setState({businessfiles:JSONResponse.data},function(){
						if(calback_) calback_();
					});
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	getBusinessConflictForms:function(){
		var data = {};
		if(global.userid) data.userid = global.userid;
		if(this.props.businesstype.id) data.businesstypeid = this.props.businesstype.id;

		$.ajax({
			url: _GlobalData.apiURL+'buyersconflictforms/getbusinnesconflictforms',
			dataType: "json",
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){

					this.setState({bussinessconflictforms:JSONResponse.data},function(){
						$('.conflictformuploading').hide();
					});
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	getBuyerConflictForms:function(){
		var data = {};
		if(global.buyerid) data.buyerid = global.buyerid;

		$.ajax({
			url: _GlobalData.apiURL+'buyersconflictforms/getbuyerconflictforms',
			dataType: "json",
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){

					this.setState({buyerconflictforms:JSONResponse.data});
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},


	getUserBusinessTypes:function(){
		var data = {};
		if(global.userid) data.userid = global.userid;

		$.ajax({
			url: _GlobalData.apiURL+'userbusinesstypes',
			dataType: "json",
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){

					this.setState({businesstypes:JSONResponse.data});
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	simpleUploadFiles:function(formData_, filename_){

		var params = formData_;
		this.state.uploaderdisplay = 'block';
		this.forceUpdate();

		this.postMain({apiobject:'simpleupload',params:params, callback:function(data){

			console.log('subido');
			this.state.uploaderdisplay = 'none';
			this.state.documenttype.filename = data.filename;
			this.state.documenttype.fullfilename = data.fullfilename;
			this.state.documenttype.fileuniqueid = data.fileuniqueid;
			this.forceUpdate();

		}.bind(this) });



	},

	uploadFiles:function(formData_, filename_){

		var params = formData_;
		if(global.userid) params.append('userid', global.userid);

		this.state.uploaderdisplay = 'block';
		this.forceUpdate();

		this.postMain({apiobject:'uploadfile',params:params, callback:function(){

			this.state.uploaderdisplay = 'none';
			this.state.addedfiles.push(filename_);
			if(this.props.onChart){
				global.totaluploaded = global.totaluploaded+1;
				this.props.onChart(true);
			}
			this.forceUpdate();

		}.bind(this) });



	},

	postMain:function(options_) {

		$.ajax({
			url: _GlobalData.apiURL+options_.apiobject+'/create',
			dataType: "json",
			method:'POST',
			contentType: false,      
			cache: false,           
			processData:false,
			data:options_.params,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					//_GlobalData.ajaxmessages.type = 'success';
					//_GlobalData.ajaxmessages.success = JSONResponse.successmessage;

					if(options_.callback) options_.callback(JSONResponse.data);

				/*	this.setState({render:true},function(){
                         // $('#SuccessMessageModal').modal();
                     });*/




                 }else{
                 	_GlobalData.ajaxmessages.type = 'error';
                 	_GlobalData.ajaxmessages.error = JSONResponse.successmessage;
                 }

             }.bind(this),
             error:function(error,data){
             	alert('A communication error has occurred');
             }
         });

	},


	getMain:function(options_){


		$.ajax({
			url: _GlobalData.apiURL+options_.apiobject+'/get',
			dataType: "json",
			success: function(JSONResponse) {

				if (JSONResponse.result){
					_GlobalData[options_.object] = JSONResponse.data.docs;
					if(options_.this) options_.this.setState({render:true}); 

					if(options_.callback) options_.callback(JSONResponse.data.docs);

				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},

	

	createDoc:function() {

		var params = this.state.FormInfo;
		var apiUrl =  this.props.apiUrl.create;

		$.ajax({
			url: _GlobalData.apiURL+apiUrl,
			dataType: "json",
			data:params,
			method:"POST",
			success: function(JSONResponse) {

				if (JSONResponse.result){

					//var grid = eval('this.grid_'+this.props.location.pathname.replace(/\//gi,'')+'()');

  	               // var docs = grid.docs;

  	               // docs.unshift(JSONResponse.data); //push doc to docs

  	               // if(this.props.createdDoc) this.props.createdDoc();

  	               this.setState({render:true});
  	           }

  	       }.bind(this),
  	       error:function(error,data){
  	       	alert('A communication error has occurred');
  	       }
  	   });

	},

	saveDoc:function() {

		var params = this.state.FormInfo;
		var apiUrl =  this.props.apiUrl.edit;


		$.ajax({
			url: _GlobalData.apiURL+apiUrl+'/'+this.props.doc._id,
			dataType: "json",
			data:params,
			method:"PUT",
			success: function(JSONResponse) {

				if (JSONResponse.result){
                   // var grid = eval('this.grid_'+this.props.location.pathname.replace(/\//gi,'')+'()');

  	               // var docs = grid.docs;

                    //    docs[this.state.selectedRowIndex] = $.extend(docs[this.props.selectedRowIndex],params);
  	                //if(this.props.savedDoc) this.props.savedDoc();

  	                this.setState({render:true});
  	            }

  	        }.bind(this),
  	        error:function(error,data){
  	        	alert('A communication error has occurred');
  	        }
  	    });

	},




	

	getUserProfile:function(params_){


		$.ajax({
			url: _GlobalData.apiURL+'user/get/userauth',
			dataType: "json",
			data:params_,
			success: function(JSONResponse) {

				if (JSONResponse.result){

					var formConfig = this.state.formConfig;
					formConfig.doc = JSONResponse.data;
					this.setState({formConfig:formConfig});
				}

			}.bind(this),
			error:function(error,data){
				alert('A communication error has occurred');
			}
		});


	},


	
/*

   getSituationsStatus:function(){
   	this.getMain({apiobject:'situationsstatus',object:'SituationsStatus',this:this});
   },

   
  
   getCompanies:function(createCompanyPage_){

   	var options = {
   		apiobject:'companies',
   		object:'Companies',
   		
   	}

   	if(createCompanyPage_) options.callback = function(docs_){

   		if(docs_.length > 0) redirect.push('postjob');
   		else this.setState({companies:docs_},function(){

   		});
   			

   	}.bind(this)

   	else options.this = this;


   	this.getMain(options);
   },
   */

}


export default ajax;
