<?php

class UsersBusinessTypes extends DB\SQL\Mapper{

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'usersbusinesstypes');
    }

    public function all() {
        $this->load();
        return $this->query;
    }

    public function getByUser($userid, $query_) {
        $query = "SELECT businesstypesdef.id,businesstypesdef.filename,businesstypesdef.fullfilename, businesstypesdef.name,  users.name AS primarycontact, users.companyname, users.username, businesstypesdef.name_es
        FROM usersbusinesstypes 
        LEFT JOIN businesstypesdef ON businesstypesdef.id = usersbusinesstypes.businesstypeid 
        LEFT JOIN users ON users.id = usersbusinesstypes.userid
        WHERE usersbusinesstypes.userid={$userid} {$query_} ORDER BY businesstypesdef.name";
       return $this->db->exec($query);
    }

    public function getById($id) {
        $this->load(array('id=?',$id));
        return $this->query;
    }

    /*public function getByName($name) {
        $this->load(array('username=?', $name));
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

    public function deleteByUserId($userid) {

        $query = "DELETE FROM usersbusinesstypes WHERE userid = {$userid}";
       return $this->db->exec($query);


        /*
        $this->load(array('userid=?',$userid));
        $this->erase();*/
    }

    public function delete($id) {
        $this->load(array('id=?',$id));
        $this->erase();
    }
}