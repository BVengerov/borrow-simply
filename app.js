(function() {

	var app = angular.module("borrowsimply", []);

	var $baseUrl = "services/";

	app.factory("itemsService", function($http) {
		return {
			getItems: function() {
				return $http.get($baseUrl + "getItems.php");
			},
			takeItem: function(item) {
				$http({
				    method: "POST",
				    url: $baseUrl + "takeItem.php",
					 data: item.id,
					 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				});
			}
		};
	});

	app.controller("ItemController", function(itemsService) {

		var that = this;

		var getItems = function()
		{
				itemsService.getItems().success(function(data) {
				that.phones = data;
			});
		}

		that.takeItem = function(item) {
			itemsService.takeItem(item);
			getItems();
		};

		getItems();
		//{
			//TODO reloading for all the clients
			//TODO add changing the real status in MySQL
			//TODO add timepoint to the string
			//TODO add a check for whether the item has really been taken via SQL transaction
			//item.status = "Taken by vengerov";
		//	itemsService.takeItem();
		//};
	});
})();

