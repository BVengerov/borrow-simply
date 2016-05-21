<?php
	class DbObj
	{
		/* 	DB phones_list: [ID, Name, Type, OS, Display, Resolution, Home, Status, Date, Comment, History]
			DB users: 		[ID, Login, Full_name, Email] 													*/

		private $_host = 'localhost';
		private $_dbName = 'items';
		private $_charset = 'utf8';
		private $_username = 'root';
		private $_password = '';
		private $_tableNameItems = 'phones_list';
		private $_tableNameUsers = 'users';
		private $_dbObj;

		private function _getDb()
		{
			if (!$this->_dbObj)
			{
				$this->_dbObj = new PDO(
						"mysql:host=$this->_host;dbname=$this->_dbName;charset=$this->_charset",
						"$this->_username",
						"$this->_password",
						array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
					);
			}
			return $this->_dbObj;
		}

		public function getItems()
		{
			return $this->_getAllTableData($this->_tableNameItems);
		}

		public function getUsers()
		{
			return $this->_getAllTableData($this->_tableNameUsers);
		}

		public function takeItem($id, $status)
		{
			$date = $this->_getDate();
			$query = "UPDATE $this->_tableNameItems SET Status = :status, Date = NOW(), History = CONCAT(:history,History) WHERE Status='Free' AND ID = :id";
			return $this->_executeQuery($query, [':status'=>$status, ':history'=>"$status [$date]\n", ':id'=>$id]);
		}

		public function returnItem($id, $status)
		{
			$date = $this->_getDate();
			$query = "UPDATE $this->_tableNameItems SET Status=:status, Date = NOW(), History = CONCAT(:history,History) WHERE Status!='Free' AND ID = :id";
			return $this->_executeQuery($query, [':status'=>$status, ':history'=>"Returned [$date]\n", ':id'=>$id]);
		}

		public function addNewItem($item, $username)
		{
			$date = $this->_getDate();
			foreach (['name', 'type', 'os', 'display', 'resolution', 'home'] as $key)
			{
				if (!array_key_exists($key, $item))
				{
					header("HTTP/1.1 500 Internal Server Error");
					return;
				}
			}

			$query =
				"INSERT INTO $this->_tableNameItems
				(Name, Type, OS, Display, Resolution, Home, Status, Date, History)
				VALUES
				(:name, :type, :os, :display, :resolution, :home, 'Free', NOW(), :history)";

			return $this->_executeQuery(
				$query,
				[':name'=>$item['name'], ':type'=>$item['type'], ':os'=>$item['os'], ':display'=>$item['display'], ':resolution'=>$item['resolution'], ':home'=>$item['home'], ':history'=>"Phone added by $username [$date]"]
			);
		}

		public function updateComment($id, $comment)
		{
			$query = "UPDATE $this->_tableNameItems SET Comment = :comment WHERE ID = :id";
			return $this->_executeQuery($query, [':comment'=>$comment, ':id'=>$id]);
		}

		private function _getAllTableData($tableName)
		{
			// If going global, prepare & execute should be used here to be secure of SQL injection
			$statement = $this->_getDb()->query("SELECT * FROM $tableName");
			$result = $statement->fetchAll(PDO::FETCH_ASSOC);
			return $result;
		}

		private function _executeQuery($query, $data)
		{
			var_dump($query);
			var_dump($data);
			var_dump($this->_getDb()->prepare($query));
			$result = $this->_getDb()->prepare($query)->execute($data);
			if (!$result)
			{
				header("HTTP/1.1 500 Internal Server Error");
			}
			return $result;
		}

		private function _getDate()
		{
			return date('H:i d-m-Y');
		}
	}
?>
