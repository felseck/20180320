
export default {
    grid_adminjobs(){

    var config = {};

    config.docs = _GlobalData.Jobs || [];

    config.ajaxMethods = [
    'this.getJobs()',
    'this.getCategories()',
    'this.getSkills()',
    'this.getLocations()',
    'this.getTimeTypes()'
    ];

    config.apiUrl = {edit:'job/edit',create:'job/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Titulo',key:'title', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'textarea'},
    {label:'Categoria',key:'category._id', visible:false, editable:true, fieldtype:'select', dropdowndata:_GlobalData.Categories},
    {label:'Categoria',key:'category.name', visible:true, editable:false},
    {label:'Usuario',key:'user.name', visible:true, editable:false},
    {label:'Creado',key:'CreatedAt', visible:true, editable:false},
    {label:'Lugar',key:'location._id', visible:false, editable:true, fieldtype:'select', dropdowndata:_GlobalData.Locations},
    {label:'Lugar',key:'location.location', visible:true, editable:false},
    {label:'Habilidades',key:'skills', visible:false, editable:true, fieldtype:'multiselect', dropdowndata:_GlobalData.Skills},
    {label:'Tipo',key:'timetype._id', visible:false, editable:true, fieldtype:'select', dropdowndata:_GlobalData.TimeTypes},
    {label:'Tipo',key:'timetype.name', visible:true, editable:false},
   
  ];

    return config;
  },


  grid_admincategories(){

    var config = {};

    config.docs = _GlobalData.Categories || [];

    config.ajaxMethods = [
    'this.getCategories()'
    ];

    config.apiUrl = {edit:'category/edit',create:'category/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Nombre',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'textarea'}
   
  ];

    return config;
  },

  grid_adminlocations(){

    var config = {};

    config.docs = _GlobalData.Locations || [];

    config.ajaxMethods = [
    'this.getLocations()'
    ];

    config.apiUrl = {edit:'location/edit',create:'location/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Nombre',key:'location', visible:true, editable:true,fieldtype:'text'},
    {label:'Estado',key:'state', visible:true, editable:true,fieldtype:'text'},
    {label:'Pais',key:'country', visible:true, editable:true,fieldtype:'text'},
   
  ];

    return config;
  },

  grid_adminskills(){

    var config = {};

    config.docs = _GlobalData.Skills || [];

    config.ajaxMethods = [
    'this.getSkills()'
    ];

    config.apiUrl = {edit:'skill/edit',create:'skill/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Nombre',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'textarea'},
   
  ];

    return config;
  },

  grid_admintimetypes(){

    var config = {};

    config.docs = _GlobalData.TimeTypes || [];

    config.ajaxMethods = [
    'this.getTimeTypes()'
    ];

    config.apiUrl = {edit:'timetype/edit',create:'timetype/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Nombre',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'textarea'},
   
  ];

    return config;
  },


  grid_adminusers(){

    var config = {};

    config.docs = _GlobalData.Users || [];

    config.ajaxMethods = [
    'this.getUsers()'
    ];

    config.apiUrl = {edit:'user/edit',create:'user/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Nombre',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Apellido',key:'last_name', visible:true, editable:true,fieldtype:'text'},
    {label:'Email',key:'email', visible:true, editable:true,fieldtype:'text'},
   
  ];

    return config;
  },



  grid_adminnotifications(){

    var config = {};

    config.docs = _GlobalData.Notifications || [];

    config.ajaxMethods = [
    'this.getNotifications()',
    'this.getNotificationsTypes()',
    'this.getNotificationsStatus()',
    'this.getSystemEvents()',
    ];

    config.apiUrl = {edit:'notification/edit',create:'notification/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Tipo',key:'type._id', visible:false, editable:true, fieldtype:'select', dropdowndata:_GlobalData.NotificationsTypes},
    {label:'Tipo',key:'type.name', visible:true, editable:false},
    {label:'Evento',key:'event._id', visible:false, editable:true, fieldtype:'select', dropdowndata:_GlobalData.SystemEvents},
    {label:'Evento',key:'event.name', visible:true, editable:false},
    {label:'Estatus',key:'status._id', visible:false, editable:true, fieldtype:'select', dropdowndata:_GlobalData.NotificationsStatus},
    {label:'Estatus',key:'status.name', visible:true, editable:false,fieldtype:'text'},
    {label:'Recurrente',key:'recurrent', visible:true, editable:true,fieldtype:'checkbox'},
    {label:'Mensaje',key:'message', visible:true, editable:true,fieldtype:'textarea'},
    {label:'Mensaje Email',key:'emailmessage', visible:true, editable:true,fieldtype:'textarea'},
    {label:'Plantilla',key:'template', visible:true, editable:true,fieldtype:'text'},
    
   
  ];

    return config;
  },

  grid_adminnotificationstypes(){

    var config = {};

    config.docs = _GlobalData.NotificationsTypes || [];

    config.ajaxMethods = [
    'this.getNotificationsTypes()'
    ];

    config.apiUrl = {edit:'notificationtype/edit',create:'notificationtype/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Nombre',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'text'}
   
  ];

    return config;
  },


