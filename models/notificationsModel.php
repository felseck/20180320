<?php

class notificationsModel extends DB\SQL\Mapper{

    public function __construct(DB\SQL $db, $table_) {
        parent::__construct($db,$table_);
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
        if(isset($this->created)) $this->created = date('Y-m-d H:i:s');
        $this->save();
    }

    public function editById($id) {
        $this->load(array('id=?',$id));
        $this->copyFrom('POST');
        if(isset($this->modified)) $this->modified = date('Y-m-d H:i:s');
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
}