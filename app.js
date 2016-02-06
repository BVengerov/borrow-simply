(function() {

	var app = angular.module('borrowsimply', []);

	var $baseUrl = 'services/';

	app.factory('itemsService', function($http) {
		return {
			getItems: function() {
				return $http.get($baseUrl + 'getItems.php');
			},
			takeItem: function(id) {
				$http({
				    method: 'POST',
				    url: $baseUrl + 'takeItem.php',
				    data: 'id' + id,
				    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				});
				//return $http.post($baseUrl + 'takeItem.php', {'id': id});
			}
		};
	});

	app.controller('ItemController', function(itemsService) {

		var that = this;

		itemsService.getItems().success(function(data) {
			that.phones = data;
		});

		that.takeItem = function(item) {
			itemsService.takeItem(item.id);
		};
		//{
			//TODO reloading for all the clients
			//TODO add changing the real status in MySQL
			//TODO add timepoint to the string
			//TODO add a check for whether the item has really been taken
			//item.status = "Taken by vengerov";
		//	itemsService.takeItem();
		//};
	});
})();

