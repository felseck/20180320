<?php

class UsersController extends Controller{

 /*function beforeroute(){

  if(!$this->f3->get('COOKIE.session')) $this->logout(false);

  if($this->f3->get('SESSION.user') === null ) {
    $this->f3->reroute('/login');
    exit;
  }
}*/


function documentfillonline(){
 $this->getlanguage('home');

 if(!$this->f3->get('SESSION.userguestid')) {
  $this->f3->set('SESSION.userguestid',$this->RandomNums(9));
  $this->f3->clear('SESSION.user');
  $this->f3->clear('SESSION.userid');
  $this->f3->clear('SESSION.buyerusername');
  $this->f3->clear('SESSION.buyerid');
  $this->f3->clear('SESSION.admin');
  $this->f3->clear('SESSION.adminid');
}

$this->f3->set('content','free/content.html');
echo View::instance()->render('free/layout.html'); 
exit;
}



function deleteuser(){

  $userid = $this->f3->get('POST.id');

  $users = new Users($this->db);
  $delete = $users->delete($userid);

  $tojson = ['result'=>true];

  if(!$delete)   $tojson = ['result'=>false];

  $this->f3->set('json', $tojson); 
  $this->tojson();
}

function expiredfilesemail(){

  if(!$this->f3->get('GET.userid')){
    echo 'No user id detected'; exit;
  }

  $userid = $this->f3->get('GET.userid');

  $userfiles = new UsersFiles($this->db);
  $filesinfo = $userfiles->getExpiredFiles($userid);
  $data = ['primarycontact'=>$filesinfo[0]['primarycontact'],'files'=>$filesinfo];
  

  if(count($filesinfo) == 0) return false;
  $this->f3->set('data',$data);
  $this->f3->set('POST',$data);
  $this->f3->set('MailTemplate', 'emails/expiredfiles.html');
  return true;
  //return View::instance()->render('emails/expiredfiles.html','text/html');
}


function sendemail(){

  $userfiles = new UsersFiles($this->db);
  $userfiles->updateExpiredFiles();

  $users = new Users($this->db);
  $usersexpiredfiles = $users->usersByExpiredFiles();

  foreach ($usersexpiredfiles as $key => $user) {

   $this->f3->set('MailSubject', "{$user['name']} some files have expired");
   $this->f3->set('MailTo', " '{$user['name']}' <{$user['username']}>");
   $this->f3->set('GET.userid', $user['userid']);

   $result = $this->expiredfilesemail(); 

   if($result) $this->sendmail();

   $this->f3->set('POST.emailsent', -1);
   $userfiles = new UsersFiles($this->db);
   $userfiles->edit($user['userfileid']);

 }

 $this->usersdocumentsexpireddates();

 $tojson = ['result'=>true, 'expiredfiles'=>count($usersexpiredfiles)];


 $this->json($tojson);
}

function usersdocumentsexpireddates(){
  $users = new Users($this->db);
  $userslist = $users->getByDocumentsExpireDates();


  foreach ($userslist as $key => $user) {

   $subject = "{$user['name']}, you have {$user['days']} days left to send the {$user['notuploadednum']} missing documents";

   if($user['days'] == 0) $subject = "{$user['name']}, today is the last day to send the {$user['notuploadednum']} missing documents";

   $this->f3->set('MailSubject', $subject);
   $this->f3->set('MailTo', " '{$user['name']}' <{$user['username']}>");
   $this->f3->set('MailTemplate', 'emails/userexpireduploadfiles.html');
   $this->f3->set('user',$user);
   $this->sendmail();

 }


}


function sendemail___________________(){

  if(!$this->f3->get('GET.userid')){
    echo 'No user id detected'; exit;
  }

  $smtp = new SMTP ( 'gator4197.hostgator.com', 465,'SSL', 'files@smithconnenandgarcia.com', 'files12345' );
  $smtp->set('Content-type', 'text/html; charset=UTF-8');
  echo $smtp->set('Errors-to', '<felseck@hotmail.com>');
  echo $smtp->set('FROM', '"smithconnenandgarcia" <files@smithconnenandgarcia.com>');
  echo $smtp->set('To', '"FElipe" <mastersitios@gmail.com>');
  echo $smtp->set('Subject', 'TEst');
  echo $smtp->get('From');
  $message = $this->expiredfilesemail();


if($message) $result = $smtp->send($message); // returns TRUE or FALSE

if($result) $tojson = ['result'=>true];
else $tojson = ['result'=>false];

$this->f3->set('json', $tojson); 
$this->tojson();
}


function logout($exit = true){
  $this->f3->clear('SESSION.user');
  $this->f3->reroute('/login');
  if($exit) exit;
}



function render(){
 $this->getlanguage('login');
 echo View::instance()->render('login.html');
}



function getusers($injson_=true){ 

 $users = new Users($this->db);
 $adminid = $this->f3->get('SESSION.adminid');

 $businesstypequery = "";

 if($this->f3->get('SESSION.businesstypeid')) {
  $businesstypeid = $this->f3->get('SESSION.businesstypeid');

  if($businesstypeid > 0) $businesstypequery = "AND businesstypeid={$businesstypeid}";
  else if($businesstypeid == -1) $businesstypequery = -1;
}

$users = $users->allUsers($businesstypequery,$adminid);


$tojson = ['result'=>true, 'data'=>$users];

$this->f3->set('json', $tojson); 
if($injson_)$this->tojson();
else return $users;

}

function getbuyerusers(){ 

 $users = new Users($this->db);
 $buyerid = $this->f3->get('SESSION.buyerid');

 $businesstypequery = "";

 if($this->f3->get('SESSION.buyerbusinesstypeid')) {
  $businesstypeid = $this->f3->get('SESSION.buyerbusinesstypeid');

  if($businesstypeid > 0) $businesstypequery = "AND businesstypeid={$businesstypeid}";
  else if($businesstypeid == -1) $businesstypequery = -1;
}

$users = $users->allBuyerUsers($businesstypequery,$buyerid);


$tojson = ['result'=>true, 'data'=>$users];

$this->f3->set('json', $tojson); 
$this->tojson();
}

function register(){ 
 $this->getlanguage('register');

 $businesstypes = new BusinessTypes($this->db);
 $businesstypes->all();
 $businesstypes=$businesstypes->find();

 $this->f3->set('businesstypes', $businesstypes);
 echo View::instance()->render('register.html');
}

function userregister__(){ 

 $this->getlanguage('register');

 $smtp = new SMTP ( 'gator4197.hostgator.com',465,'SSL', 'files@smithconnenandgarcia.com', 'files12345' );
 $smtp->set('Content-type', 'text/html; charset=UTF-8');
 $smtp->set('Errors-to', '<mastersitios@gmail.com>');
 $smtp->set('FROM', '"smithconnenandgarcia" <files@smithconnenandgarcia.com>');
 $smtp->set('To', '"Bryan" <bryan@smithconnenandgarcia.com>');
 $smtp->set('Subject', 'New user register');

 $this->f3->set('data', $this->f3->get('POST'));


 $message = View::instance()->render('emails/userregister.html','text/html');

 if($message) $result = $smtp->send($message);

 if(!$result) {
  $this->f3->set('failmessage', "Could not send form, try again");
  $this->register();
}else{
  echo View::instance()->render('registered.html');
}

}


function userregister(){ 

 $this->getlanguage('register');
 $normalpassword = $this->f3->get('POST.password');
 $hashpassoword = password_hash($normalpassword, PASSWORD_DEFAULT);

 $this->f3->set('POST.password',$hashpassoword);

 $user = new Users($this->db);
 $user->add();

 $userid = $user->get('_id');
 $this->f3->set('POST.userid',$userid);
 $businesstypeids = $this->f3->get('POST.businesstypeids');

 $userbusinesstype = new UsersBusinessTypes($this->db);

 foreach ($businesstypeids as $key => $businesstypeid) {
  $query = "INSERT INTO usersbusinesstypes SET userid={$userid}, businesstypeid={$businesstypeid}";
  $this->db->exec($query);
}

$this->f3->set('POST.password',$normalpassword);

$this->f3->set('MailSubject', "New user register - automatic");

$this->f3->set('MailTo', $this->f3->get('adminsemails'));
$this->f3->set('POST.user', $user);
$this->f3->set('MailTemplate', 'emails/userregister.html');

$this->sendmail();

$this->authenticate();
}


function getbusinesstypes($injson_=true){

  $businesstypequery = "";

  if($this->f3->get('SESSION.businesstypeid')) {
    $businesstypeid = $this->f3->get('SESSION.businesstypeid');

    if($businesstypeid > 0) $businesstypequery = "AND usersbusinesstypes.businesstypeid={$businesstypeid}";
  }

  $userid = $this->f3->get('GET.userid')? $this->f3->get('GET.userid'): $this->f3->get('SESSION.userid');


  if($this->f3->get('SESSION.userguestid')) {
    $userbusinesstypesresult = [];
    $userbusinesstypesresult[0] = ['name_es'=>'Descargas','name'=>'Downloads','id'=>null];
  }else {


    if(!$userid) $this->sessionover();

    $userbusinesstypes = new UsersBusinessTypes($this->db);
    $userbusinesstypesresult = $userbusinesstypes->getByUser($userid, $businesstypequery);

    $language = $this->f3->get('SESSION.language');
  }




  foreach ($userbusinesstypesresult as $key => $businesstype) {
   $userbusinesstypesresult[$key]['name'] = $language =='es'?$businesstype['name_es']:$businesstype['name'];
 }

 $tojson = ['result'=>true, 'data'=>$userbusinesstypesresult];

 $this->f3->set('json', $tojson); 
 if($injson_) $this->tojson();
 else return $userbusinesstypesresult;
}


function getbusinessfiles($injson_=true){
 $userid = $this->f3->get('GET.userid')? $this->f3->get('GET.userid'): $this->f3->get('SESSION.userid');

 if(!$userid) $this->sessionover();

 $userbusinessfiles = new UsersFiles($this->db);
 $businesstypeid = $this->f3->get('GET.businesstypeid');
 $userbusinessfilesresult = $userbusinessfiles->getByUser($userid,$businesstypeid);

 $language = $this->f3->get('SESSION.language');

 foreach ($userbusinessfilesresult as $key => $documenttype) {
   $userbusinessfilesresult[$key]['name'] = $language =='es'?$documenttype['name_es']:$documenttype['name'];
 }

 $tojson = ['result'=>true, 'data'=> $userbusinessfilesresult];

     //$this->f3->set('json', $tojson); 
 if($injson_) $this->json($tojson);
 else return $userbusinessfilesresult;
}


function getuser(){ 

 $userid = $this->f3->get('GET.id');
 $users = new Users($this->db);
 $data = $users->getById($userid);

 unset($data['password']);

 $BusinessTypes = $users->getBusinessTypes($userid);

 $userBusinessTypes = [];

 foreach ($BusinessTypes as $key => $BusinessType) {
  $userBusinessTypes[] = $BusinessType['businesstypeid'];
}


 $supermarkets = $users->getsupermarkets($userid);

 $usersupermarkets = [];

 foreach ($supermarkets as $key => $supermarket) {
  $usersupermarkets[] = $supermarket['supermarketid'];
}


$BusinessDocumentsTypes = $users->getBusinessDocumentsTypes($userid);

$userBusinessDocumentsTypes = [];

foreach ($BusinessDocumentsTypes as $key => $BusinessDocumentType) {

  $userBusinessDocumentsTypes[$BusinessDocumentType['businesstypeid']]['documentstypes'][] = $BusinessDocumentType['documenttypeid'];
}


$tojson = ['result'=>true,'data'=>$data, 'usersupermarkets'=>$usersupermarkets,'businessdocumentstypes'=>$userBusinessDocumentsTypes,'BusinessTypes'=>$userBusinessTypes];

$this->f3->set('json', $tojson); 
$this->tojson();
}

function saveuser(){ 

  if($this->f3->get('POST.password')){
   $hashpassoword = password_hash($this->f3->get('POST.password'), PASSWORD_DEFAULT);
   $this->f3->set('POST.password',$hashpassoword);
 }

 $userid = $this->f3->get('POST.id');
 $this->f3->clear('POST.id');


 $userbusinesstypes = $this->f3->get('POST.userbusinesstypes');
 $businesstypes = new UsersBusinessTypes($this->db);
 $businesstypes->deleteByUserId($userid);

 $this->f3->set('POST.userid',$userid);


 if(count($userbusinesstypes) >0) 
  foreach ($userbusinesstypes as $key => $userbusinesstype) {
    $businesstypes = new UsersBusinessTypes($this->db);
    $this->f3->set('POST.businesstypeid',$userbusinesstype);
    $businesstypes->add();
  }



 $usersupermarkets = $this->f3->get('POST.usersupermarkets');
 $supermarkets = new userssupermarketsModel($this->db,'userssupermarkets');
 $supermarkets->deleteByUserId($userid);

   if(count($usersupermarkets) >0) 
  foreach ($usersupermarkets as $key => $usersupermarket) {
    $supermarkets = new userssupermarketsModel($this->db,'userssupermarkets');
    $this->f3->set('POST.supermarketid',$usersupermarket);
    $supermarkets->add();
  }


  $userbusinessdocumentstypes = $this->f3->get('POST.userbusinessdocumentstypes');
  $businessdocumentstypes = new usersbusinessdocumentstypesModel($this->db,'usersbusinessdocumentstypes');
  $businessdocumentstypes->deleteByUserId($userid);


  $totalcustomsdocuments = 0;

  if(count($userbusinessdocumentstypes) >0) 
    foreach ($userbusinessdocumentstypes as $key => $userbusinessdocumenttype) {
      $this->f3->set('POST.businesstypeid',$key);



      foreach ($userbusinessdocumenttype['documentstypes'] as $key_ => $document) {
        $totalcustomsdocuments++;
        $this->f3->set('POST.documenttypeid',$document);
        $businessdocumentstypes = new usersbusinessdocumentstypesModel($this->db,'usersbusinessdocumentstypes');
        $businessdocumentstypes->add();
      }


    }
    $hasdocumentsexpiredates = 0;
    if($totalcustomsdocuments>0) $hasdocumentsexpiredates = -1;

    if($this->f3->get('POST.documentsexpiredate') == '')  $hasdocumentsexpiredates = 0;

    $this->f3->set('POST.hasdocumentsexpiredates',$hasdocumentsexpiredates);
    if($hasdocumentsexpiredates == 0) $this->f3->set('POST.documentsexpiredate',NULL);

    $users = new Users($this->db);
    $users->edit($userid);


    $tojson = ['result'=>true];

    $this->f3->set('json', $tojson); 
    $this->tojson();
  }


