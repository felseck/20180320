<?php

class BusinessTypesController extends Controller{
 
   function deletebusiness(){
  $id = $this->f3->get('POST.id');
  $model = new BusinessTypes($this->db);
  $result = $model->deleteById($id);

  $data = ['result'=>true, 'successmessage'=>'Business deleted'];

  if(!$result) $data = ['result'=>false, 'errormessage'=>'Business not deleted, try again'];
  $this->f3->set('json', $data ); 
  $this->tojson();
}
 

  function getbusinesstypes(){

    $businesstypes = new BusinessTypes($this->db);
    $businesstypesresult = $businesstypes->all();

    $tojson = ['result'=>true, 'data'=>$businesstypesresult];

    $this->f3->set('json', $tojson); 
    $this->tojson(); 
  }

  function getbusinessdocumentstypes(){

    $businesstypeid = $this->f3->get('GET.businesstypeid');

    $businessdocumentstypes = new BusinessTypes($this->db);
    $businessdocumentstypesresult = $businessdocumentstypes->allDocuments($businesstypeid);
    $businessinfo = $businessdocumentstypes->getById($businesstypeid);
    
    $documents = [];
    foreach($businessdocumentstypesresult as $key => $value) {
      $documents[] = $value['value'];
    }
    $tojson = ['result'=>true, 'data'=>$documents,'businessinfo'=>$businessinfo];

    $this->f3->set('json', $tojson); 
    $this->tojson(); 
  }

  function savebusinessdocumentstypes(){

    $businesstypeid = $this->f3->get('POST.businesstypeid');
    $documentstypeids = $this->f3->get('POST.documentstypeids');

    $businessdocumentstypes = new BusinessDocumentsTypes($this->db);
    $businessdocumentstypes->deleteByBusinessType($businesstypeid);

    if(count($documentstypeids) >0) 
    foreach ($documentstypeids as $key => $documenttypeid) {
     // echo $documenttypeid;
      $businessdocumentstypes = new BusinessDocumentsTypes($this->db);
      $this->f3->set('POST.documenttypeid',$documenttypeid);
      $businessdocumentstypes->add();
    }
    
    $tojson = ['result'=>true];

    $this->f3->set('json', $tojson); 
    $this->tojson(); 
  }


function addbusinesstype(){

    $businesstypes = new BusinessTypes($this->db);
    $businesstypes->add();

    $businesstypeid = $businesstypes->get('_id');

    $data = $businesstypes->getById($businesstypeid);
    
    $tojson = ['result'=>true,'data'=>$data];

    $this->f3->set('json', $tojson); 
    $this->tojson(); 
  }

 /* function beforeroute(){
    if($this->f3->get('SESSION.user') === null ) {
      $this->f3->reroute('/login');
      exit;
    }else{


     $this->f3->set('content','welcome.html');
     echo View::instance()->render('layout.html'); 
     exit;
   }
 }*/

 
}