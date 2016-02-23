<?php

require_once("../DbObj.php");
require_once("User.php");

class UserRepository
{
	private static $db = null;
	private static $users = array();

	private static function _getDb()
	{
		if (is_null(self::$db))
		{
			self::$db = new DbObj;
		}
		return self::$db;
	}

	protected static function init()
	{
		$dbRows = self::_getDb()->getUsers();
		$dbData = array();
		foreach ($dbRows as $row)
		{
			array_push($dbData,
					new User(
						$row['ID'],
						$row['Login'],
						$row['Full_name'],
						$row['Email']
				)
			);
		}
		self::$users = $dbData;
	}

	public static function getUsers()
	{
		self::init();
		return self::$users;
	}
}