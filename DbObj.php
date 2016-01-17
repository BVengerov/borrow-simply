<?php
	namespace Home;
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

		public function drawTable()
		{
			// Performing SQL query
			$query = 'SELECT * FROM phones_list';
			$this->_table = $this->_makeQuery($query);
			//Printing results in HTML
			echo "<table>\n";
			while ($row = $this->_fetchRow($this->_table)) {
			    echo "\t<tr>\n";
			    foreach ($row as $data) {
			        echo "\t\t<td>$data</td>\n";
			    }
			    echo "\t\t<td>
			    			<button class='button-free'>Take</button>
			    			<button class='button-disabled' disabled>Not available</button>
			    		</td>\n";
			    echo "\t</tr>\n";
			}
			echo "</table>\n";
		}

		// Connecting, selecting database
		private function _connectToDb()
		{
			$link = $this->_dbLink;
			if (!is_null($link) && !mysql_ping($link))
			{
				$this->_dbLink = $this->_connectToDb();
			}
			return (mysql_connect($this->_host, $this->_login, $this->_password)
				or die('Could not connect: ' . mysql_error()));
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
			mysql_freeresult($this->_table);
			// Closing connection
			mysql_close($this->_dbLink);
		}
	}
?>