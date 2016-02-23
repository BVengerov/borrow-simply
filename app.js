(function() {

	var app = angular.module("borrowsimply", ['ngCookies', 'ngQtip2']);

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
			returnItem: function(item) {
				return $http({
				    method: "POST",
				    url: $baseUrl + "returnItem.php",
					data: item.id,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				});
			},
			updateComment: function(item, comment) {
				return $http({
				    method: "POST",
				    url: $baseUrl + "updateComment.php",
					data: {
						'id': item.id,
						'comment': comment
					},
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

	app.controller("ItemController", function($scope, itemsService, $interval, $window, $cookies) {

		var getItems = function() {
				itemsService.getItems().then(function(response) {
					//Updating model on change only
					if (!angular.equals($scope.items, response.data))
						$scope.items = response.data;
				});
		}

		var onError = function() {
			getItems(); //Because it's probably due to changes in DB not synced with the model
			$window.alert("Oops! Something went wrong :-( Please try again later.");
		}

		$scope.takeItem = function(item) {
			user = $scope.selectedUser;
			if (user)
				itemsService.takeItem(item, user.login).then(getItems, onError);
			else
				$window.alert("<-- Please select your name first.");
		};

		$scope.returnItem = function(item) {
			user = $scope.selectedUser;
			if (user)
				itemsService.returnItem(item).then(function() {
					getItems();
					$scope.returnedItemId = item.id;
				}, onError);
			else
				$window.alert("<-- Please select your name first!");
		};

		$scope.getFullStatusText = function(item) {
			var status = item.status;
			if (status == "Free")
				return status;
			else {
				// Format date into readable format
				var date = new Date(item.date);
				var hh = date.getHours();
				var mm = date.getMinutes();
				if (mm < 10)
				    mm = '0' + mm
				var hhmm = hh + ":" + mm;

				var dd = date.getDate();
				var nn = date.getMonth() + 1;
				var yyyy = date.getFullYear();
				var ddnnyyyy = dd + "/" + nn + "/" + yyyy;

				return status + " at " + hhmm + " on " + ddnnyyyy;
			}
		}

		$scope.updateComment = function(item, comment) {
			if (item.comment != comment)
				itemsService.updateComment(item, comment).then(getItems, onError);
		}

		$scope.getAvailableAction = function(item) {
			user = $scope.selectedUser;
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

		$scope.storeUserLogin = function() {
			$cookies.put('login', this.selectedUser.login);
		}

		var setUserFromCookies = function() {
			var selectedUser = undefined;
			userLogin = $cookies.get('login');
			if (userLogin)
			{
				for (user of $scope.users)
				{
					if (userLogin == user.login)
					{
						selectedUser = user;
						break;
					}
				}
			}
			$scope.selectedUser = selectedUser;
			// Bool flag for showing initial "please select username" qtip
			if ($scope.selectedUser == undefined)
				$scope.showUnknownUserAlert = true;
		}

		var getUsersAndSelectUser = function() {
			itemsService.getUsers().then(function(response) {
				$scope.users = response.data;
				setUserFromCookies();
			});
		}

		$interval(function() {
			getItems();
		}, 1000);

		getUsersAndSelectUser();
		getItems();
	});
})();

