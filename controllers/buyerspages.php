<?php

class buyerspages extends Controller{

	function home(){

		if(!$this->f3->get('SESSION.buyerusername')){
			$this->logout();
		}

		$this->buyerprofile();

		$this->getlanguage('home');
		$this->layout('buyers/');
	}

	function logout(){

		$this->getlanguage('login');
		$this->f3->clear('SESSION.buyerusername');
		$this->f3->clear('SESSION.buyerid');
		$this->f3->reroute('/buyers/login');
	}

	function login(){
		$this->getlanguage('login');
		$this->f3->set('content','buyers/content.html');
		echo View::instance()->render('buyers/login.html');
	}

	function supliers(){
		$this->getlanguage('home');
		$this->buyerprofile();
		$this->layout('buyers/');
	}

	


	function authenticate() {

		$this->getlanguage('login');

		$username = $this->f3->get('POST.username');
		$password = $this->f3->get('POST.password');
		$where = ['username=?',$username];
		$model = new buyersModel($this->db,'buyers');
		$model->getByWhere($where);

		if($model->dry()) {
			$this->f3->set('autherrormessage', "incorrect Email {$username}.");
			echo View::instance()->render('buyers/login.html');
		}

		else if(password_verify($password, $model->password)) {
			$this->f3->set('SESSION.buyerusername', $model->username);
			$this->f3->set('SESSION.buyerid', $model->id);

			$this->f3->set('SESSION.buyerbusinesstypeid', $model->businesstypeid);
			$this->f3->clear('SESSION.userguestid');

			if($model->customusers == -1) $this->f3->set('SESSION.buyerbusinesstypeid', $model->customusers);


			$this->f3->reroute("/buyers");
		} else {
			$this->f3->set('autherrormessage','Incorrect password.');
			echo View::instance()->render("buyers/login.html"); 
		}

	}

	function register(){ 
		$this->getlanguage('buyerregister');

		$businesstypes = new BusinessTypes($this->db);
		$businesstypes->all();
		$businesstypes=$businesstypes->find();

		$this->f3->set('businesstypes', $businesstypes);
		echo View::instance()->render('buyers/register.html');
	}

	function buyerregister(){ 

		$this->getlanguage('buyerregister');

		$smtp = new SMTP ( 'gator4197.hostgator.com', 465,'SSL', 'files@smithconnenandgarcia.com', 'files12345' );
		$smtp->set('Content-type', 'text/html; charset=UTF-8');
		$smtp->set('Errors-to', '<mastersitios@gmail.com>');
		$smtp->set('FROM', '"smithconnenandgarcia" <files@smithconnenandgarcia.com>');
		$smtp->set('To', $this->f3->get('adminsemails'));
		$smtp->set('Subject', 'New buyer register');

		$this->f3->set('data', $this->f3->get('POST'));


		$message = View::instance()->render('emails/buyergister.html','text/html');

		if($message) $result = $smtp->send($message);

		if(!$result) {
			$this->f3->set('failmessage', "Could not send form, try again");
			$this->register();
		}else{
			echo View::instance()->render('buyers/registered.html');
		}

	}

	function userfiles(){
		$this->getlanguage('home');
		$this->buyerprofile();
		$this->f3->set('userid',$this->f3->get('GET.id')?$this->f3->get('GET.id'):null);
		$this->layout('buyers/');
	}


	function buyerprofile(){
		$buyerid = $this->f3->get('SESSION.buyerid');
		$buyers = new buyersModel($this->db,'buyers');
		$data = $buyers->getById($buyerid);

		unset($data['password']);
		$this->f3->set('buyer',$data);
	}


}