<?php

	class DbObj
	{
		private $_host = '127.0.0.1';
		private $_login ='root';
		private $_password = '';
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
			while ($row = $this->_fetchRow($this->_table)) {
			    $result[] = $row;
			}
			$this->_killSelf();
			return $result;
		}

		public function takeItem($id, $status)
		{
			$result = $this->_makeQuery(
				"UPDATE phones_list SET Status = '$status', Date = NOW() WHERE Status='Free' AND ID = $id"
				);

			$this->_killSelf();
			return $result;
		}

		public function freeItem($id, $status)
		{
			$result = $this->_makeQuery(
				"UPDATE phones_list SET Status='$status', Date = NOW() WHERE Status!='Free' AND ID = $id"
				);

			$this->_killSelf();
			return $result;
		}

		// Connecting, selecting database
		private function _connectToDb()
		{
			$this->_dbLink = mysql_connect($this->_host, $this->_login, $this->_password)
				or die('Could not connect: ' . mysql_error());
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