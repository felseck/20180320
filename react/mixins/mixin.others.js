
var MixinOthers = {
    
    getMonthDays:function(){
    	var loop = 31;
    	var days = [{value:'',label:'Día'}];

    	for (var i = 1; i <= loop; i++) {
            i = i.toString();
    		days.push({value:i, label:i});
    	}

    	return days;
    },

    getYears:function(){
    	var startYear = 1990;
    	var finishYear = 2017;
    	var difYear = parseInt(finishYear-startYear);

    	var years = [{value:'',label:'Año'}];

    	for (var i = startYear; i <= finishYear; i++) {
            // i = i.toString();
    		 years.push({value:i, label:i});
    	}

    	return  years;
    },

    getCookie:function(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
   },

   progressBar:function(){
    var percent = 0;
      var starProgressBar = setInterval(function(){
          percent++;
         
           $(".progress-bar").attr('style','width:'+percent+'%');
           $(".progress-bar").attr('aria-valuenow',percent);
          if(percent == 100) clearInterval(starProgressBar);

      }, 10);
   }


   


}


export default MixinOthers;
