<?php

class UsersFiles extends DB\SQL\Mapper{

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'usersfiles');
    }

    public function all() {
        $this->load();
        return $this->query;
    }

    public function getById($id) {
        $this->load(array('id=?',$id));
        return $this->query;
    }

    public function getByUser($userid, $businesstypeid) {
        $query = "
        SELECT usersfiles.id,usersfiles.rejectedreason, usersfiles.status, usersfiles.rejected, usersfiles.aproved, usersfiles.expiredate,usersfiles.expired,businessdocumentstypes.businesstypeid, documentstypesdef.name, documentstypesdef.name_es, usersfiles.filename,usersfiles.fullfilename, documentstypesdef.id AS documenttypeid 
        FROM businessdocumentstypes 
        LEFT JOIN documentstypesdef ON documentstypesdef.id = businessdocumentstypes.documenttypeid 
        LEFT JOIN usersfiles ON usersfiles.documenttypeid = documentstypesdef.id AND usersfiles.userid={$userid} AND usersfiles.businesstypeid = businessdocumentstypes.businesstypeid
        WHERE businessdocumentstypes.businesstypeid={$businesstypeid} 
        ORDER BY documentstypesdef.name";

        $Files = $this->db->exec($query);

        $query = "
        SELECT * FROM usersbusinessdocumentstypes WHERE businesstypeid={$businesstypeid} AND userid = {$userid}
        ";

        $CustomFiles = $this->db->exec($query);
        $Files_ = $Files;

        if(count($CustomFiles) >0)  $Files_ = [];

        foreach ($Files as $key => $file) {
            
            foreach ($CustomFiles as $key_ => $customfile) {
              if($file['documenttypeid'] == $customfile['documenttypeid'])  $Files_[] = $file;
            }
        }


       return $Files_;
    }

   /* public function getByUser($userid, $businesstypeid) {
        $query = "SELECT * FROM usersfiles WHERE userid={$userid} AND businesstypeid={$businesstypeid}";
       return $this->db->exec($query);
    }*/

    public function add() {
        $this->copyFrom('POST');
        $this->save();
    }

    public function edit($id) {
        $this->load(array('id=?',$id));
        $this->copyFrom('POST');
        $this->update();
    }

    public function delete($id) {
        $this->load(array('id=?',$id));
        $this->erase();
    }


    public function deleteById($id) {
        $query = "DELETE FROM usersfiles WHERE id={$id}";
    
        return $this->db->exec($query);
    }

    public function updateExpiredFiles() {
        $query = "UPDATE usersfiles SET expired = -1 
        WHERE expiredate < curdate() AND expiredate != '0000-00-00' AND expired = 0";
        return $this->db->exec($query);
    }

    public function getExpiredFiles($userid) {
        $query = "SELECT users.name AS primarycontact,usersfiles.filename, documentstypesdef.name AS documenttype
                  FROM usersfiles
                  LEFT JOIN documentstypesdef ON documentstypesdef.id = usersfiles.documenttypeid
                  LEFT JOIN users ON users.id = usersfiles.userid
                  WHERE usersfiles.userid={$userid} AND aproved = -1 AND expired = -1 AND emailsent =0";
        return $this->db->exec($query);
    }

    public function getfileswillexpire($userid) {
        $query = "SELECT users.name AS primarycontact,usersfiles.filename, documentstypesdef.name AS documenttype, usersfiles.expiredate
                  FROM usersfiles
                  LEFT JOIN documentstypesdef ON documentstypesdef.id = usersfiles.documenttypeid
                  LEFT JOIN users ON users.id = usersfiles.userid
                  WHERE usersfiles.userid={$userid} AND usersfiles.expiredate > CURDATE() AND usersfiles.expiredate != '0000-00-00'  AND (DATEDIFF(usersfiles.expiredate, CURDATE()) = 30 OR DATEDIFF(usersfiles.expiredate, CURDATE()) = 15 OR DATEDIFF(usersfiles.expiredate, CURDATE()) <= 7) ";
        return $this->db->exec($query);
    }


}