grid_adminnotificationsstatus(){

    var config = {};

    config.docs = _GlobalData.NotificationsStatus || [];

    config.ajaxMethods = [
    'this.getNotificationsStatus()'
    ];

    config.apiUrl = {edit:'notificationstatus/edit',create:'notificationstatus/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Nombre',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'text'}
   
  ];

    return config;
  },


  grid_adminnotificationsusers(){

    var config = {};

    config.docs = _GlobalData.NotificationsUsers || [];

    config.ajaxMethods = [
    'this.getNotificationsUsers()'
    ];

    config.apiUrl = {edit:'notificationuser/edit',create:'notificationuser/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Usuario',key:'user.name', visible:true, editable:false,fieldtype:'text'},
    {label:'Mensaje',key:'notification.message', visible:true, editable:false,fieldtype:'text'},
    {label:'Creado',key:'CreatedAt', visible:true, editable:false,fieldtype:'text'}
   
  ];

    return config;
  },


  grid_adminsystemevents(){

    var config = {};

    config.docs = _GlobalData.SystemEvents || [];

    config.ajaxMethods = [
    'this.getSystemEvents()'
    ];

    config.apiUrl = {edit:'systemevent/edit',create:'systemevent/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Nombre',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'text'},
    {label:'Id Evento',key:'eventid', visible:true, editable:true,fieldtype:'text'}
   
  ];

    return config;
  },


  grid_adminmonths(){

    var config = {};

    config.docs = _GlobalData.Months || [];

    config.ajaxMethods = [
    'this.getMonths()'
    ];

    config.apiUrl = {edit:'month/edit',create:'month/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Nombre',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'text'},
   
  ];

    return config;
  },

  grid_admingenders(){

    var config = {};

    config.docs = _GlobalData.Genders || [];

    config.ajaxMethods = [
    'this.getGenders()'
    ];

    config.apiUrl = {edit:'gender/edit',create:'gender/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Nombre',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'text'},
   
  ];

    return config;
  },

  grid_admincivilstatus(){

    var config = {};

    config.docs = _GlobalData.CivilStatus|| [];

    config.ajaxMethods = [
    'this.getCivilStatus()'
    ];

    config.apiUrl = {edit:'civilstatus/edit',create:'civilstatus/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Nombre',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'text'},
   
  ];

    return config;
  },


grid_adminphonestypes(){

    var config = {};

    config.docs = _GlobalData.PhonesTypes|| [];

    config.ajaxMethods = [
    'this.getPhonesTypes()'
    ];

    config.apiUrl = {edit:'phonetype/edit',create:'phonetype/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Nombre',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'text'},
   
  ];

    return config;
  },


grid_admincountries(){

    var config = {};

    config.docs = _GlobalData.Countries || [];

    config.ajaxMethods = [
    'this.getCountries()'
    ];

    config.apiUrl = {edit:'country/edit',create:'country/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Pais',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'text'},
   
  ];

    return config;
  },


  grid_adminstates(){

    var config = {};

    config.docs = _GlobalData.States || [];

    config.ajaxMethods = [
    'this.getCountries()',
    'this.getStates()',
    ];

    config.apiUrl = {edit:'state/edit',create:'state/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Estado',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'text'},
    {label:'Pais',key:'country._id', visible:false, editable:true,fieldtype:'select', dropdowndata:_GlobalData.Countries},
    {label:'Pais',key:'country.name', visible:true, editable:false,fieldtype:'text'},
   
  ];

    return config;
  },


  grid_admincities(){

    var config = {};

    config.docs = _GlobalData.Cities || [];

    config.ajaxMethods = [
    'this.getCountries()',
    'this.getStates()',
    'this.getCities()',
    ];

    config.apiUrl = {edit:'city/edit',create:'city/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Ciudad',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'text'},
    {label:'Estado',key:'state._id', visible:false, editable:true,fieldtype:'select', dropdowndata:_GlobalData.States},
    {label:'Estado',key:'state.name', visible:true, editable:false,fieldtype:'text'},
    {label:'Pais',key:'country._id', visible:false, editable:true,fieldtype:'select', dropdowndata:_GlobalData.Countries},
    {label:'Pais',key:'country.name', visible:true, editable:false,fieldtype:'text'},
   
  ];

    return config;
  },



