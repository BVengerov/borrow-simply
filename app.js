(function() {

	var app = angular.module("borrowsimply", ['ngCookies', 'ngQtip2']);

	app.controller("ItemController", function($scope, itemsService, $interval, $window, $cookies) {

		var getItems = function() {
				itemsService.getItems().then(function(response) {
					//Updating model on change only
					if (!angular.equals($scope.items, response.data))
						$scope.items = response.data;
				});
		};

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

		$scope.updateComment = function(item, comment) {
			if (item.comment != comment)
				itemsService.updateComment(item, comment).then(getItems, onError);
		};

		$scope.addNewItem = function(item) {
			user = $scope.selectedUser;
			if (item === undefined)
			{
				$window.alert('Please fill info about the item');
				return;
			}

			if ($window.confirm('Are you sure you want to add "' + item.name + '"?'))
				itemsService.addNewItem(item, user.login).then(getItems, onError);
		}

		var onError = function() {
			getItems(); //...the error would probably be as the consequence of changes in DB not synced with the model
			$window.alert("Oops! Something went wrong :-( Please try again later.");
		};

		$scope.getFullStatusText = function(item) {
			var status = item.status;
			if (status == "Free")
				return status;
			else {
				// Format date into readable format
				var itemDate = item.date.replace(/-/g, '/'); // Apparently, Date in Chrome is more flexible
				var date = new Date(itemDate);
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
		};

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
				return "None";
		};

		$scope.getClassForItem = function(item) {
			$action = $scope.getAvailableAction(item);
			if ($action == "Return")
				return "i-taken_by_user";
			else if ($action == "None")
				return "i-taken";
			else
				return "i-free";
		};

		$scope.isAdmin = function() {
			if ($scope.selectedUser === undefined)
				return false;

			var allowedUsers = ["sakharov", "sladkov", "vengerov"];
			for (i = 0; i < allowedUsers.length; i++)
			{
				if (allowedUsers[i] === $scope.selectedUser.login)
					return true;
			}
			return false;
		};

		$scope.storeUserLogin = function() {
			$cookies.put('login', this.selectedUser.login);
		};

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
		};

		var getUsersAndSelectUser = function() {
			itemsService.getUsers().then(function(response) {
				$scope.users = response.data;
				setUserFromCookies();
			});
		};

		// Reduce update rate ten-fold when the tab is not active
		angular.element($window).bind('focus', function() {
			$interval.cancel(itemsRefresh);
			itemsRefresh = startRefreshingItems(1000);
		}).bind('blur', function() {
			$interval.cancel(itemsRefresh);
			itemsRefresh = startRefreshingItems(10000);
		});

		var startRefreshingItems = function(updateInterval) {
				return $interval(function() {
				getItems();
			}, updateInterval);
		};

		getUsersAndSelectUser();
		getItems();
		itemsRefresh = startRefreshingItems(1000);
	});

	app.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });
                    event.preventDefault();
                }
            });
        };
    });
})();

