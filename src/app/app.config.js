'use strict';

angular.
module('samApp').
config(['$locationProvider' ,'$routeProvider',
	function config($locationProvider, $routeProvider) {

//		$locationProvider.hashPrefix('!');

		$routeProvider.
		when('/', {
			template: '<dashboard></dashboard>'
		}).
/*		when('/play/:folder/:filename', {
		}). 
*/
		otherwise('/');
	}
	]);
