<?php

class crud {
	function all($f3,$params) {

		$result = $f3->DB->exec("SELECT * FROM {$params['controller']} WHERE 1");

		$f3->set('json',$result);
		
		$this->tojson();

	}

	function single($f3,$params) {
		$controller = $params['controller'];

		$f3->set($controller,new DB\SQL\Mapper($f3->DB,$controller));
		$f3->get($controller)->load(array('id=?',$params['id']));
		$f3->get($controller)->copyTo('POST');
		
		if($_POST['id']) $_POST['result'] = true;
		else {
			$_POST['result'] = false;
		}
		$f3->set('json',$_POST);
		$this->tojson();

	}

	function create($f3,$params) {

		if(!$_POST){
			$f3->set('json',['result'=>false]);
			$this->tojson();
			return;
		}

		$controller = $params['controller'];

		$f3->set($controller,new DB\SQL\Mapper($f3->DB,$controller));
		$f3->get($controller)->copyFrom('POST');
		$f3->get($controller)->save();
		$f3->set('json',['result'=>true]);
		$this->tojson();
	}

	function update($f3,$params) {

	/*	if(!$_POST){
			$f3->set('json',['result'=>false]);
			$this->tojson();
			return;
		}*/

		$controller = $params['controller'];
		$f3->set($controller,new DB\SQL\Mapper($f3->DB,$controller));
		$f3->get($controller)->load(array('id=?',$params['id']));
		$f3->get($controller)->copyFrom('POST');
		$f3->get($controller)->update();
		$f3->set('json',['result'=>true]);
		$this->tojson();
	}

	function delete($f3,$params) {

		if(!$_POST){
			$f3->set('json',['result'=>false]);
			$this->tojson();
			return;
		}
		$controller = $params['controller'];
		
		$f3->set($controller,new DB\SQL\Mapper($f3->DB,$controller));
		$f3->get($controller)->load(array('id=?',$params['id']));
		$f3->get($controller)->erase();
		$f3->set('json',['result'=>true]);
		$this->tojson();

	}

	function tojson() {
		echo View::instance()->render('api/start.html', 'application/json', NULL, 300 );
	}
}

?>