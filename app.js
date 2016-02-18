(function() {

	var app = angular.module("borrowsimply", []);

	var $baseUrl = "services/";
	var $username = "vengerov";

	app.factory("itemsService", function($http) {
		return {
			getItems: function() {
				return $http({
				    method: "GET",
				    url: $baseUrl + "getItems.php"
				});
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

	app.controller("ItemController", function($scope, itemsService, $interval, $window) {

		var getItems = function() {
				itemsService.getItems().then(function(response) {
					//Updating model on change only
					if (!angular.equals($scope.items, response.data))
					{
						$scope.items = response.data;
					}
				});
		}

		$scope.takeItem = function(item) {
			itemsService.takeItem(item).then(getItems, function(response) {
				getItems();
				$window.alert("Oops! Something went wrong :-( Please check if the item is available or try again later.");
			});
		};

		$scope.freeItem = function(item) {
			itemsService.freeItem(item).then(getItems);
		};

		$scope.getStatus = function(item) {
			var status = item.status;
			if (status == "Free") {
				return status;
			}
			else {
				// Format date into readable format
				var date = new Date(item.date);
				var hh = date.getHours();
				var mm = date.getMinutes();
				if (mm < 10) {
				    mm = '0' + mm
				}
				var hhmm = hh + ":" + mm;

				var dd = date.getDate();
				var nn = date.getMonth() + 1;
				var yyyy = date.getFullYear();
				var ddnnyyyy = dd + "/" + nn + "/" + yyyy;

				return status + " at " + hhmm + " on " + ddnnyyyy;
			}
		}

		//TODO reloading for all the clients
		$interval(function() {
			getItems();
		}, 1000);

		getItems();
	});
})();

