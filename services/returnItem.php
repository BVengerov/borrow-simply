<?php

require_once('../classes/ItemRepository.php');


$postdata = file_get_contents("php://input");
$id = json_decode($postdata);
ItemRepository::returnItem($id);

?>