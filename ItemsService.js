(function() {
	var module = angular.module("borrowsimply");

	var $baseUrl = "services/";
	module.factory("itemsService", function($http) {
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
}());