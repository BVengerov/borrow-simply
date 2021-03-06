<?php

require_once("../DbObj.php");
require_once("Item.php");

class ItemRepository
{
	private static $db = null;
	private static $items = array();

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
		$dbRows = self::_getDb()->getItems();
		$dbData = array();
		foreach ($dbRows as $row)
		{
			array_push($dbData,
					new Item(
						$row['ID'],
						$row['Name'],
						$row['Type'],
						$row['OS'],
						$row['Display'],
						$row['Resolution'],
						$row['Home'],
						$row['Status'],
						$row['Date'],
						$row['Account'],
						$row['Comment'],
						$row['History'],
						$row['UDID']
				)
			);
		}
		self::$items = $dbData;
	}

	public static function getItems()
	{
		self::init();
		return self::$items;
	}

	public static function takeItem($id, $status)
	{
		$db = self::_getDb();
		$return = $db->takeItem($id, $status);
		return $result;
	}

	public static function returnItem($id)
	{
		$db = self::_getDb();
		$result = $db->returnItem($id, 'Free');
		return $result;
	}

	public static function addNewItem($item, $username)
	{
		$db = self::_getDb();
		$result = $db->addNewItem($item, $username);
		return $result;
	}

	public static function updateComment($id, $comment)
	{
		$db = self::_getDb();
		$result = $db->updateComment($id, $comment);
		return $result;
	}
}