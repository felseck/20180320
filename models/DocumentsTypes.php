<?php

class DocumentsTypes extends DB\SQL\Mapper{

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'documentstypesdef');
    }

    public function all($byfile, $userid_) {

       

        

         if($byfile) {
            $byfile_ = "AND filename != ''";

            $query = "SELECT supermarketid FROM userssupermarkets WHERE  userid = {$userid_} AND supermarketid = 20";//supermercado Nortgate
            $spresult = $this->db->exec($query);

            if(count($spresult) == 0) $byfile_ = "AND filename != '' AND id NOT IN (10)"; //Supplier application
         }


        $query = "SELECT id, name, description, name_es, description_es, filename, typename, fullfilename, id AS value, name AS label 
        FROM documentstypesdef 
        WHERE 1 {$byfile_} ORDER BY name";
        return $this->db->exec($query);
    }


 public function getById($documenttypeid) {
        $query = "SELECT * FROM documentstypesdef WHERE id={$documenttypeid}";
        return $this->db->exec($query)[0];
    }

/*
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
       return $this->update();
    }


    public function deleteByBusinessType($businesstypeid) {
        $this->load(array('businesstypeid=?',$businesstypeid));
        $this->erase();
    }

    public function deleteById($id) {
        $query = "DELETE FROM documentstypesdef WHERE id={$id}";
        return $this->db->exec($query);
    }

    public function delete($id) {
        $this->load(array('id=?',$id));
        $this->erase();
    }
}