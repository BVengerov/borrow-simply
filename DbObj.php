<?php
	class DbObj
	{
		private $_host = '127.0.0.1';
		private $_dbName = 'items';
		private $_charset = 'utf8';
		private $_username = 'bvengerov';
		private $_password = 'root';
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
			$date = date('H:i d-m-Y');
			$query = "UPDATE $this->_tableNameItems SET Status = '$status', Date = NOW(), History = CONCAT('$status [$date]\n',History)"
			. " WHERE Status='Free' AND ID = $id";
			return $this->_runUpdateQuery($query);
		}

		public function returnItem($id, $status)
		{
			$date = date('H:i d-m-Y');
			$query = "UPDATE $this->_tableNameItems SET Status='$status', Date = NOW(), History = CONCAT('Returned [$date]\n',History)"
			. " WHERE Status!='Free' AND ID = $id";
			return $this->_runUpdateQuery($query);
		}

		private function _getAllTableData($tableName)
		{
			// If going global, prepare & execute should be used here to be secure of SQL injection
			$statement = $this->_getDb()->query("SELECT * FROM $tableName");
			$result = $statement->fetchAll(PDO::FETCH_ASSOC);
			return $result;
		}

		private function _runUpdateQuery($query)
		{
			// If going global, prepare & execute should be used here to be secure of SQL injection
			$statement = $this->_getDb()->query($query);
			if (!$statement)
			{
				header("HTTP/1.1 500 Internal Server Error");
			}
			return $statement;
		}
	}
?>