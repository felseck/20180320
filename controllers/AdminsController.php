<?php

class AdminsController extends Controller{

 function deleteadmin(){
  $id = $this->f3->get('POST.id');
  $model = new Admins($this->db);
  $result = $model->deleteById($id);

  $data = ['result'=>true, 'successmessage'=>'Admin deleted'];

  if(!$result) $data = ['result'=>false, 'errormessage'=>'Admin not deleted, try again'];
  $this->f3->set('json', $data ); 
  $this->tojson();
}

function logout($exit = true){
  $this->f3->clear('SESSION.admin');
   // $this->f3->clear('SESSION.adminid');
  $this->f3->reroute('/admin/login');
  if($exit) exit;
}

function general(){
 $this->layout_();
}

function buyers(){
 $this->layout_();
}

function documentstypes(){
 $this->layout_();
}

function admins(){
 $this->layout_();
}

function login(){
 echo View::instance()->render('admin/login.html');
}

function home(){

  $this->layout_();
  exit;
}

 /*function beforeroute(){

  if(!$this->f3->get('COOKIE.session')) $this->logout(false);

        if($this->f3->get('SESSION.admin') === null ) {
            $this->f3->reroute('/admin/login');
            exit;
        }

      }*/

      function getadmins(){ 

       $users = new Admins($this->db);
       $users = $users->all();


       $tojson = ['result'=>true, 'data'=>$users];

       $this->f3->set('json', $tojson); 
       $this->tojson();
     }

     function getadmin(){ 

       $adminid = $this->f3->get('GET.id');
       $admins = new Admins($this->db);
       $data = $admins->getById($adminid);

       unset($data['password']);

       $users = $admins->getUsersByAdmin($adminid);

       $userids = [];

       foreach ($users as $key => $user) {
         $userids[] = $user['userid'];
       }

       $tojson = ['result'=>true,'users'=>$userids,'data'=>$data];

       $this->f3->set('json', $tojson); 
       $this->tojson();
     }

     function saveadmin(){ 

    //  echo 'test';

      if($this->f3->get('POST.password')){
       $hashpassoword = password_hash($this->f3->get('POST.password'), PASSWORD_DEFAULT);
       $this->f3->set('POST.password',$hashpassoword);
     }

     $adminid = $this->f3->get('POST.id');

     $admins = new Admins($this->db);
     $admins->edit($adminid);

     $admins->deleteUsersByADmin($adminid);

     $this->f3->set('POST.adminid',$adminid);

     $usersids = $this->f3->get('POST.usersids');
     $this->f3->clear('POST.id');

     if(count($usersids) >0) 
      foreach ($usersids as $key => $userid) {

        $AdminsUsersCustom = new AdminsUsersCustom($this->db);
        $this->f3->set('POST.userid',$userid);
        $AdminsUsersCustom->add();
      }


      $tojson = ['result'=>true];

      $this->f3->set('json', $tojson); 
      $this->tojson();
    }


    function addadmin(){ 

     $normalpassword = $this->f3->get('POST.password');
     $hashpassoword = password_hash($normalpassword, PASSWORD_DEFAULT);

     $this->f3->set('POST.password',$hashpassoword);

     $admins = new Admins($this->db);
     $admins->add();

     $adminid = $admins->get('_id');
     $data = $admins->getById($adminid);

     $data['password'] = '*****';

     $tojson = ['result'=>true,'data'=>$data];

     $this->f3->set('json', $tojson); 
     $this->tojson();
   }

   function getbusinesstypes(){
    $userid = $this->f3->get('GET.userid')? $this->f3->get('GET.userid'): $this->f3->get('SESSION.userid');
    $userbusinesstypes = new UsersBusinessTypes($this->db);
    $userbusinesstypesresult = $userbusinesstypes->getByUser($userid);

    $tojson = ['result'=>true, 'data'=>$userbusinesstypesresult];

    $this->f3->set('json', $tojson); 
    $this->tojson();
  }


  function getbusinessfiles(){
   $userid = $this->f3->get('GET.userid')? $this->f3->get('GET.userid'): $this->f3->get('SESSION.userid');

   $userbusinessfiles = new UsersFiles($this->db);
   $businesstypeid = $this->f3->get('GET.businesstypeid');
   $userbusinessfilesresult = $userbusinessfiles->getByUser($userid,$businesstypeid);

   $tojson = ['result'=>true, 'data'=> $userbusinessfilesresult];

   $this->f3->set('json', $tojson); 
   $this->tojson();
 }

 function users(){
  $this->layout_();
}

function userfiles(){
  $this->f3->set('userid',$this->f3->get('GET.id')?$this->f3->get('GET.id'):null);
  $this->layout_();
}

function layout_(){


   //if(!$this->f3->get('COOKIE.session')) $this->logout(false);

 if(!$this->f3->get('SESSION.admin')) {
  $this->f3->reroute('/admin/login');
  exit;
}


$this->getlanguage('home');
$this->adminprofile();
$this->adminnotifications();
$this->f3->set('content','admin/content.html');
echo View::instance()->render('admin/layout.html');
}

function businesstypes(){
  $this->layout_();
  exit;
}


function adminnotifications(){
 $adminid = $this->f3->get('SESSION.adminid');
 $admins = new Admins($this->db);
 $data = $admins->getNotificationsByAdmin($adminid);

 $totalunread = 0;
 foreach ($data as $key => $notification) {
   if($notification['isread'] == 0) $totalunread++;
 }
 $this->f3->set('totalunread',$totalunread);
 $this->f3->set('notifications',$data);
}


function adminprofile(){
 $adminid = $this->f3->get('SESSION.adminid');
 $admins = new Admins($this->db);
 $data = $admins->getProfileById($adminid);

 

 unset($data['password']);
 $this->f3->set('admin',$data);
}


function authenticate() {

  $username = $this->f3->get('POST.username');
  $password = $this->f3->get('POST.password');

  $admin = new Admins($this->db);
  $admin->getByName($username);

  if($admin->dry()) {
    $this->f3->set('adminfailmessage', "No administrator found with email {$username}");
    echo View::instance()->render('admin/login.html');
  }

  else if(password_verify($password, $admin->password)) {
    $this->f3->set('SESSION.admin', $admin->username);
    $this->f3->set('SESSION.adminid', $admin->id);
    $this->f3->set('SESSION.businesstypeid', $admin->businesstypeid);

    $this->f3->clear('SESSION.buyerusername');
    $this->f3->clear('SESSION.buyerid');
    $this->f3->clear('SESSION.userguestid');
    if($admin->customusers == -1) $this->f3->set('SESSION.businesstypeid', $admin->customusers);
   // $this->f3->set('COOKIE.session', true, 3600);
    $this->f3->reroute('/admin');
  } else {
    $this->f3->set('adminfailmessage','Incorrect password');
    echo View::instance()->render('admin/login.html');
  }

}
}