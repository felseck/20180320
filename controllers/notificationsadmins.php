<?php

class notificationsadmins extends Controller{

  function editbyuser(){


 $id = $this->f3->get('POST.userid');

 if(!$id) {
   $tojson = ['result'=>false, 'errorcode'=>100, 'errormessage'=>'Undefined param'];
   $this->json($tojson);
 }

 $this->model->editByUserId($id);

 $tojson = ['result'=>true,'successmessage'=>"It has been saved correctly"];

 if(!$this->model->dry()) 
  $tojson = ['result'=>false, 'errorcode'=>100,'errormessage'=>"Not saved correctly, try again"];

$this->json($tojson);
}

}