  function adduser(){ 

   $normalpassword = $this->f3->get('POST.password');
   $hashpassoword = password_hash($normalpassword, PASSWORD_DEFAULT);

   $this->f3->set('POST.password',$hashpassoword);

   $users = new Users($this->db);
   $users->add();

   $userid = $users->get('_id');
   $data = $users->getById($userid);

   $data['password'] = '*****';

   $tojson = ['result'=>true,'data'=>$data];

   $this->f3->set('json', $tojson); 
   $this->tojson();
 }


 function authenticate() {

  $username = $this->f3->get('POST.username');
  $password = $this->f3->get('POST.password');

  $this->getlanguage('login');

  $admin = new Users($this->db);
  $admin->getByName($username);

  if($admin->dry()) {
    $this->f3->set('adminfailmessage', "No user found with email {$username}");
    echo View::instance()->render('login.html');
  }

  else if(password_verify($password, $admin->password)) {
    $this->f3->set('SESSION.user', $admin->username);
    $this->f3->set('SESSION.userid', $admin->id);
   // $this->f3->set('COOKIE.session', true, 3600);
    $this->f3->clear('SESSION.userguestid');
    $this->f3->reroute('/');
  } else {
    $this->f3->set('adminfailmessage','Incorrect password');
    echo View::instance()->render('login.html');
  }

}


function authenticate__() {

  $username = $this->f3->get('POST.username');
    $password = 'nopwd'; //$this->f3->get('POST.password');

    $user = new Users($this->db);
    $user->getByName($username);

    if($user->dry()) {
      $this->f3->reroute('/register');
    }else{
      $this->f3->set('SESSION.user', $user->username);
      $this->f3->set('SESSION.userid', $user->id);
     // $this->f3->set('COOKIE.session', true, 3600);
      $this->f3->reroute('/');
    }

   /* if(password_verify($password, $user->password)) {
        $this->f3->set('SESSION.user', $user->username);
        $this->f3->set('SESSION.userid', $user->id);
        $this->f3->reroute('/');
    } else {
        $this->f3->reroute('/register');
      }*/
    }

    
    function updateusersdocumentsinfo(){
     $users = $this->getusers(false);
     foreach ($users as $key => $user) {
      $userid = $user['id'];
      $this->f3->set('GET.userid',$userid);
      $this->getdocumentsinfo();
    }

    $tojson = ['result'=>true];

    $this->f3->set('json', $tojson); 
    $this->tojson();

  }

