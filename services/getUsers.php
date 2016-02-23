<?php

require_once('../classes/UserRepository.php');

header('Content-type: application/json');

//For security reasons, will be automatically stripped by AngularJS
echo ")]}'\n";

$users = UserRepository::getUsers();
echo json_encode($users);
?>