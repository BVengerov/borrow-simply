<?php

require_once('../classes/ItemRepository.php');

$postdata = file_get_contents("php://input");
$data = json_decode($postdata, true);
return ItemRepository::updateComment($data['id'], $data['comment']);

?>