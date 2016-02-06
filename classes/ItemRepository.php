<?php

require_once("../DbObj.php");
require_once("Item.php");

class ItemRepository
{
	private static $items = array();

	protected static function init()
	{
		$db = new DbObj;
		$dbRows = $db->getRows();

		$dbData = array();
		foreach ($dbRows as $row)
		{
			array_push($dbData,
					new Item(
						$row['ID'],
						$row['Phone_name'],
						$row['OS'],
						$row['Status']
				)
			);
		}
		self::$items = $dbData;
	}

	public static function getItems()
	{
		if (count(self::$items) === 0)
		{
			self::init();
		}
		return self::$items;
	}

	public static function takeItem($id, $username)
	{
		$db = new DbObj;
		$dbRows = $db->takeItem($id, $username);
	}
}