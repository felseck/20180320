<?php

class documentsvendorsapplications extends Controller{


	function beforecreate(){
		$userid = $this->f3->get('POST.userid')?$this->f3->get('POST.userid'):$this->f3->get('SESSION.userid');


		if($this->f3->get('SESSION.userguestid')) {
            $this->f3->set('POST.userguestid',$this->f3->get('SESSION.userguestid'));
            $this->f3->set('POST.userid',35);
		}else $this->f3->set('POST.userid',$userid);

		$this->f3->set('POST.date',date('Y-m-d'));
		$this->f3->set('POST.created',date('Y-m-d H:i:s'));
		$this->f3->set('POST.acceptancedate',date('Y-m-d'));
		$this->create();
	}

	function getvendorapplicationinfo(){
		$id = $this->f3->get('GET.id');
		if(!isset($id)) {
			$tojson = ['result'=>false, 'errormessage'=>'invalid params'];
			$this->json($tojson);
		}

		$model = $this->model;
		return $model->getById($id);
	}


	function downloadpdf(){
       
        $vendorapplicationinfo = $this->getvendorapplicationinfo();
        extract($vendorapplicationinfo);
		
		$html= View::instance()->render('pdf/vendorapplication.html');

		$mpdf=new mPDF();


		$mpdf->SetImportUse();

		$pagecount = $mpdf->SetSourceFile('pdftemplates/StandardVendorApplication.pdf');
		$tplId = $mpdf->ImportPage($pagecount);
		$mpdf->SetPageTemplate($tplId);

		
		$fontSize = 9;
		$width = 50;
		$XIcon = "X";

		$texts = [
		['text'=>$vendorno,'xpos'=>175,	'ypos'=>15,	'width'=>$width,	'size'=>$fontSize],
		['text'=>$date,'xpos'=>170,'ypos'=>24,'width'=>$width,'size'=>$fontSize],
		['text'=>$buyergroup,'xpos'=>176,	'ypos'=>32,'width'=>$width,	'size'=>$fontSize],

		['text'=>$companyname,'xpos'=>10,	'ypos'=>51,'width'=>$width,	'size'=>$fontSize],
		['text'=>$dbaname,'xpos'=>106,	'ypos'=>51,'width'=>$width,	'size'=>$fontSize],
		['text'=>$contactperson,'xpos'=>170,	'ypos'=>53,'width'=>$width,	'size'=>$fontSize],

		['text'=>$hqphysicaladdress,'xpos'=>10,	'ypos'=>61,'width'=>100,'size'=>5],
		['text'=>$ngmbuyer,'xpos'=>170,	'ypos'=>61,'width'=>$width,	'size'=>$fontSize],
		['text'=>$pmphysicaladdress,'xpos'=>10,	'ypos'=>71,'width'=>100,'size'=>5],
		['text'=>$underwhatname,'xpos'=>126,'ypos'=>73.5,'width'=>$width,'size'=>$fontSize],

		['text'=>$mainphone,'xpos'=>10,'ypos'=>81,'width'=>25,	'size'=>7],
		['text'=>$mainfax,'xpos'=>42,'ypos'=>81,'width'=>25,	'size'=>7],
		['text'=>$email,'xpos'=>74,'ypos'=>81,'width'=>60,	'size'=>7],
		['text'=>$website,'xpos'=>140,'ypos'=>81,'width'=>60,	'size'=>7],

		['text'=>$cfoname,'xpos'=>10,'ypos'=>87.5,'width'=>30,	'size'=>7],
		['text'=>$phone,'xpos'=>58,'ypos'=>87.5,'width'=>25,'size'=>7],
		['text'=>$fax,'xpos'=>105,'ypos'=>87.5,'width'=>25,	'size'=>7],
		['text'=>$email2,'xpos'=>140,'ypos'=>87.5,'width'=>60,	'size'=>7],

		['text'=>$fedtaxid,'xpos'=>122,'ypos'=>94,'width'=>$width,'size'=>$fontSize],
		['text'=>$dandbnum,'xpos'=>168,'ypos'=>94,'width'=>$width,'size'=>$fontSize],
        
        ['text'=>$lineofbusiness,'xpos'=>10,'ypos'=>102,'width'=>$width,'size'=>$fontSize],
		['text'=>$certificateliability,'xpos'=>74,'ypos'=>102,'width'=>$width,'size'=>$fontSize],
		['text'=>$certificatecontactname,'xpos'=>122,'ypos'=>102,'width'=>$width,'size'=>$fontSize],
		['text'=>$certificatecontactphone,'xpos'=>168,'ypos'=>102,'width'=>$width,'size'=>$fontSize],

		['text'=>$purchaseaddress,'xpos'=>7,'ypos'=>111,'width'=>85,'size'=>5],
		['text'=>$purchaseemail,'xpos'=>90,'ypos'=>111,'width'=>60,'size'=>7],
		['text'=>$purchasefax,'xpos'=>151,'ypos'=>111,'width'=>$width,'size'=>$fontSize],

		['text'=>$paymentterms,'xpos'=>10,'ypos'=>120,'width'=>$width,'size'=>$fontSize],

		['text'=>$paymentaddress,'xpos'=>10,'ypos'=>128,'width'=>100,'size'=>5],
		['text'=>$beveragemanufacture,'xpos'=>122,'ypos'=>128,'width'=>$width,'size'=>$fontSize],
		['text'=>$beveragedistributor,'xpos'=>168,'ypos'=>128,'width'=>$width,'size'=>$fontSize],

		['text'=>$principalownername,'xpos'=>10,'ypos'=>139,'width'=>$width,'size'=>$fontSize],
		['text'=>$principalownerphone,'xpos'=>74,'ypos'=>139,'width'=>$width,'size'=>$fontSize],
		['text'=>$owneremail,'xpos'=>122,'ypos'=>139,'width'=>60,'size'=>7],

		['text'=>$ownername,'xpos'=>10,'ypos'=>157,'width'=>$width,'size'=>$fontSize],
		['text'=>$ownerpercent,'xpos'=>58,'ypos'=>157,'width'=>$width,'size'=>$fontSize],
		['text'=>$owneraddress,'xpos'=>74,'ypos'=>157,'width'=>85,'size'=>5],
		['text'=>$ownerphone,'xpos'=>168,'ypos'=>157,'width'=>$width,'size'=>$fontSize],

		['text'=>$bankname,'xpos'=>10,'ypos'=>170,'width'=>25,'size'=>7],
		['text'=>$bankcontactname,'xpos'=>74,'ypos'=>170,'width'=>25,'size'=>7],
		['text'=>$bankphone,'xpos'=>122,'ypos'=>169,'width'=>25,'size'=>7],
		['text'=>$bankfax,'xpos'=>168,'ypos'=>169,'width'=>25,'size'=>7],

		['text'=>$bankaddress,'xpos'=>10,'ypos'=>175.5,'width'=>100,'size'=>5],
		['text'=>$bankcity,'xpos'=>138,'ypos'=>175.5,'width'=>15,'size'=>7],
		['text'=>$bankstate,'xpos'=>168,'ypos'=>175.5,'width'=>15,'size'=>7],
		['text'=>$bankzip,'xpos'=>185,'ypos'=>175.5,'width'=>15,'size'=>7],

		['text'=>$tradecompanyname,'xpos'=>10,'ypos'=>187.5,'width'=>25,'size'=>7],
		['text'=>$tradecontactname,'xpos'=>74,'ypos'=>187.5,'width'=>25,'size'=>7],
		['text'=>$tradephone,'xpos'=>122,'ypos'=>187.5,'width'=>25,'size'=>7],
		['text'=>$tradefax,'xpos'=>168,'ypos'=>187.5,'width'=>25,'size'=>7],

		['text'=>$tradeaddress,'xpos'=>10,'ypos'=>195.5,'width'=>60,'size'=>5],
		['text'=>$tradecity,'xpos'=>74,'ypos'=>195.5,'width'=>15,'size'=>7],
		['text'=>$tradestate,'xpos'=>105,'ypos'=>195.5,'width'=>15,'size'=>7],
		['text'=>$tradezip,'xpos'=>122,'ypos'=>195.5,'width'=>15,'size'=>7],
		['text'=>$tradeitemspurchased,'xpos'=>138,'ypos'=>195.5,'width'=>60,'size'=>5],


		['text'=>$tradecompanyname2,'xpos'=>10,'ypos'=>203.5,'width'=>25,'size'=>7],
		['text'=>$tradecontactname2,'xpos'=>74,'ypos'=>203.5,'width'=>25,'size'=>7],
		['text'=>$tradephone2,'xpos'=>122,'ypos'=>203.5,'width'=>25,'size'=>7],
		['text'=>$tradefax2,'xpos'=>168,'ypos'=>203.5,'width'=>25,'size'=>7],

		['text'=>$tradeaddress2,'xpos'=>10,'ypos'=>211.5,'width'=>60,'size'=>5],
		['text'=>$tradecity2,'xpos'=>74,'ypos'=>211.5,'width'=>15,'size'=>7],
		['text'=>$tradestate2,'xpos'=>105,'ypos'=>211.5,'width'=>15,'size'=>7],
		['text'=>$tradezip2,'xpos'=>122,'ypos'=>211.5,'width'=>15,'size'=>7],
		['text'=>$tradeitemspurchased2,'xpos'=>138,'ypos'=>211.5,'width'=>60,'size'=>5],

		['text'=>$acceptancename,'xpos'=>10,'ypos'=>237,'width'=>$width,'size'=>$fontSize],
		['text'=>$acceptancetitle,'xpos'=>105,'ypos'=>237,'width'=>$width,'size'=>$fontSize],

		['text'=>$acceptancephone,'xpos'=>95,'ypos'=>246,'width'=>$width,'size'=>$fontSize],

		];

      
		$buyersgroups =[
		['text'=>$XIcon,'xpos'=>161,'ypos'=>37,'width'=>$width,'size'=>$fontSize],
		['text'=>$XIcon,'xpos'=>180,'ypos'=>74,'width'=>$width,'size'=>$fontSize,],
		['text'=>$XIcon, 'xpos'=>195,'ypos'=>37,'width'=>$width,'size'=>$fontSize,]
		];

		$yesorno_hasyourfirm =[
		['text'=>$XIcon,'xpos'=>134.5,'ypos'=>70,'width'=>$width,'size'=>$fontSize],
		['text'=>$XIcon,'xpos'=>126,'ypos'=>70,'width'=>$width,'size'=>$fontSize]
		];

		$legalsstructures =[
		['text'=>$XIcon,'xpos'=>7,'ypos'=>95,'width'=>$width,'size'=>$fontSize],
		['text'=>$XIcon,'xpos'=>33,'ypos'=>95,'width'=>$width,'size'=>$fontSize],
		['text'=>$XIcon, 'xpos'=>51,'ypos'=>95,'width'=>$width,'size'=>$fontSize],
		['text'=>$XIcon, 'xpos'=>71,'ypos'=>95,'width'=>$width,'size'=>$fontSize],
		];

		$premises =[
		['text'=>$XIcon,'xpos'=>100,'ypos'=>95,'width'=>$width,'size'=>$fontSize],
		['text'=>$XIcon,'xpos'=>115,'ypos'=>95,'width'=>$width,'size'=>$fontSize]
		];

		$buyersgroups =[
		['text'=>$XIcon,'xpos'=>161,'ypos'=>37,'width'=>$width,'size'=>$fontSize],
		['text'=>$XIcon,'xpos'=>180,'ypos'=>37,'width'=>$width,'size'=>$fontSize,],
		['text'=>$XIcon, 'xpos'=>195,'ypos'=>37,'width'=>$width,'size'=>$fontSize,]
		];

		$yesorno_warehousedelivery =[
		['text'=>$XIcon,'xpos'=>73,'ypos'=>120,'width'=>$width,'size'=>$fontSize],
		['text'=>$XIcon,'xpos'=>62,'ypos'=>120,'width'=>$width,'size'=>$fontSize]
		];

		$yesorno_storedelivery =[
		['text'=>$XIcon,'xpos'=>107,'ypos'=>120,'width'=>$width,'size'=>$fontSize],
		['text'=>$XIcon,'xpos'=>96,'ypos'=>120,'width'=>$width,'size'=>$fontSize]
		];

		$yesorno_registeredconservation =[
		['text'=>$XIcon,'xpos'=>163,'ypos'=>120,'width'=>$width,'size'=>$fontSize],
		['text'=>$XIcon,'xpos'=>152,'ypos'=>120,'width'=>$width,'size'=>$fontSize]
		];

        $ownerscompaniestypes =[
		['text'=>$XIcon,'xpos'=>24.5,'ypos'=>144.5,'width'=>$width,'size'=>$fontSize],
		['text'=>$XIcon,'xpos'=>49,'ypos'=>144.5,'width'=>$width,'size'=>$fontSize]
		];


        if(isset($buyergroupid)) $texts[] = $buyersgroups[$buyergroupid];
		if(isset($hasyourfirmever)) $texts[] = $yesorno_hasyourfirm[abs($hasyourfirmever)];
		if(isset($legalstructureid)) $texts[] = $legalsstructures[$legalstructureid];
		if(isset($premiseid)) $texts[] = $premises[$premiseid];

		if(isset($warehousedelivery)) $texts[] = $yesorno_warehousedelivery[abs($warehousedelivery)];
		if(isset($storedelivery)) $texts[] = $yesorno_storedelivery[abs($storedelivery)];
		if(isset($registeredconservation)) $texts[] = $yesorno_registeredconservation[abs($registeredconservation)];

		if(isset($ownercompanytypeid)) $texts[] = $ownerscompaniestypes[$ownercompanytypeid];
		

		foreach ($texts as $key => $text) {
			$mpdf->WriteFixedPosHTML("<span style='color:blue'>{$text['text']}</span>", $text['xpos'], $text['ypos'], $text['width'], $text['size'], 'auto');
		}
		
		//$mpdf->Output();
		$mpdf->Output('conflictform.pdf','D');   
		exit; 
		

	}


	

}