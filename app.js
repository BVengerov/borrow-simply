(function() {

	var app = angular.module("borrowsimply", []);

	var $baseUrl = "services/";

	app.factory("itemsService", function($http) {
		return {
			getItems: function() {
				return $http({
				    method: "GET",
				    url: $baseUrl + "getItems.php"
				});
			},
			takeItem: function(item, username) {
				return $http({
				    method: "POST",
				    url: $baseUrl + "takeItem.php",
					 data: {
					 	id: item.id,
					 	status: "Taken by " + username
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
			},
			getUsers: function() {
					return $http({
				    method: "GET",
				    url: $baseUrl + "getUsers.php"
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

		var getUsers = function() {
			itemsService.getUsers().then(function(response) {
				$scope.users = response.data;
			});
		}

		var onError = function() {
			getItems();
			$window.alert("Oops! Something went wrong :-( Please try again later.");
		}

		$scope.takeItem = function(item) {
			user = this.selectedUser;
			if (user)
			{
				itemsService.takeItem(item, user.login).then(getItems, onError);
			}
			else
			{
				$window.alert("Please select your name first!");
			}
		};

		$scope.freeItem = function(item) {
			user = this.selectedUser;
			if (user)
			{
				itemsService.freeItem(item).then(getItems, onError);
			}
			else
			{
				$window.alert("Please select your name first!");
			}

		};

		$scope.getFullStatusText = function(item) {
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

		$scope.availableAction = function(item)
		{
			user = this.selectedUser;
			if (item.status == "Free")
				return "Take";
			else if (
				typeof user != 'undefined' &&
				user.login == item.status.replace("Taken by ", "")
				)
				return "Return";
			else
				return false;
		};

		//TODO reloading for all the clients
		$interval(function() {
			getItems();
		}, 100000);

		getUsers();
		getItems();
	});
})();

