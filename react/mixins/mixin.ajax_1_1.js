var redirect = require('react-router').browserHistory;
var ajax = {

	alert:function(JSONResponse) {
		if(!JSONResponse.errorcode) JSONResponse.errorcode = 0;
		if(JSONResponse.errorcode == 101) location.reload();
		else alert(JSONResponse.errormessage);
	},

	gets_:function(options_, pagination_) {

		var controller = options_?options_.table:this.state.table;
		controller = controller+'/allitems';



		var data = pagination_?pagination_:{page:0,limit:100000};
		$.ajax({
			url: _GlobalData.apiURL+controller,
			dataType: "json",
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){

					if(options_) this.state[options_.table] = JSONResponse.data.subset;
					else this.state.objects = JSONResponse.data.subset;
					this.forceUpdate();
					
				}else this.alert(JSONResponse);

			}.bind(this),
			error:function(error,data){
				alert('Ha ocurrido un error...');
			}
		});

	},


	gets:function(options_) {

		var controller = this.state.controller;
		var method = 'all';

		var data = {};

		if(options_){
			data.limit = options_.limit?options_.limit:10000000000;
			data.page = options_.page?options_.page:0;;

			if(options_.controller){
				controller = options_.controller;
			}

			if(options_.query){
				data.query = options_.query;
			}

			if(options_.method){
				method = options_.method == 'empty'?'':options_.method;
			}

		}else{
			data.page = 0;
			data.limit = 10000000;
		}

		
		controller = controller+'/'+method;

		$.ajax({
			url: _GlobalData.apiURL+controller,
			dataType: "json",
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){

					if(options_) {
						if(options_.controller) this.state[options_.controller] = JSONResponse.data.subset;
						else this.state.objects = JSONResponse.data.subset;
					}
					else this.state.objects = JSONResponse.data.subset;

					this.state.objectsresult = JSONResponse.data;

					this.forceUpdate();
					
				}else this.alert(JSONResponse);

			}.bind(this),
			error:function(error,data){
				alert('Ha ocurrido un error...');
			}
		});

	},

	get:function() {
		var controller = this.state.controller+'/single';
		var data = this.state.row?this.state.row:this.state.object;
		$.ajax({
			url: _GlobalData.apiURL+controller,
			dataType: "json",
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					this.state.object = JSONResponse.data;
					this.forceUpdate();
					
				}else this.alert(JSONResponse);

			}.bind(this),
			error:function(error,data){
				alert('Ha ocurrido un error...');
			}
		});

	},

	post:function(options_) {
		var controller = this.state.controller;
		var method = 'create';

		var data = this.state.row?this.state.row:this.state.object;

		if(options_){
			controller = options_.controller?options_.controller:controller;
			method = options_.method?options_.method:method;

			if(options_.sending){
				this.state.sending = true;
				this.forceUpdate();
			}

			if(options_.userid) data.userid = options_.userid;
		}

		var pathurl = controller+'/'+method;
		
		$.ajax({
			url: _GlobalData.apiURL+pathurl,
			dataType: "json",
			method:'POST',
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){
					
					this.state.objects.unshift(JSONResponse.data);
					this.state.rowselected= false;

					if(options_){
						if(options_.callback) options_.callback();
						if(options_.sending) this.state.sending = false;
					}

					this.forceUpdate();
					
				}else this.alert(JSONResponse);

			}.bind(this),
			error:function(error,data){
				alert('Ha ocurrido un error...');
			}
		});

	},

	

	put:function(options_) {

		var controller = this.state.controller;
		var method = 'edit';
		var data = this.state.object;

		if(options_) {
			
			if(options_.sending){
				this.state.sending = true;
				this.forceUpdate();
			}
			
			controller = options_.controller?options_.controller:controller;
			method = options_.method?options_.method:method;
		};

		var url = _GlobalData.apiURL+controller+'/'+method;

		$.ajax({
			url: url,
			dataType: "json",
			method:'POST',
			data:data,
			success: function(JSONResponse) {

				if (JSONResponse.result){

					var index = this.state.objects.map(function(o,index){
						if(o.id == data.id) this.state.objects[index] = data;
					}.bind(this));
					

					this.state.rowselected= false;
					

					if(options_){
						if(options_.callback) options_.callback();
						if(options_.sending) this.state.sending = false;
					}

					this.forceUpdate();
					alert(JSONResponse.successmessage);
					
				}else this.alert(JSONResponse);

			}.bind(this),
			error:function(error,data){
				alert('Ha ocurrido un error...');
			}
		});

	},


	delete:function(options_, e) {
		e.stopPropagation();

    	//if(!this.state.rowselected) {alert('Para eliminar selecciona un '+this.state.objecttext ); return;}

    	if(!confirm('Are you sure you want to delete this '+(this.state.objecttext?this.state.objecttext:options_?options_.objectname:'')+'?')) return;


    	var controller = '';
    	if(this.state.controller) controller = this.state.controller;
    	var method = 'delete';


    	var data = {};

    	if(options_){
    		controller = options_.controller?options_.controller:controller;
    		method = options_.method?options_.method:method;
    		data.id = options_.id;
    	}

    	var pathurl = controller+'/'+method;

    	if(!data.id) return;


    	$.ajax({
    		url: _GlobalData.apiURL+pathurl,
    		dataType: "json",
    		method:'POST',
    		data:data,
    		success: function(JSONResponse) {

    			if (JSONResponse.result){

    				if(this.state.objects) {
    					this.state.objects.map(function(o,index){
    						if(o.id == data.id) this.state.objects.splice(index,1);
    					}.bind(this));
    				}


					//this.state.rowselected= false;
					if(this.state.object) this.state.object = {};
					//if(this.state.objects.length>0) next();

					if(options_){
						if(options_.callback) options_.callback();
					}

					this.forceUpdate();

				}else this.alert(JSONResponse);

			}.bind(this),
			error:function(error,data){
				alert('Ha ocurrido un error...');
			}
		});

    },


}


export default ajax;
