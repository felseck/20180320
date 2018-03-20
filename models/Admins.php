<?php

class Admins extends DB\SQL\Mapper{

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'admins');
    }

    
public function getNotificationsByAdmin($adminid) {
    $query = "SELECT REPLACE(notifications.message, '{name}', IF(buyers.name != '',buyers.name, IF(notificationsadmins.notificationid=2,'',users.name))) AS message, notificationsadmins.created, isread,users.id as userid, notificationsadmins.id AS notificationid
    FROM notificationsadmins
    LEFT JOIN notifications ON notifications.id = notificationsadmins.notificationid
    LEFT JOIN users ON users.id = notificationsadmins.userid
    LEFT JOIN buyers ON buyers.id = notificationsadmins.buyerid
    WHERE notificationsadmins.adminid = {$adminid} ORDER by notificationsadmins.created DESC LIMIT 50
        ";
    return $this->db->exec($query);
    
}

    public function getAdminsByUser($userid, $businesstypeid) {
        $query = "SELECT id AS adminid
        FROM admins 
        WHERE businesstypeid = 0 OR businesstypeid IS NULL
        UNION SELECT adminsuserscustom.adminid
        FROM adminsuserscustom 
        LEFT JOIN admins ON admins.id = adminsuserscustom.adminid
        WHERE adminsuserscustom.userid ={$userid} AND admins.customusers = -1 
        UNION SELECT admins.id AS adminid
        FROM usersbusinesstypes 
        LEFT JOIN admins ON admins.businesstypeid = usersbusinesstypes.businesstypeid
        WHERE usersbusinesstypes.userid = {$userid} AND admins.customusers = 0
        ";

       /* if(isset($businesstypeid)){
            $businesstypeidcond= "AND usersbusinesstypes.businesstypeid = {$businesstypeid}";
            $query = "{$query} {$businesstypeidcond}";
        }*/

        $query = "SELECT adminid FROM ({$query}) AS admins_ WHERE 1 GROUP BY adminid";

        return $this->db->exec($query);
    }



    public function all() {
        $query = "SELECT '*****' AS password, admins.id,admins.name,admins.lastname,admins.username, admins.businesstypeid, IF(admins.businesstypeid = 0,'All',businesstypesdef.name)  AS businesstype
        FROM admins 
        LEFT JOIN businesstypesdef ON businesstypesdef.id = admins.businesstypeid
        WHERE 1";
        return $this->db->exec($query);
    }



  /*  public function all() {
        $this->load();
        return $this->query;
    }*/

  /*  public function getById($id) {
        $this->load(array('id=?',$id));
        return $this->query;
    }*/

    public function getProfileById($id) {
        $query = "SELECT admins.name,admins.lastname, IF(businesstypesdef.name is NULL, 'Admin',businesstypesdef.name) AS businessname
        FROM admins 
        LEFT JOIN businesstypesdef ON businesstypesdef.id = admins.businesstypeid
        WHERE admins.id={$id}";
        return $this->db->exec($query)[0];
    }

    public function getUsersByAdmin($adminid) {
        $query = "SELECT userid
        FROM adminsuserscustom
        WHERE adminid= {$adminid}";
        return $this->db->exec($query);
    }

    public function deleteUsersByADmin($adminid) {
       $query = "DELETE FROM adminsuserscustom
       WHERE adminid= {$adminid}";
       return $this->db->exec($query);
   }

   public function getById($id) {
    $query = "SELECT * FROM admins WHERE id={$id}";
    return $this->db->exec($query)[0];
}

public function getByName($name) {
    $this->load(array('username=?', $name));
}

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
    $query = "DELETE FROM admins WHERE id={$id}";
    return $this->db->exec($query);
}

public function delete($id) {
    $this->load(array('id=?',$id));
    $this->erase();
}
}