<?php

class DocumentsTypesController extends Controller{

  function deletefile(){
    $id = $this->f3->get('POST.id');
    $fullfilename = $this->f3->get('POST.fullfilename');
    unlink("uploads/{$fullfilename}");
    $this->f3->set('POST.filename','');
    $this->f3->set('POST.fullfilename','');
    $this->f3->set('POST.fileuniqueid','');
    $model = new DocumentsTypes($this->db);
    $delete = $model->edit($id);

   // print_r($delete);
   // if($delete) {

    $this->f3->set('json',['result'=>true,'successmessage'=>'File deleted..']);
    //}
    // else $this->f3->set('json',['result'=>false,'errormessage'=>'File not deleted..']);
    $this->tojson();
  }


  function deletedocument(){
    $id = $this->f3->get('POST.id');
    $model = new DocumentsTypes($this->db);
    $result = $model->deleteById($id);

    $data = ['result'=>true, 'successmessage'=>'Document deleted'];

    if(!$result) $data = ['result'=>false, 'errormessage'=>'Document not deleted, try again'];
    $this->f3->set('json', $data ); 
    $this->tojson();
  }

  function render(){
    $this->f3->set('content','content.html');
    echo View::instance()->render('layout.html'); 
    exit;
  }

  function getdocumentstypes(){

    $documentstypes = new DocumentsTypes($this->db);
    

    $byfile = $this->f3->get('GET.byfile');


    $userid = $this->f3->get('GET.userid')?$this->f3->get('GET.userid'):$this->f3->get('SESSION.userid');
   // $this->f3->set('POST.userid',$userid);


    $documentstypesresult = $documentstypes->all($byfile);

    if($byfile){

      foreach ($documentstypesresult as $key => $documenttype) {
        $documentstypesresult[$key]['filleddocuments'] = [];
        if($documenttype['typename'] != ''){
          $documenttypename = $documenttype['typename'];
          $model = "{$documenttypename}Model";
          $filleddocuments = new $model($this->db,$documenttypename);
          $where = array('userid=?',$userid);

          if($this->f3->get('SESSION.userguestid')) $where = array('userguestid=?',$this->f3->get('SESSION.userguestid'));

          $order  = array('order'=>'created DESC');
          $documentstypesresult[$key]['where'] = $where;
          $documentstypesresult[$key]['filleddocuments'] = $filleddocuments->getByWhere($where,$order);
        } 
      }
    }

    $tojson = ['result'=>true, 'data'=>$documentstypesresult];

    $this->f3->set('json', $tojson); 
    $this->tojson(); 
  }

  function adddocumenttype(){

    $documentstypes = new DocumentsTypes($this->db);
    $documentstypes->add();

    $documenttypeid = $documentstypes->get('_id');

    $data = $documentstypes->getById($documenttypeid);
    
    $tojson = ['result'=>true,'data'=>$data];

    $this->f3->set('json', $tojson); 
    $this->tojson(); 
  }

  function getdocumenttype(){ 

   $documenttypeid = $this->f3->get('GET.id');
   $documentstypes = new DocumentsTypes($this->db);
   $data = $documentstypes->getById($documenttypeid);

   $tojson = ['result'=>true,'data'=>$data];

   $this->f3->set('json', $tojson); 
   $this->tojson();
 }

 function savedocumenttype(){ 


   $documenttypeid = $this->f3->get('POST.id');

   $documentstypes = new DocumentsTypes($this->db);
   $documentstypes->edit($documenttypeid);


   $tojson = ['result'=>true];

   $this->f3->set('json', $tojson); 
   $this->tojson();
 }



}