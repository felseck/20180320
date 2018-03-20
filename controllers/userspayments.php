<?php

class userspayments extends Controller{


 function createpayment(){

   $this->f3->set('POST.paymenttype','user');
   
   //$this->f3->set('POST.date',Date('Y-m-d'));
   
   $create = $this->create(false);

   if($create['result'])  $this->UpdatePaymentsCount();

    $this->json($create);

 }

function UpdatePaymentsCount(){
  $userid = $this->f3->get('POST.userid');

  $this->f3->clear('POST');
  
  $usermodel = new Users($this->db);
  $TotalPayments = $usermodel->getById($userid)['totalpayments'];
  $this->f3->set('POST.totalpayments', $TotalPayments+1);

  $usermodel->edit($userid);
}


function alluserspayments(){

 $options['page'] = $this->f3->get('GET.page');
 $options['limit'] = $this->f3->get('GET.limit'); 

 $result = $this->model->userspayments($options);

 $tojson = ['result'=>true,'data'=>$result];

 $this->json($tojson);

}

function allbuyerspayments(){

 $options['page'] = $this->f3->get('GET.page');
 $options['limit'] = $this->f3->get('GET.limit'); 

 $result = $this->model->buyerspayments($options);

 $tojson = ['result'=>true,'data'=>$result];

 $this->json($tojson);

}


function paymentsuccess(){

  $this->getlanguage('home');
  $this->f3->set('content','paymentsuccess.html');
  echo View::instance()->render('buyers/layout.html'); 
  exit;

}


function paypalipn(){

  $ips = ['173.0.82.126','173.0.81.1'];//,'127.0.0.1']; //sandbox y prod paypal



  if(!in_array($_SERVER['REMOTE_ADDR'], $ips)) {
   $tojson = ['result'=>false];
   $this->json($tojson);
 };


 $userid = $this->f3->get('POST.option_selection3');



 $this->f3->set('POST.concept', $this->f3->get('POST.option_selection1'));
 $this->f3->set('POST.company', $this->f3->get('POST.option_selection2'));
 $this->f3->set('POST.amount', $this->f3->get('POST.mc_gross'));
 $this->f3->set('POST.date', date('Y-m-d'));
 $this->f3->set('POST.created', date('Y-m-d H:i:s'));

 $paymenttype = $this->f3->get('POST.option_selection4');

 $this->f3->set('POST.paymenttype', $paymenttype); 

 if($paymenttype == 'user') $this->f3->set('POST.userid', $userid);
 else if($paymenttype == 'buyer') $this->f3->set('POST.buyerid', $userid);

 $model = $this->model;
 $model->add();

 $this->f3->clear('POST.created');

 $this->f3->set('POST.haspayments', -1);

 $this->f3->set('POST.paymentmethod', 2); //paypal


 if($paymenttype == 'user'){
  $usermodel = new Users($this->db);
  $TotalPayments = $usermodel->getById($userid)['totalpayments'];
  $this->f3->set('POST.totalpayments', $TotalPayments+1);
  $usermodel->edit($userid);
}else if($paymenttype == 'buyer'){

 $buyersmodel = new buyersModel($this->db,'buyers');
 $TotalPayments = $buyersmodel->getById_($userid)['totalpayments'];
 $this->f3->set('POST.totalpayments', $TotalPayments+1);
 $buyersmodel->editById($userid);

}

$this->f3->set('MailSubject', "Someone has made a payment");
$this->f3->set('MailTo', '"felipe" <mastersitios@gmail.com>');

$this->f3->set('MailTemplate', 'emails/userpayment.html');

//$this->f3->set('POST.SERVER', $_SERVER);
//$this->f3->set('POST.ips', $ips);

$this->sendmail();



$tojson = ['result'=>true];

$this->json($tojson);

}

}