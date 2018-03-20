<?php

class BusinessTypes extends DB\SQL\Mapper{

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'businesstypesdef');
    }

    public function all() {
        $query = "SELECT *, id AS value, name AS label 
        FROM businesstypesdef 
        WHERE 1 ORDER BY name ASC";
        return $this->db->exec($query);
    }

    public function allDocuments($businesstypeid) {
        $query = "SELECT documentstypesdef.id AS value, documentstypesdef.name AS label 
        FROM businessdocumentstypes
        LEFT JOIN documentstypesdef ON documentstypesdef.id = businessdocumentstypes.documenttypeid
        WHERE businessdocumentstypes.businesstypeid = {$businesstypeid}";
        return $this->db->exec($query);
    }


    public function getById($businesstypeid) {
        $query = "SELECT * FROM businesstypesdef WHERE id={$businesstypeid}";
        return $this->db->exec($query)[0];
    }


   /* public function getById($id) {
        $this->load(array('id=?',$id));
        return $this->query;
    }*/

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


     public function deleteById($id) {
        $query = "DELETE FROM businesstypesdef WHERE id={$id}";
        return $this->db->exec($query);
    }


    public function delete($id) {
        $this->load(array('id=?',$id));
        $this->erase();
    }
}