<?php

class supermarkets extends Controller{

	function savesupermarket(){
	   if($this->f3->get('POST.normalpwd')){
       $hashpassoword = password_hash($this->f3->get('POST.normalpwd'), PASSWORD_DEFAULT);
       $this->f3->set('POST.password',$hashpassoword);
     }else $this->f3->clear('POST.normalpwd');

     $supermarketid = $this->f3->get('POST.id');

     $supermarkets = $this->model;
     $supermarkets->editById($supermarketid);

      $tojson = ['result'=>true,'successmessage'=>'Supermarket saved'];

      $this->f3->set('json', $tojson); 
      $this->tojson();
    
	}

	function addsupermarket(){
		$normalpassword = $this->f3->get('POST.password');
		$hashpassoword = password_hash($normalpassword, PASSWORD_DEFAULT);

		$this->f3->set('POST.password',$hashpassoword);
		$this->f3->set('POST.normalpwd',$normalpassword);

		$supermarkets = $this->model;
		$supermarkets->add();

		$supermarketid = $supermarkets->get('_id');
		$data = $supermarkets->getById($supermarketid);

		$data['password'] = '*****';

		$tojson = ['result'=>true,'data'=>$data];

		$this->f3->set('json', $tojson); 
		$this->tojson();
	}

	function register(){ 
		$this->getlanguage('supermarketregister');

		echo View::instance()->render('supermarkets/register.html');
	}

	function supermarketregister(){ 

		$this->getlanguage('supermarketregister');
		$normalpassword = $this->f3->get('POST.password');
		$hashpassoword = password_hash($normalpassword, PASSWORD_DEFAULT);

		$this->f3->set('POST.password',$hashpassoword);

		$supermarket = new supermarketsModel($this->db,'supermarkets');
		$supermarket->add();


		$this->f3->set('POST.password',$normalpassword);

		$this->f3->set('MailSubject', "New supermarket register");

		$this->f3->set('MailTo', $this->f3->get('adminsemails'));

		$this->f3->set('MailTemplate', 'emails/supermarketregister.html');

//$this->sendmail();

		$this->authenticate();
	}


	function authenticate() {

		$username = $this->f3->get('POST.username');
		$password = $this->f3->get('POST.password');

		$this->getlanguage('login');

		$supermarket = new supermarketsModel($this->db,'supermarkets');
		$supermarket->getByName($username);

		if($supermarket->dry()) {
			$this->f3->set('adminfailmessage', "No supermarket found with email {$username}");
			echo View::instance()->render('supermarkets/login.html');
		}

		else if(password_verify($password, $supermarket->password)) {
			$this->f3->set('SESSION.supermarketusername', $supermarket->username);
			$this->f3->set('SESSION.supermarketid', $supermarket->id);

			if($supermarket->hasmainsupermarket) $this->f3->set('SESSION.mainsupermarketid', $supermarket->mainsupermarketid);

			$this->f3->clear('SESSION.userguestid');
			$this->f3->reroute('/supermarkets');
		} else {
			$this->f3->set('adminfailmessage','Incorrect password');
			echo View::instance()->render('supermarkets/login.html');
		}

	}

	function home(){

		if(!$this->f3->get('SESSION.supermarketusername')){
			$this->logout();
		}

		$this->supermarketprofile();

		$this->getlanguage('home');
		$this->layout('supermarkets/');
	}

	function supermarketprofile(){
		$supermarketid = $this->f3->get('SESSION.supermarketid');
		$supermarkets = new supermarketsModel($this->db,'supermarkets');
		$data = $supermarkets->getInfoById($supermarketid);


		unset($data['password']);
		$this->f3->set('supermarket',$data);
	}

	function logout(){

		$this->getlanguage('login');
		$this->f3->clear('SESSION.supermarketusername');
		$this->f3->clear('SESSION.supermarketid');
		$this->f3->reroute('/supermarkets/login');
	}

	function login(){
		$this->getlanguage('login');
		$this->f3->set('content','supermarkets/content.html');
		echo View::instance()->render('supermarkets/login.html');
	}

	function supliers(){
		$this->getlanguage('home');
		$this->supermarketprofile();
		$this->layout('supermarkets/');
	}

	function getsupermarketusers(){

		$users = new Users($this->db);
		$supermarketid = $this->f3->get('SESSION.supermarketid');
		$mainsupermarketid = $this->f3->get('SESSION.mainsupermarketid');
      
        if(isset($mainsupermarketid)) $supermarketid = $mainsupermarketid;

		$users = $users->allsupermarketusers($supermarketid);


		$tojson = ['result'=>true, '$supermarketid'=>$supermarketid,'data'=>$users];

		$this->f3->set('json', $tojson); 
		$this->tojson();


	}

}