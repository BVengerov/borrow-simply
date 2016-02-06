<?php
	namespace Home;
	require_once("DbObj.php");

	$db = new DbObj;
	$json = json_encode($db->getRows());
?>