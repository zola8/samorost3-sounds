angular.
module('dashboard').
filter('playing', function() {
	return function(input) {
		return input ? 'playing' : 'stopped';
	};
});
