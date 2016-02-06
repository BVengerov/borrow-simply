<?php
	namespace Home;
	require_once("DbObj.php");
?>

<html>
<head lang='en'>
	<meta charset='UTF-8'>
	<title>...</title>
		<style>
			table {
				margin: 8px;
				background-color: linen;
			}

			th {
				font-family: Arial, Helvetica, sans-serif;
				font-size: .7em;
				background: #666;
				color: #FFF;
				padding: 2px 6px;
				border-collapse: separate;
				border: 1px solid #000;
			}

			td {
				font-family: Lucida Console;
				font-size: .7em;
				border: 1px solid #DDD;
			}

			.button-free
			{
				content: 'Take phone';
				color: green;
				font-weight: bold;
				text-align: center;
				visibility: visible;
			}

			.button-disabled
			{
				visibility: hidden;
			}
		</style>
		<script src="angular.js"></script>
		<script src="app.js"></script>
		<!-- <script src="https://code.jquery.com/jquery-1.12.0.js">
			$('.button-free').click(function(){
				$.ajax(
						type: "POST",
						url: "change_item_state.php",
						data: dataString,
						cache: false,
						success: function(html)
						{
							$("#first_"+ID).html(first);
							$("#last_"+ID).html(last);
						}
			});
		</script> -->
	</head>
<body>
	<?php

		/* TODO:
			Перевести Table на mysqli
		*/
		$table = new DbObj();
		$table->drawTable();
	?>
</body>
</html>