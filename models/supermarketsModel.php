<?php

class supermarketsModel extends DB\SQL\Mapper{

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


    function setwherequery($array_, $row_){
       $keys = array_keys($array_);
 

        $rowresult = [];

       foreach ($keys as $key => $value) {
           if($row_[$value] == $array_[$value]) $rowresult[] = -1;
           else $rowresult[] = 0;
       }

       return in_array(-1,$rowresult);
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
          if($options_['query']) {
           if($this->setwherequery($options_['query'], $sub)) $array[] = $sub;
          }else $array[] = $sub;
        }

        $paginate['subset'] = $array;

        return $paginate;
    }

    public function getInfoById($id){

    $query = "SELECT (SELECT name FROM supermarkets as sm WHERE id = supermarkets.mainsupermarketid) AS name, primarycontact  FROM supermarkets WHERE id = {$id}";

    return $this->db->exec($query)[0];
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


 public function getByName($name) {
        $this->load(array('username=?', $name));
    }
   

}