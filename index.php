<?php

// Kickstart the framework
$f3=require('lib/base.php');

$f3->set('DEBUG',1);
if ((float)PCRE_VERSION<7.9)
	trigger_error('PCRE version is out of date');


/*
$f3->route('GET /*',
    function() {
        echo View::instance()->render('ui/maintenance.html');
    }
);
*/

// Load configuration
$f3->config('config.ini');
$f3->config('routes.ini');

new Session();

// so just add a global pre-route to all at once
\Middleware::instance()->before('GET /buyers/*', function(\Base $f3, $params, $alias) {

buyers($f3,$params);

});

function buyers($f3,$params){

	$page = $params[0];

	if($page == '/buyers/authenticate' OR $page == '/buyers/register'){}
	else if(!$f3->get('SESSION.buyerusername')){

			

				$controller = new Controller();
				$controller->setlanguage();

				$language = 'en';
                $language = $f3->get('SESSION.language')?$f3->get('SESSION.language'):$language;

				$lang= $controller->language()[$language]['login'];
				$f3->set('language',$lang);
				echo View::instance()->render('buyers/login.html');
			
			exit;
		}

}

\Middleware::instance()->run();


$f3->run();
