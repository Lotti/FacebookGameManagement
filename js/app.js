'use strict';

/* App Module */

var app = angular.module('FBGM', [
	'ngRoute',
	'ngCookies',
	'appControllers',
	'ezfb'
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

/*
app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);
*/