<?php

class HomeController extends Controller{
    function render(){

     echo View::instance()->render('login.html');
 }



 function beforeroute(){
        if(!$this->f3->get('SESSION.user')) {
            $this->f3->reroute('/login');
            exit;
        }else{

           $this->getlanguage('home');
           $this->f3->set('content','welcome.html');
           echo View::instance()->render('layout.html'); 
           exit;
        }
    }

 
 
}