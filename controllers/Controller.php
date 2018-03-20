<?php

class Controller {

  protected $f3;
  protected $db;

  protected $controller;
  protected $model;

  function RandomNums($cant = 16)
  {
    mt_srand();
    for($i=1;$i<=$cant;$i++)
      $fin .= mt_rand (0, 9);
    return $fin;
  } 



  function afterroute(){

  }

  function __construct() {


    $f3=Base::instance();
    $this->f3=$f3;

    $this->controller=$f3->get('PARAMS.controller');

    $this->table = $this->controller;

    $this->f3->set('adminsemails','"Raul" <raul@smithconnenandgarcia.com>, "Bryan" <bryan@smithconnenandgarcia.com>, "Edgar" <edgar@smithconnenandgarcia.com>, "felipe" <mastersitios@gmail.com>');


    $db=new DB\SQL(
      $f3->get('devdb'),
      $f3->get('devdbusername'),
      $f3->get('devdbpassword'),
      array( \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION )
      );

    $this->db=$db;


    $modelname = "{$this->controller}Model";
    
    $enablecontrollers = [
    'buyers',
    'buyersuserscustom',
    'buyersconflictforms',
    'notificationsadmins',
    'userspayments',
    'documentsvendorsapplications',
    'documentsw9forms',
    'users',
    'supermarkets'
    ];

    if(isset($this->controller) && in_array($this->controller,$enablecontrollers)) $this->model = new $modelname($this->db, $this->table);
    else if(isset($this->controller)) $this->json(['result'=>false,'errormessage'=>'The class is not defined in the enabled controllers']);
  }

  function sessionover(){
    $tojson = ['result'=>false, 'data'=> 'The session is over'];

    $this->f3->set('json', $tojson); 
    $this->tojson();
    exit;
  }

  function tojson() {
    echo View::instance()->render('api/start.html', 'application/json', NULL, NULL );
  }

  function setlanguage(){
   if($this->f3->get('GET.lang')) $this->f3->set('SESSION.language',$this->f3->get('GET.lang'));
 }

