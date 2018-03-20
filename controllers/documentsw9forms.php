<?php

class documentsw9forms extends Controller{


	function beforecreate(){
		$userid = $this->f3->get('POST.userid')?$this->f3->get('POST.userid'):$this->f3->get('SESSION.userid');
		
		if($this->f3->get('SESSION.userguestid')) {
            $this->f3->set('POST.userguestid',$this->f3->get('SESSION.userguestid'));
            $this->f3->set('POST.userid',35);
		}else $this->f3->set('POST.userid',$userid);
        
        $this->f3->set('POST.date',date('Y-m-d'));
		$this->f3->set('POST.created',date('Y-m-d H:i:s'));
		$this->create();
	}

	function getw9forminfo(){
		$id = $this->f3->get('GET.id');
		if(!isset($id)) {
			$tojson = ['result'=>false, 'errormessage'=>'invalid params'];
			$this->json($tojson);
		}

		$model = $this->model;
		return $model->getById($id);
	}


	function downloadpdf(){

		$w9forminfo = $this->getw9forminfo();
		extract($w9forminfo);

		$html = 'test';

		$mpdf=new mPDF();


		$mpdf->SetImportUse();

		$pagecount = $mpdf->SetSourceFile('pdftemplates/W9Form.pdf');



		$fontSize = 9;
		$width = 50;
		$XIcon = "X";

		for ($i=1; $i<=($pagecount); $i++) {
			$mpdf->AddPage();
			$import_page = $mpdf->ImportPage($i);
			$mpdf->UseTemplate($import_page);

			if($i==1){	

				$texts = [
				['text'=>$name,'xpos'=>25,	'ypos'=>32,	'width'=>100,'size'=>$fontSize],
				['text'=>$businessname,'xpos'=>25,'ypos'=>41,'width'=>100,'size'=>$fontSize],
				['text'=>$semitaxclassification,'xpos'=>147,'ypos'=>56,'width'=>$width,'size'=>$fontSize],

				['text'=>$address,'xpos'=>25,'ypos'=>75,'width'=>100,'size'=>$fontSize],
				['text'=>$restaddress,'xpos'=>25,'ypos'=>83,'width'=>100,'size'=>$fontSize],
				['text'=>$listaccountnums,'xpos'=>25,'ypos'=>92,'width'=>200,'size'=>7],

				['text'=>$payeecode,'xpos'=>192,'ypos'=>54,'width'=>$width,'size'=>$fontSize],
				['text'=>$reportingcode,'xpos'=>180,'ypos'=>63,'width'=>$width,'size'=>$fontSize],
				['text'=>$requesternames,'xpos'=>140,'ypos'=>76,'width'=>$width,'size'=>10],

				['text'=>"<b style='letter-spacing:11px'>{$ssn}</b>",'xpos'=>149,'ypos'=>107.4,'width'=>100,'size'=>$fontSize],
				['text'=>"<b style='letter-spacing:11px'>{$ein}</b>",'xpos'=>148.5,'ypos'=>124.4,'width'=>100,'size'=>$fontSize],

				];

				

				$taxclassifications =[
				['text'=>$XIcon,'xpos'=>23,'ypos'=>50,'width'=>$width,'size'=>$fontSize],
				['text'=>$XIcon,'xpos'=>66,'ypos'=>50,'width'=>$width,'size'=>$fontSize],
				['text'=>$XIcon, 'xpos'=>92,'ypos'=>50,'width'=>$width,'size'=>$fontSize],
				['text'=>$XIcon, 'xpos'=>115,'ypos'=>50,'width'=>$width,'size'=>$fontSize],
				['text'=>$XIcon,'xpos'=>140,'ypos'=>50,'width'=>$width,'size'=>$fontSize],
				['text'=>$XIcon, 'xpos'=>23,'ypos'=>56,'width'=>$width,'size'=>$fontSize],
				['text'=>$XIcon, 'xpos'=>23,'ypos'=>67,'width'=>$width,'size'=>$fontSize]
				];

				if(isset($taxclassificationid)) $texts[] = $taxclassifications[$taxclassificationid];

				foreach ($texts as $key => $text) {
					$mpdf->WriteFixedPosHTML("<span style='color:blue'>{$text['text']}</span>", $text['xpos'], $text['ypos'], $text['width'], $text['size'], 'auto');
				}
			};

		}





		
		//$mpdf->Output();
		$mpdf->Output('conflictform.pdf','D');   
		exit; 
		

	}


	

}