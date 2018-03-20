<?php

class buyersconflictforms extends Controller{


	function upload(){

	  
      $this->f3->set('UPLOADS','uploads/'); 
      

      $overwrite = true; 
      $slug = function($fileBaseName, $formFieldName){
      	 
        $id = $this->f3->get('POST.id');

	    if(!isset($id)) {
	  	 $id = $this->createconflictform(false);
	    }
 
        $uniqueid = md5(uniqid($id.mt_rand(), true));
        $fullfilename = "{$uniqueid}_{$fileBaseName}";
        $this->f3->set('POST.filename',$fileBaseName);
        $this->f3->set('POST.fileuniqueid',$uniqueid);
        $this->f3->set('POST.fullfilename',$fullfilename);

        $model = $this->model;
        $model->editById($id);
        
        return $fullfilename;
    };

    $web = \Web::instance();
    $files = $web->receive(function($file,$formFieldName){

        if($file['size'] > (15 * 1024 * 1024))  
            return false; 


        return true; 
    },
    $overwrite,
    $slug
    );

  
    $this->f3->set('json',['result'=>true,'data'=>$this->f3->get('POST'),'files'=>$files,'successmessage'=>'Files transfer completed..']);
    $this->tojson();

}


	function createconflictform($injson = true){
		$buyerid = $this->f3->get('SESSION.buyerid');
		$model = $this->model;
		$this->f3->set('POST.buyerid',$buyerid);
		$this->f3->set('POST.created',date("Y-m-d"));

		if($this->f3->get('SESSION.userguestid')){
          $this->f3->clear('POST.buyerid');
          $this->f3->clear('POST.userid');
          $this->f3->clear('POST.businesstypeid');
          $this->f3->set('POST.userguestid',$this->f3->get('SESSION.userguestid'));
		}


		$model->add();

		$conflictformid = $model->get('_id');

		
		$data = ['result'=>true];

		if($model->dry()) $data = ['result'=>false, "errormessage"=>'Could not send, try again'];


		$buyer = [];
		if(isset($buyerid)){
			$buyers = new buyersModel($this->db, 'buyers');
			$buyer = $buyers->getById($buyerid);


			$this->f3->set('MailSubject', 'New filled form. Conflict of Interest Form');
			$this->f3->set('MailTo', $this->f3->get('adminsemails'));
			$this->f3->set('POST.buyer', $buyer);
			$this->f3->set('MailTemplate', 'emails/createconflictform.html');

			$this->sendmail();
			$this->f3->set('POST.notificationid', 2); //User file upload
            $this->savenotification();
		}


		$this->f3->set('json', $data ); 
		if($injson) $this->tojson();
		else return $conflictformid;
	}


	function getbusinnesconflictforms(){
		$buyerid = $this->f3->get('SESSION.buyerid');
		$userid = $this->f3->get('GET.userid');
		$businesstypeid = $this->f3->get('GET.businesstypeid');
		$model = $this->model;

		$userguestid = false;

		if($this->f3->get('SESSION.userguestid')){
           $userguestid = $this->f3->get('SESSION.userguestid');
		}

		$result = $model->getConflictForms($userid,$buyerid,$businesstypeid,$userguestid);

		$data = ['result'=>true, 'data'=>$result];

		$this->f3->set('json', $data ); 
		$this->tojson();
	}


	function getbuyerconflictforms(){
		$buyerid = $this->f3->get('GET.buyerid');
		$model = $this->model;
		$result = $model->getConflictFormsByBuyer($buyerid);


		$data = ['result'=>true, 'data'=>$result];

		$this->f3->set('json', $data ); 
		$this->tojson();
	}

	function conflictform_(){
		$this->pdfrender();
		echo View::instance()->render("pdf/conflictform.html");

	}

	function conflictform(){

		$this->pdfrender();

		$html = View::instance()->render('pdf/conflictform.html');

		$mpdf=new mPDF();

		$mpdf->SetWatermarkText('Northgate Authorized Buyer', 0.1);
        $mpdf->showWatermarkText = true;

		$mpdf->WriteHTML(utf8_encode($html));

		return $mpdf;

	}

	function downloadpdf(){
		$mpdf = $this->conflictform();
		$mpdf->Output('conflictform.pdf','D'); 
		exit;
	}

	function viewpdf(){
		$mpdf = $this->conflictform();
		$mpdf->Output();   
		exit; 
	}



	function pdfrender(){
		$id = $this->f3->get('GET.id');
		$model = $this->model;
		$result = $model->getById($id);

		$this->f3->set('data',$result);

	}

}