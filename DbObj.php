<?php

	class DbObj
	{
		private $_host = '127.0.0.1';
		private $_login ='bvengerov';
		private $_password = 'root';
		private $_tableName ='items';
		private $_dbLink;
		private $_table;

		public function __construct()
		{
			$this->_connectToDb();
			$this->_selectDb();
		}

		public function getRows()
		{
			$result = [];
			// Performing SQL query
			$query = 'SELECT * FROM phones_list';
			$this->_table = $this->_makeQuery($query);
			while ($row = $this->_fetchRow($this->_table))
			{
			    $result[] = $row;
			}
			$this->_killSelf();
			return $result;
		}

		public function takeItem($id, $status)
		{
			echo $status;
			$date = date('H:i d-m-Y');
			$result = $this->_makeQuery(
				"UPDATE phones_list SET Status = '$status', Date = NOW(), History = CONCAT('$status [$date]\n',History) WHERE Status='Free' AND ID = $id"
				);

			echo $result;
			if (!$result || mysql_affected_rows() === 0)
			{
				header("HTTP/1.1 500 Internal Server Error");
			}
			$this->_killSelf();
			return $result;
		}

		public function freeItem($id, $status)
		{
			$date = date('H:i d-m-Y');
			$result = $this->_makeQuery(
				"UPDATE phones_list SET Status='$status', Date = NOW(), History = CONCAT('Returned [$date]\n',History) WHERE Status!='Free' AND ID = $id"
				);

			$this->_killSelf();
			return $result;
		}

		public function getUsers()
		{
			$result = [];
			$this->_table = $this->_makeQuery("SELECT * FROM users");
			while ($row = $this->_fetchRow($this->_table))
			{
			    $result[] = $row;
			}
			$this->_killSelf();
			return $result;
		}

		// Connecting, selecting database
		private function _connectToDb()
		{
			$this->_dbLink = mysql_connect($this->_host, $this->_login, $this->_password)
				or die('Could not connect: ' . mysql_error());
			mysql_set_charset('utf8', $this->_dbLink);
			return $this->_dbLink;
		}

		private function _selectDb()
		{
			mysql_select_db($this->_tableName) or die('Could not select database');
		}

		private function _makeQuery($query)
		{
			$result = mysql_query($query) or die('Query failed: ' . mysql_error());
			return $result;
		}

		private function _fetchRow($table)
		{
			return mysql_fetch_assoc($table);
		}

		private function _killSelf()
		{
			//Free resultset
			if (!is_null($this->_table))
			{
				mysql_freeresult($this->_table);
			};
			// Closing connection
			mysql_close($this->_dbLink);
		}
	}
?>