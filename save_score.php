<?php
require './autoload.php';

function save_score($data){
    $nickname = $data['nickname'];
    $score = $data['score'];
    $stmt = MyPDO::getInstance()->prepare(<<<SQL
            INSERT INTO hall_of_fame
            VALUES (null, NOW() , :nickname, :score)
SQL
        );
        $stmt->execute(['nickname'=>$nickname, 'score'=>$score]);
}


save_score($_REQUEST);