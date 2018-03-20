<?php

class buyers extends Controller{

  function addbuyer(){ 

     $normalpassword = $this->f3->get('POST.password');
     $hashpassoword = password_hash($normalpassword, PASSWORD_DEFAULT);

     $this->f3->set('POST.password',$hashpassoword);

     $model = $this->model;
     $model->add();

     $buyerid = $model->get('_id');
     $data = $model->getById($buyerid);

     $data['password'] = '*****';

     $tojson = ['result'=>true,'data'=>$data];

     $this->f3->set('json', $tojson); 
     $this->tojson();
   }

  function buyerusers(){

       $buyerid = $this->f3->get('GET.id');
       $model = $this->model;
       $data = $model->getById($buyerid);

       unset($data['password']);

       $users = $model->getUsersByBuyer($buyerid);

       $userids = [];

       foreach ($users as $key => $user) {
         $userids[] = $user['userid'];
       }

       $tojson = ['result'=>true,'users'=>$userids,'data'=>$data];

       $this->f3->set('json', $tojson); 
       $this->tojson();

  }

 function savebuyer(){

  	if($this->f3->get('POST.password')){
       $hashpassoword = password_hash($this->f3->get('POST.password'), PASSWORD_DEFAULT);
       $this->f3->set('POST.password',$hashpassoword);
     }

     $buyerid = $this->f3->get('POST.id');

     $model = $this->model;
     $model->editById($buyerid);

     $model->deleteByBuyerId($buyerid);

     $this->f3->set('POST.buyerid',$buyerid);

     $usersids = $this->f3->get('POST.usersids');
     $this->f3->clear('POST.id');

     if(count($usersids) >0) 
      foreach ($usersids as $key => $userid) {

        $UsersCustom = new buyersuserscustom($this->db);
        $this->f3->set('POST.userid',$userid);
        $UsersCustom->add();
      }


      $tojson = ['result'=>true];

      $this->f3->set('json', $tojson); 
      $this->tojson();
  	
  }

}