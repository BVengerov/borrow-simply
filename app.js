(function() {

	var app = angular.module("borrowsimply", []);

	var $baseUrl = "services/";
	var $username = "vengerov";

	app.factory("itemsService", function($http) {
		return {
			getItems: function() {
				return $http.get($baseUrl + "getItems.php");
			},
			takeItem: function(item) {
				return $http({
				    method: "POST",
				    url: $baseUrl + "takeItem.php",
					 data: {
					 	id: item.id,
					 	status: "Taken by " + $username
					 },
					 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				});
			},
			freeItem: function(item) {
				return $http({
				    method: "POST",
				    url: $baseUrl + "freeItem.php",
					 data: item.id,
					 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				});
			}
		};
	});

	app.controller("ItemController", function(itemsService) {

		var that = this;

		var getItems = function() {
				itemsService.getItems().success(function(data) {
				that.phones = data;
			});
		}

		that.takeItem = function(item) {
			itemsService.takeItem(item).success(getItems);
		};

		that.freeItem = function(item) {
			itemsService.freeItem(item).success(getItems);
		};

		getItems();
		//{
			//TODO reloading for all the clients
			//TODO add timepoint to the string
			//TODO add a check for whether the item has really been taken via SQL transaction
			//item.status = "Taken by vengerov";
		//	itemsService.takeItem();
		//};
	});
})();

