<?php
	// Connecting, selecting database
	$link = mysql_connect('127.0.0.1', 'root', '') or die('Could not connect: ' . mysql_error());

	mysql_select_db('items') or die('Could not select database');
	if ($_POST['id'])
	{
		$id=mysql_escape_String($_POST['id']);
		$firstname=mysql_escape_String($_POST['firstname']);
		$lastname=mysql_escape_String($_POST['lastname']);
		$sql = "update fullnames set firstname='$firstname', lastname='$lastname' where id='$id'";
		mysql_query($sql);
	}

	// Closing connection
	mysql_close($link);
?>