<?php

class UsersFilesController extends Controller{

  function deletefile(){
    $fileid = $this->f3->get('POST.id');
    $fullfilename = $this->f3->get('POST.fullfilename');
    $userfile = new UsersFiles($this->db);
    $delete = $userfile->deleteById($fileid);

   if($delete) unlink("uploads/{$fullfilename}");

    $this->f3->set('json',['result'=>true,'successmessage'=>'File deleted..']);

    if(!$delete) $this->f3->set('json',['result'=>false,'errormessage'=>'File not deleted..']);
    $this->tojson();
  }

  function expiredfiles(){
    $userfile = new UsersFiles($this->db);
    $userfile->updateExpiredFiles();
    $this->f3->set('json','files updated....');
    $this->tojson();
  }

 function updatefile(){
   $fileid = $this->f3->get('POST.id');
   $userfile = new UsersFiles($this->db);

   $expiredate = $this->f3->get('POST.expiredate');

   if($expiredate >= date('Y-m-d')) {
    $this->f3->set('POST.expired',0);
    $this->f3->set('POST.emailsent',0);
   }

   $userfile->edit($fileid);

   $this->f3->set('json',['result'=>true,'successmessage'=>'Files updated..']);
   $this->tojson();
 }

 function upload(){
    $userid = $this->f3->get('POST.userid')?$this->f3->get('POST.userid'):$this->f3->get('SESSION.user');

    if(!$userid) $this->sessionover();

    if($userid === null ) {
        $this->f3->set('json',['result'=>false,'errormessage'=>'No user access..']);
        $this->tojson();
        exit;
    }else{


      $this->f3->set('UPLOADS','uploads/'); 
      

      $userid = $this->f3->get('POST.userid')?$this->f3->get('POST.userid'):$this->f3->get('SESSION.userid');
      $this->f3->set('POST.userid',$userid);

    

      $overwrite = true; 
      $slug = function($fileBaseName, $formFieldName){

        $uniqueid = md5(uniqid($this->f3->get('POST.userid').mt_rand(), true));
        $fullfilename = "{$uniqueid}_{$fileBaseName}";
        $this->f3->set('POST.filename',$fileBaseName);
        $this->f3->set('POST.fileuniqueid',$uniqueid);
        $this->f3->set('POST.fullfilename',$fullfilename);

        $userfile = new UsersFiles($this->db);
        $userfile->add();
        
        return $fullfilename;
    };

    $web = \Web::instance();
    $files = $web->receive(function($file,$formFieldName){

        if($file['size'] > (15 * 1024 * 1024))  
            return false; 


        return true; 
    },
    $overwrite,
    $slug
    );

   // print_r($files);


    if(isset($userid)){
      $user = [];
      $users = new Users($this->db);
      $user = $users->getById($userid);


      $this->f3->set('MailSubject', "{$user['name']} has uploaded a new file");
      $this->f3->set('MailTo', $this->f3->get('adminsemails'));
      $this->f3->set('POST.user', $user);
      $this->f3->set('MailTemplate', 'emails/uploadfile.html');

      $this->sendmail();

      $this->f3->set('POST.notificationid', 1); //User file upload
      $this->savenotification();
    }



    $this->f3->set('json',['result'=>true,'files'=>$files,'successmessage'=>'Files transfer completed..']);
    $this->tojson();

}
}


 function simpleupload(){
      $this->f3->set('UPLOADS','uploads/'); 
      

      $overwrite = true; 
      $slug = function($fileBaseName, $formFieldName){
        $documenttypeid = $this->f3->get('POST.documenttypeid');
        $uniqueid = md5(uniqid($documenttypeid.mt_rand(), true));
        $fullfilename = "{$uniqueid}_{$fileBaseName}";
        $this->f3->set('POST.filename',$fileBaseName);
        $this->f3->set('POST.fileuniqueid',$uniqueid);
        $this->f3->set('POST.fullfilename',$fullfilename);

        $userfile = new DocumentsTypes($this->db);
        $userfile->edit($documenttypeid);
        
        return $fullfilename;
    };

    $web = \Web::instance();
    $files = $web->receive(function($file,$formFieldName){

        if($file['size'] > (15 * 1024 * 1024))  
            return false; 


        return true; 
    },
    $overwrite,
    $slug
    );

  
    $this->f3->set('json',['result'=>true,'data'=>$this->f3->get('POST'),'files'=>$files,'successmessage'=>'Files transfer completed..']);
    $this->tojson();

}


}


