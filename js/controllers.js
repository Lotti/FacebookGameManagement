'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('loginCtrl', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
	if ($cookies.appId != undefined) {
		$scope.appId = $cookies.appId;
	}
	if ($cookies.appSecret != undefined) {
		$scope.appSecret = $cookies.appSecret;
	}
	
	$scope.login = function() {
		$http.get('https://graph.facebook.com/oauth/access_token?client_id='+$scope.appId+'&client_secret='+$scope.appSecret+'&grant_type=client_credentials')
		.success(function (response) {
			$cookies.appId = $scope.appId;
			$cookies.appSecret = $scope.appSecret;
			
			var access_token = response.replace('access_token=','');

			$location.path("/achievements/"+$scope.appId+"/"+access_token);
		})
		.error(function (response) {
			console.log(response);
			$scope.message = response['error']['message'];
		});;
	}
}]);

appControllers.controller('achievementsCtrl', ['$scope', '$http', '$routeParams', '$cookies', function($scope, $http, $routeParams, $cookies) {
	$scope.appId = $routeParams.appId;
	$scope.appToken = $routeParams.appToken;
	
	$http.get('https://graph.facebook.com/'+$scope.appId+'/achievements?access_token='+$scope.appToken)
		.success(function (response) {
			$scope.achievements = response['data'];
			
			$scope.countAchievements = function() { 
				if ($scope.achievements == undefined) {
					return "n/a";
				}
				else {
					return $scope.achievements.length+"/1000"; 
				}
			}
			
			$scope.totalPoints = function() { 
				if ($scope.achievements == undefined) {
					return "n/a";
				}
				else {
					var tot = 0;
					for(var i in $scope.achievements) {
						tot+= $scope.achievements[i].data.points;
					}
					return tot+"/1000"; 
				}
			}			
		})
		.error(function (response) {
			console.log(response);
			$scope.message = response['error']['message'];
		});
	
	$scope.resetScores = function() {
		$scope.message = 'done';
	}
}]);