 function language(){
  return  [

  'en'=>[

  'login'=>[
  'login'=>'Login',
  'email'=>'Email Address',
  'password'=>'Password',
  'register'=>'Register Form'
  ],

  'register'=>[
  'register'=>'Register Form',
  'primarycontact'=>'Supplier Contact',
  'email'=>'Supplier Email',
  'companyname'=>'Supplier Name',
  'businesstypes'=>'Type of business',
  'message'=>'Message',
  'password'=>'Password',
  'regist'=>'Submit',
  'loginpage'=>'Login page',


  ],

  'buyerregister'=>[
  'register'=>'Register Form',
  'primarycontact'=>'Buyer Contact',
  'email'=>'Buyer Email',
  'companyname'=>'Buyer Name',
  'businesstypes'=>'Type of business',
  'message'=>'Message',
  'password'=>'Password',
  'regist'=>'Submit',
  'loginpage'=>'Login page',


  ],

  'supermarketregister'=>[
  'register'=>'Register Form',
  'primarycontact'=>'Primary Contact',
  'email'=>'Email',
  'password'=>'Password',
  'regist'=>'Submit',
  'loginpage'=>'Login page',
  "supermarketname"=>"Supermarket Name"


  ],
  
  'home'=>[
  'abreviation'=>'IN',
  'abreviation_'=>'en_US',
  'myusers'=>'Suppliers',
  'myfiles'=>'My Files',
  'logout'=>'Logout',
  'username'=>'Username',
  'name'=>'Name',
  'nameofcompany'=>'Name of Company',
  'userfiles'=>'User Files',
  'chartfiles'=>'Chart Files',
  'updatedtoday'=>'Updated today',
  'uploaded'=>'Uploaded',
  'nouploaded'=>'Not uploaded',
  'upload'=>'Upload',
  'aproved'=>'Approved',
  'rejected'=>'Rejected',
  'download'=>'Download',
  'validuntil'=>'Valid until',
  'readytoleave'=>'Ready to Leave?',
  'leavetext'=>'Select "Logout" below if you are ready to end your current session.',
  'cancel'=>'Cancel',
  'rejectedreason'=>'Rejected reason',
  'expired'=>'Expired',
  'delete'=>'Delete',
  'addpayment'=>'Add payment concept',
  'companythatdeposit'=>'Company that deposits',

  'companythatdepositmessage'=>'Company that deposits must be filled out',
  'addpaymentmessage'=>'Payment concept must be filled out',

  ]

  ],

  'es'=>[
  'login'=>[
  'login'=>'Entrar',
  'email'=>'Email',
  'password'=>'Contraseña',
  'register'=>'Formulario de registro'
  ],

  'register'=>[
  'register'=>'Formulario de registro',
  'primarycontact'=>'Cotacto del proveedor',
  'email'=>'Email del proveedor',
  'companyname'=>'Nombre del proveedor',
  'businesstypes'=>'Tipo de negocio',
  'message'=>'Mensaje',
  'password'=>'Contraseña',
  'regist'=>'Enviar',
  'loginpage'=>'¿Ya estas registrado? Entra aquí',

  ],

  'buyerregister'=>[
  'register'=>'Formulario de registro',
  'primarycontact'=>'Cotacto del comprador',
  'email'=>'Email del comprador',
  'companyname'=>'Nombre del comprador',
  'businesstypes'=>'Tipo de negocio',
  'message'=>'Mensaje',
  'password'=>'Contraseña',
  'regist'=>'Enviar',
  'loginpage'=>'¿Ya estas registrado? Entra aquí',

  ],
  
  'home'=>[
  'abreviation'=>'ES',
  'abreviation_'=>'es_ES',
  'myusers'=>'Vendedores',
  'myfiles'=>'Mis Archivos',
  'logout'=>'Salir',
  'username'=>'Usuario',
  'name'=>'Nombre',
  'nameofcompany'=>'Nombre Compañia',
  'userfiles'=>'Archivos de usuario',
  'chartfiles'=>'Grafica de archivos',
  'updatedtoday'=>'Actulizado hoy',
  'uploaded'=>'Subido',
  'nouploaded'=>'Sin subir',
  'upload'=>'Subir',
  'aproved'=>'Aprovado',
  'rejected'=>'Rechazado',
  'download'=>'Descargar',
  'validuntil'=>'Válido hasta',
  'readytoleave'=>'¿Listo para salir?',
  'leavetext'=>'Seleccione "Salir" a continuación si está listo para finalizar su sesión actual.',
  'cancel'=>'Cancelar',
  'rejectedreason'=>'Razón de rechazo',
  'expired'=>'Expirado',
  'delete'=>'Eliminar',
  'addpayment'=>'Añadir concepto de pago',
  'companythatdeposit'=>'Empresa que deposita',

  'companythatdepositmessage'=>'Debe ingresar la Empresa que deposita',
  'addpaymentmessage'=>'Debe ingresar el concepto de pago',


  ]


  ]


  ];
}

function getlanguage($page_){
  $this->setlanguage();
  $language = 'en';
  $language = $this->f3->get('SESSION.language')?$this->f3->get('SESSION.language'):$language;
  $this->f3->set('language',$this->language()[$language][$page_]);
}




function json($tojson_) {
  echo json_encode($tojson_, JSON_UNESCAPED_UNICODE);
  exit;
}

function layout($folder_ = false){
  $this->f3->set('content',"{$folder_}content.html");
  echo View::instance()->render("{$folder_}layout.html");
}



function all(){

 $options['page'] = $this->f3->get('GET.page');
 $options['limit'] = $this->f3->get('GET.limit'); 
 $options['query'] = $this->f3->get('GET.query');

 $result = $this->model->all($options);

 $tojson = ['result'=>true,'data'=>$result];

 $this->json($tojson);

}

function single(){

 $id = $this->f3->get('GET.id');

 if(!$id) {
   $tojson = ['result'=>false, 'errorcode'=>100,'errormessage'=>'Undefined param'];
   $this->json($tojson);
 }

 $result = $this->model->getById($id);

 $tojson = ['result'=>true,'data'=>$result];

 if($this->model->dry()) 
  $tojson = ['result'=>false, 'errorcode'=>100, 'errormessage'=>"The information could not be obtained, the element does not exist"];

$this->json($tojson);
}

function edit(){


 $id = $this->f3->get('POST.id');

 if(!$id) {
   $tojson = ['result'=>false, 'errorcode'=>100, 'errormessage'=>'Undefined param'];
   $this->json($tojson);
 }

 $this->model->editById($id);

 $tojson = ['result'=>true,'successmessage'=>"It has been saved correctly"];

 if($this->model->dry()) 
  $tojson = ['result'=>false, 'errorcode'=>100,'errormessage'=>"Not saved correctly, try again"];

$this->json($tojson);
}

function create($injson = true){

 $this->f3->clear('POST.id');

 $model = $this->model;
 $model->add();

 $insertid =  $model->get('_id');

 $data =  $model->getById($insertid);

 $tojson = ['result'=>true,'successmessage'=>"It was created correctly", 'data'=>$data];

 if($this->model->dry()) 
  $tojson = ['result'=>false, 'errorcode'=>100,'errormessage'=>"It was not created correctly, try again"];

   if($injson) $this->json($tojson);
   else return $tojson;
}


function delete(){

 $id = $this->f3->get('POST.id');


 if(!$id) {
   $tojson = ['result'=>false, 'errorcode'=>100,'errormessage'=>'Undefined param'];
   $this->json($tojson);
 }

 $this->model->deleteById($id);

 $tojson = ['result'=>true,'successmessage'=>"It has been removed correctly"];

 if($this->model->dry()) 
  $tojson = ['result'=>false, 'errorcode'=>100, 'errormessage'=>"Does not exist or has not been removed correctly, try again"];

$this->json($tojson);
}

function deletes(){

 $field = $this->f3->get('GET.field');
 $value = $this->f3->get('GET.value');


 if(!$field OR !$value) {
   $tojson = ['result'=>false, 'errorcode'=>100, 'errormessage'=>'Parametro indefinido'];
   $this->json($tojson);
 }

 $where = ["$field=?",$value];

 $this->model->deleteByWhere($where);

 $tojson = ['result'=>true,'successmessage'=>"It has been removed correctly"];

 if($this->model->dry()) 
  $tojson = ['result'=>false, 'errorcode'=>100,'errormessage'=>"Does not exist or has not been removed correctly, try again"];

$this->json($tojson);
}

function sendmail(){
 $smtp = new SMTP ( 'gator4197.hostgator.com', 465,'SSL', 'files@smithconnenandgarcia.com', 'files12345' );
 $smtp->set('Content-type', 'text/html; charset=UTF-8');
 $smtp->set('Errors-to', '<mastersitios@gmail.com>');
 $smtp->set('FROM', '"smithconnenandgarcia" <files@smithconnenandgarcia.com>');
 $smtp->set('To',  $this->f3->get('MailTo'));
 $smtp->set('Subject', $this->f3->get('MailSubject'));

 $this->f3->set('data', $this->f3->get('POST'));

 $message = View::instance()->render($this->f3->get('MailTemplate'),'text/html');

 $result = false;
 if($message) $result = $smtp->send($message);

 return $result;
}

function savenotification(){
  
  $userid = $this->f3->get('POST.userid')?$this->f3->get('POST.userid'):$this->f3->get('SESSION.userid');
  $notificationid = $this->f3->get('POST.notificationid');
  $buyerid = $this->f3->get('SESSION.buyerid');

  if(!isset($userid) OR !isset($notificationid)) return false;

  $this->f3->set('POST.userid',$userid);
  if(!isset($buyerid)) $this->f3->set('POST.buyerid',$buyerid);

  $businesstypeid = $this->f3->get('SESSION.businesstypeid');

  if(isset($businesstypeid) && $businesstypeid < 1) $this->f3->clear('SESSION.businesstypeid');

  /*$notifications = new notificationsModel($this->db,'notifications');
  $notification = $notifications->getById($notificationid);*/

  $admins = new Admins($this->db,'Admins');
  $adminsbyuser = $admins->getAdminsByUser($userid,$businesstypeid);

  
  foreach ($adminsbyuser as $key => $admin) {
    $this->f3->set('POST.adminid',$admin['adminid']);
    $notificationsadmins = new notificationsadminsModel($this->db,'notificationsadmins');
    $notificationsadmins->add();
  }

  return true;
  
  
}

}