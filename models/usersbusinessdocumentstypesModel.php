<?php

class usersbusinessdocumentstypesModel extends DB\SQL\Mapper{

    public function __construct(DB\SQL $db, $table_) {
        parent::__construct($db,$table_);
    }


    public function all() {
        $this->load();
        return $this->query;
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

        $query = "DELETE FROM {$this->table} WHERE userid = {$userid}";
        return $this->db->exec($query);
    }

    public function delete($id) {
        $this->load(array('id=?',$id));
        $this->erase();
    }
}