  function getdocumentsinfo(){

    $userbusinesstypes = $this->getbusinesstypes(false);

    $options = [];

    $options['rejectednum'] = 0;
    $options['approvednum']  = 0;
    $options['expirednum']  = 0;
    $options['notuploadednum']  = 0;
    $options['uploadednum']  = 0;
    $options['pendingchecknum']  = 0;

    foreach ($userbusinesstypes as $key => $userbusinesstype ){
      $this->f3->set('GET.businesstypeid',$userbusinesstype['id']);
      $businessfiles = $this->getbusinessfiles(false);

      foreach ($businessfiles as $key => $businessfile) {
       extract($businessfile);

       if($rejected == -1) $options['rejectednum']++;
       if($aproved == -1) $options['approvednum']++;
       if($expired == -1) $options['expirednum'] ++;

       if($filename == '') $options['notuploadednum'] ++;
       else $options['uploadednum']++;

       if($rejected == 0 && $aproved  == 0 && $filename != '') $options['pendingchecknum']++;
     }
   }


   $this->f3->set('POST.rejectednum',$options['rejectednum']);
   $this->f3->set('POST.approvednum',$options['approvednum']);
   $this->f3->set('POST.expirednum',$options['expirednum']);
   $this->f3->set('POST.notuploadednum',$options['notuploadednum']);
   $this->f3->set('POST.uploadednum',$options['uploadednum']);
   $this->f3->set('POST.pendingchecknum',$options['pendingchecknum']);

   $userid = $this->f3->get('GET.userid');

   $users = new Users($this->db);
   $users->edit($userid);


 }


 function getall(){

   $options['page'] = $this->f3->get('GET.page');
   $options['limit'] = $this->f3->get('GET.limit'); 

   $model = new Users($this->db);
   $result = $model->all_($options);

   $tojson = ['result'=>true,'data'=>$result];

   $this->json($tojson);

 }


}