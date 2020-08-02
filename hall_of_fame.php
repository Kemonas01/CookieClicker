<?php
require './autoload.php';

function fame($n){
    $stmt = MyPDO::getInstance()->prepare(<<<SQL
            select nickname, score 
            from hall_of_fame 
            order by score DESC 
            limit 5
            
SQL
        );
    $stmt->bindParam(1, $n);
    $stmt->execute();
    return $stmt->fetchAll();
}
echo json_encode(fame(5));