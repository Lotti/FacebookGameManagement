'use strict';

/* App Module */

var app = angular.module('FBGM', [
	'ngRoute',
	'ngCookies',
	'appControllers'
]);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'template/login.html',
			controller: 'loginCtrl'
		})
		.when('/achievements/:appId/:appToken', {
			templateUrl: 'template/achievements.html',
			controller: 'achievementsCtrl'
      	})
		.otherwise({
        	redirectTo: '/'
      	});
}]);