grid_admindriverslicenses(){

    var config = {};

    config.docs = _GlobalData.DriversLicenses || [];

    config.ajaxMethods = [
    'this.getDriversLicenses()'
    ];

    config.apiUrl = {edit:'driverlicense/edit',create:'driverlicense/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Licencia',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'text'},
   
  ];

    return config;
  },


  grid_adminsituationsstatus(){

    var config = {};

    config.docs = _GlobalData.SituationsStatus || [];

    config.ajaxMethods = [
    'this.getSituationsStatus()'
    ];

    config.apiUrl = {edit:'situationstatus/edit',create:'situationstatus/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Estatus',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'text'},
   
  ];

    return config;
  },

  grid_admininformatics(){

    var config = {};

    config.docs = _GlobalData.Informatics || [];

    config.ajaxMethods = [
    'this.getInformatics()'
    ];

    config.apiUrl = {edit:'informatic/edit',create:'informatic/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Informatico',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'text'},
   
  ];

    return config;
  },


  grid_adminlanguages(){

    var config = {};

    config.docs = _GlobalData.Languages || [];

    config.ajaxMethods = [
    'this.getLanguages()'
    ];

    config.apiUrl = {edit:'language/edit',create:'language/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Idioma',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'text'},
   
  ];

    return config;
  },

  grid_adminstudieslevelsstatus(){

    var config = {};

    config.docs = _GlobalData.StudiesLevelsStatus || [];

    config.ajaxMethods = [
    'this.getStudiesLevelsStatus()'
    ];

    config.apiUrl = {edit:'studylevelstatus/edit',create:'studylevelstatus/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Estatus Nivel de Estudio',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'text'},
   
  ];

    return config;
  },

  grid_adminstudieslevels(){

    var config = {};

    config.docs = _GlobalData.StudiesLevels || [];

    config.ajaxMethods = [
    'this.getStudiesLevels()'
    ];

    config.apiUrl = {edit:'studylevel/edit',create:'studylevel/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Nivel de Estudio',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'text'},
   
  ];

    return config;
  },


  grid_admincompaniesactivities(){

    var config = {};

    config.docs = _GlobalData.CompaniesActivities || [];

    config.ajaxMethods = [
    'this.getCompaniesActivities()'
    ];

    config.apiUrl = {edit:'companyactivity/edit',create:'companyactivity/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Actividad',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'text'},
   
  ];

    return config;
  },


  grid_adminresumessent(){

    var config = {};

    config.docs = _GlobalData.ResumesSent || [];

    config.ajaxMethods = [
    'this.getResumesSent()'
    ];

    config.apiUrl = {edit:'resumesent/edit',create:'resumesent/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Usuario',key:'user.name', visible:true, editable:false,fieldtype:'text'},
    {label:'Empleos',key:'job.title', visible:true, editable:false,fieldtype:'text'},
    {label:'Empresa',key:'company.name', visible:true, editable:false,fieldtype:'text'},
   
  ];

    return config;
  },


grid_adminresumessentstatus(){

    var config = {};

    config.docs = _GlobalData.ResumesSentStatus || [];

    config.ajaxMethods = [
    'this.getResumesSentStatus()'
    ];

    config.apiUrl = {edit:'resumesentstatus/edit',create:'resumesentstatus/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Status',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Descripcion',key:'description', visible:true, editable:true,fieldtype:'text'},
   
  ];

    return config;
  },

  grid_admincompanies(){

    var config = {};

    config.docs = _GlobalData.Companies || [];

    config.ajaxMethods = [
    'this.getCompanies()',
    'this.getUsers()',
    'this.getCities()',
    ];

    config.apiUrl = {edit:'company/edit',create:'company/create'}

    config.options = [
    {label:'Id',key:'_id', visible:false, editable:false},
    {label:'Nombre',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Usuario',key:'user._id', visible:false, editable:true,fieldtype:'select', dropdowndata:_GlobalData.Users},
    {label:'Usuario',key:'user.name', visible:true, editable:false},
    {label:'Ciduad',key:'city._id', visible:false, editable:true,fieldtype:'select', dropdowndata:_GlobalData.Cities},
    {label:'Ciduad',key:'city.name', visible:true, editable:false},
    {label:'Calle',key:'address', visible:true, editable:true,fieldtype:'text'},
    {label:'Numero',key:'number', visible:true, editable:true,fieldtype:'text'},
    {label:'Telefono',key:'phone', visible:true, editable:true,fieldtype:'text'},
    {label:'C.P',key:'postalcode', visible:true, editable:true,fieldtype:'text'},
  ];

    return config;
  },



  grid_adminfacebookgroups(){

    var config = {};

    config.docs = _GlobalData.FacebookGroups || [];

    config.ajaxMethods = [
    'this.getFacebookGroups()',
    'this.getCities()',
    'this.getFacebookPages()',
    ];

    config.apiUrl = {edit:'facebookgroup/edit',create:'facebookgroup/create'}

    config.options = [
    {label:'Activo',key:'active', visible:true, editable:true,fieldtype:'checkbox'},
    {label:'UltimoGrupo',key:'lastgroup', visible:true, editable:true,fieldtype:'checkbox'},
    {label:'Nombre',key:'name', visible:true, editable:true,fieldtype:'text'},
    {label:'Id Groupo',key:'groupid', visible:true, editable:true,fieldtype:'text'},
    {label:'Ciudad',key:'city._id', visible:false, editable:true,fieldtype:'select', dropdowndata:_GlobalData.Cities},
    {label:'Ciudad',key:'city.name', visible:true, editable:false},
    {label:'Pagina',key:'page._id', visible:false, editable:true,fieldtype:'select', dropdowndata:_GlobalData.FacebookPages},
   {label:'Pagina',key:'page.name', visible:true, editable:false},
    {label:'Veces publicaciones',key:'cronpostednumber', visible:true, editable:false},

   
  ];

    return config;
  },

}