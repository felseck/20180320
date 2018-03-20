<?php

class buyersconflictformsModel extends DB\SQL\Mapper{

    public function __construct(DB\SQL $db, $table_) {
        parent::__construct($db,$table_);
    }

     public function getConflictFormsByBuyer($buyerid) {
        $buyeridcond = isset($buyerid)?"AND buyerid = {$buyerid}":'';
       

        $query = "SELECT buyersconflictforms.id, buyersconflictforms.filename, buyersconflictforms.fullfilename, buyersconflictforms.created,
        businesstypesdef.name AS businesstypename, users.id AS userid,users.name AS username
        FROM buyersconflictforms
        LEFT JOIN businesstypesdef ON businesstypesdef.id = buyersconflictforms.businesstypeid
        LEFT JOIN users ON users.id = buyersconflictforms.userid
        WHERE 1 {$buyeridcond} ORDER BY users.id";
        return $this->db->exec($query);
    }


     public function getConflictForms($userid,$buyerid,$businesstypeid,$userguestid) {

        $useridcond = isset($userid)?"AND userid = {$userid}":'';
        $buyeridcond = isset($buyerid)?"AND buyerid = {$buyerid}":'';
        $businesstypeidcond = isset($businesstypeid)?"AND businesstypeid = {$businesstypeid}":'';

        $wherecond = "{$useridcond} {$buyeridcond} {$businesstypeidcond}";

        if($userguestid) $wherecond = "AND userguestid = {$userguestid}";

        $query = "SELECT buyersconflictforms.id, buyersconflictforms.filename, buyersconflictforms.fullfilename, buyersconflictforms.created
        FROM buyersconflictforms
        WHERE 1 {$wherecond}";
        return $this->db->exec($query);
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

 public function getByWhere($where) {
    $this->load($where);

    $result = [];

    while (!$this->dry() ) {
        
        $result[] = $this->cast();
        $this->next();
    }

    return  $result;
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


   /* public function getByWhere($where_) {
        $this->load($where_);
    }*/
}