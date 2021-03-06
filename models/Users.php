<?php

class Users extends DB\SQL\Mapper{

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'users');
    }


    public function bysupermarket($supermarketsids) {

        if(!$options_['page']) $options_['page'] = 0;
        if(!$options_['limit']) $options_['limit'] = 100000000000;

        $offset = $options_['page'] * $options_['limit'];


        $query = "SELECT count(*) AS Total FROM users  
                   WHERE 1 ";
        $TotalRecords = $this->db->exec($query)[0]['Total'];

        $TotalPages = $TotalRecords >= $options_['limit']?$TotalRecords/$options_['limit']:1;

         

         if(count($supermarketsids) > 0) {
            $supermarketsids_ = implode(',',$supermarketsids);
            $supermarketsidscond = "AND supermarketid IN ({$supermarketsids_})";
        }

         $query = "SELECT users.* FROM users
                   LEFT JOIN userssupermarkets ON users.id =  userssupermarkets.userid
                   WHERE 1 {$supermarketsidscond}";

        
        $Records = $this->db->exec($query);

        $paginate = [];
        $paginate['subset'] = $Records;
        $paginate['total'] = $TotalRecords;
        $paginate['limit'] = $options_['limit'];
        $paginate['count'] = $TotalPages;
        $paginate['pos'] = $options_['page'];

        return $paginate;

    }



    public function all_($options_ = false) {
        if(!$options_['page']) $options_['page'] = 0;
        if(!$options_['limit']) $options_['limit'] = 10;
        


        $this->load();
         //virtuals
        $this->value = "id";

        if(isset($this->name)) {
            $this->label = "name";
            $this->text = "name";
        }


        //virtuals
        $paginate = $this->paginate($options_['page'], $options_['limit']);

        $array = [];
        
        foreach ($paginate['subset'] as $key => $subset) { 
           $sub = $subset->cast();
           $sub['password'] = '******';

           if($sub['username']) {
            $sub['label'] = "{$sub['label']} - {$sub['username']}"; 
            $sub['text'] = $sub['label'];
        }

        $array[] = $sub;


    }

    $paginate['subset'] = $array;

    return $paginate;
}

public function getByDocumentsExpireDates(){

    $query = "SELECT *, DATEDIFF(documentsexpiredate, CURDATE()) AS days
    FROM users
    WHERE hasdocumentsexpiredates = -1 AND documentsexpiredate IS NOT NULL AND DATEDIFF(documentsexpiredate, CURDATE()) >= 0 AND notuploadednum >0 AND DATEDIFF(documentsexpiredate, CURDATE()) <= 5";

    return $this->db->exec($query);

}

public function usersByExpiredFiles() {

 $query = "SELECT usersfiles.id as userfileid, usersfiles.expiredate,users.id AS userid,users.name,users.lastname,users.username,users.companyname
 FROM usersfiles 
 LEFT JOIN users ON users.id = usersfiles.userid
 WHERE usersfiles.expiredate < CURDATE() AND usersfiles.expiredate != '0000-00-00' AND users.id IS NOT NULL AND aproved = -1 AND emailsent = 0 AND expired = -1";


 return $this->db->exec($query);

}


public function getuserswillexpirefiles() {

 $query = "SELECT usersfiles.id as userfileid, usersfiles.expiredate,users.id AS userid,users.name,users.lastname,users.username,users.companyname, lastemailwillexpirefilesdate
 FROM usersfiles 
 LEFT JOIN users ON users.id = usersfiles.userid
  WHERE users.id IS NOT NULL AND usersfiles.expiredate > CURDATE() AND usersfiles.expiredate != '0000-00-00'  AND (DATEDIFF(usersfiles.expiredate, CURDATE()) = 30 OR DATEDIFF(usersfiles.expiredate, CURDATE()) = 15 OR DATEDIFF(usersfiles.expiredate, CURDATE()) <= 7) GROUP BY users.id";


 return $this->db->exec($query);

}

public function allBuyerUsers($queycond_,$id) {

    $query = "SELECT users.id,users.name,users.lastname,users.username,users.companyname, users.id AS value, CONCAT(users.name,' - ',users.username) AS label
    FROM users 
    LEFT JOIN usersbusinesstypes ON usersbusinesstypes.userid = users.id
    WHERE 1 {$queycond_} GROUP BY users.id ORDER BY users.companyname ASC";

    if($queycond_ == -1){


        $query = "SELECT users.id,users.name,users.lastname,users.username,users.companyname, users.id AS value, users.name AS label
        FROM buyersuserscustom
        LEFT JOIN users ON users.id = buyersuserscustom.userid
        WHERE buyerid = {$id} ORDER BY users.companyname ASC";
    }
    return $this->db->exec($query);
}

public function allsupermarketusers($id){
    $query = "SELECT users.*, users.id AS value, users.name AS label
    FROM userssupermarkets
    LEFT JOIN users ON users.id = userssupermarkets.userid
    WHERE supermarketid = {$id} ORDER BY users.companyname ASC";

    return $this->db->exec($query);
}

public function allUsers($queycond_,$adminid) {

    $query = "SELECT users.id,users.haspayments,users.totalpayments,users.name,users.lastname,users.username,users.buyergroupid,users.companyname, users.id AS value, CONCAT(users.name,' - ',users.username) AS label, rejectednum,approvednum,expirednum,notuploadednum,uploadednum,pendingchecknum, users.approved
    FROM users 
    LEFT JOIN usersbusinesstypes ON usersbusinesstypes.userid = users.id    
    WHERE 1 {$queycond_} GROUP BY users.id ORDER BY users.companyname ASC";

    if($queycond_ == -1){


        $query = "SELECT users.id,users.name,users.lastname,users.username,users.companyname, users.id AS value, users.name AS label
        FROM adminsuserscustom
        LEFT JOIN users ON users.id = adminsuserscustom.userid        
        WHERE adminid = {$adminid} ORDER BY users.companyname ASC";
    }
    return $this->db->exec($query);
}

public function updatelastuploaddate($id){
    $query = "UPDATE users SET lastuploaddate = now() WHERE id = {$id}";
    return $this->db->exec($query);
}

public function all() {
    $this->load();
    return $this->query;
}

    /* 
    public function getById($id) {
        $this->load(array('id=?',$id));
        return $this->query;
    }
    */

    public function getBusinessTypes($id) {
        $query = "SELECT * 
        FROM usersbusinesstypes
        WHERE userid={$id}";
        return $this->db->exec($query);
    }


    public function getsupermarkets($id) {
        $query = "SELECT * 
        FROM userssupermarkets
        WHERE userid={$id}";
        return $this->db->exec($query);
    }

    public function getBusinessDocumentsTypes($id) {
        $query = "SELECT * 
        FROM usersbusinessdocumentstypes
        WHERE userid={$id}";
        return $this->db->exec($query);
    }

    public function getById($id) {
        $query = "SELECT * 
        FROM users 
        WHERE id={$id}";
        return $this->db->exec($query)[0];
    }

    public function getByName($name) {
        $this->load(array('username=?', $name));
    }

    public function add() {
        $this->copyFrom('POST');
        if(isset($this->created)) $this->created = date('Y-m-d H:i:s');
        $this->save();
    }

    public function edit($id) {
        $this->load(array('id=?',$id));
        $this->copyFrom('POST');
        if(isset($this->modified)) $this->modified = date('Y-m-d H:i:s');
        $this->update();
    }

    public function delete($id) { 
     $query = "DELETE FROM users 
     WHERE id={$id}";
     return $this->db->exec($query);
 }
}