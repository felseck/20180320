<?php

class userssupermarketsModel extends DB\SQL\Mapper{

    public function __construct(DB\SQL $db, $table_) {
        parent::__construct($db,$table_);
    }

  


    public function pagination($options_ = false) {

        if(!$options_['page']) $options_['page'] = 0;
        if(!$options_['limit']) $options_['limit'] = 10;

        $offset = $options_['page'] * $options_['limit'];


        $query = "SELECT count(*) AS Total FROM {$this->table}  
                   WHERE 1 ";
        $TotalRecords = $this->db->exec($query)[0]['Total'];

        $TotalPages = $TotalRecords >= $options_['limit']?$TotalRecords/$options_['limit']:1;

         $query = "SELECT * FROM {$this->table}  
                   WHERE 1 ";

         $SetLimit = " LIMIT {$offset},{$options_['limit']}";

         if($options_['query']) $query = $options_['query'];

         $query = "{$query}{$SetLimit}";

        
        $Records = $this->db->exec($query);

        $paginate = [];
        $paginate['subset'] = $Records;
        $paginate['total'] = $TotalRecords;
        $paginate['limit'] = $options_['limit'];
        $paginate['count'] = $TotalPages;
        $paginate['pos'] = $options_['page'];

        return $paginate;

    }


    public function all($options_ = false) {
        if(!$options_['page']) $options_['page'] = 0;
        if(!$options_['limit']) $options_['limit'] = 10;
        


        $this->load();
         //virtuals
        $this->value = "id";
        if(isset($this->name)) $this->label = "name";
       
        //virtuals
        $paginate = $this->paginate($options_['page'], $options_['limit']);

        $array = [];
        
        foreach ($paginate['subset'] as $key => $subset) { 
           $sub = $subset->cast();
           $sub['password'] = '******';
           $array[] = $sub;
        }

        $paginate['subset'] = $array;

        return $paginate;
    }

    public function getById($id) {
        $this->load(array('id=?',$id));
        return $this->cast();
    }

    public function add() {
        $this->copyFrom('POST');
        $this->save();
    }

    public function editById($id) {
        $this->load(array('id=?',$id));
        $this->copyFrom('POST');
        $this->update();
    }

    public function deleteById($id_) {
        $this->load(array('id=?',$id_));
        $this->erase();
    }

    public function deleteByWhere($where_) {
        $this->load($where_);
        $this->erase();
    }


    public function getByWhere($where_) {
        $this->load($where_);
    }

     public function deleteByUserId($userid) {

        $query = "DELETE FROM {$this->table} WHERE userid = {$userid}";
       return $this->db->exec($query);
    }

   
}