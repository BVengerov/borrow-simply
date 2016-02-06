<?php

require_once('../classes/ItemRepository.php');

header('Content-type: application/json');

//For security reasons, will be automatically stripped by AngularJS
echo ")]}'\n";

ItemRepository::takeItem($_POST['id']);
?>