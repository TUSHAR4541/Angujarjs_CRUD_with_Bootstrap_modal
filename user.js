angular.module('user', ['ngRoute', 'firebase', 'ui.bootstrap'])

.value('fbURL', 'https://fiery-fire-5468.firebaseio.com/')
.value('user_table', 'user')

.factory('Users', function ($firebase, fbURL, user_table) {
    return $firebase(new Firebase(fbURL + user_table));
})
.factory('Country', function ($firebase, fbURL, country_table) {
    return $firebase(new Firebase(fbURL + country_table));
})
.factory('States', function ($firebase, fbURL, state_table) {
    return $firebase(new Firebase(fbURL + state_table));
})

.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'ListCtrl',
            templateUrl: 'list.html'
        })
        .otherwise({
            redirectTo: '/'
        });
})

.controller('ListCtrl', function ($scope, $location, Users, $firebase, fbURL, user_table) {
	// Define valriables
	$scope.alerts = [];
	$scope.users = Users;
	
	$scope.save = function () {
        $scope.users.$save();
		$scope.alerts.splice(0, 1);
		$scope.alerts.push({type: 'success', msg: "User updated successfully!"});
    };
	
	$scope.removeRecord = function(userId) {
		var userUrl = fbURL + user_table + '/' +userId;
		$scope.user = $firebase(new Firebase(userUrl));
		$scope.user.$remove()
		$scope.alerts.splice(0, 1);
		$scope.alerts.push({type: 'success', msg: "User removed successfully!"});
    };
	
	$scope.add = function () {
		$scope.alerts.splice(0, 1);
        if(Users.$add($scope.user)) {
			$scope.alerts.push({type: 'success', msg: "User added successfully!"});
		}
		else {
			$scope.alerts.push({type: 'danger', msg: "Error occured!"});
		}
    };
	
	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
	
	
})