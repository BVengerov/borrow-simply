<?php

require_once('../classes/ItemRepository.php');


$postdata = file_get_contents("php://input");
$item = json_decode($postdata, true);

ItemRepository::addNewItem($item);

?>