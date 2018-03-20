<?php

class BusinessDocumentsTypes extends DB\SQL\Mapper{

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'businessdocumentstypes');
    }

    public function all() {
        $query = "SELECT id AS value, name AS label 
        FROM businessdocumentstypes 
        WHERE 1";
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


    public function deleteByBusinessType($businesstypeid) {

         $query = "DELETE FROM businessdocumentstypes WHERE businesstypeid = {$businesstypeid}";
       return $this->db->exec($query);
       
        /*
        $this->load(array('businesstypeid=?',$businesstypeid));
        $this->erase();

        */
    }

    public function delete($id) {
        $this->load(array('id=?',$id));
        $this->erase();
    }
}