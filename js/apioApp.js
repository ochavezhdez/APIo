angular.module('apioApp', ['ngRoute', 'controllers.apio'])
	.config(setUp);

function setUp($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/templates/main.html'
		})
		.when('/restaurant', {
			templateUrl: '/templates/restaurants.html',
			controller: 'restaurantCtrl',
			resolve: {
				restaurantPromise: ['restaurant', function(restaurant) {
					restaurant.getRestaurants();
				}]
			}
		})
		.when('/restaurant/:id/details', {
			templateUrl: '/templates/restaurant/details.html',
			controller: 'restaurantDetailsCtrl'
		})
		.when('/restaurant/:id/mod', {
			templateUrl: '/templates/restaurant/restaurant.html',
			controller: 'restaurantPutCtrl'
		})
		.when('/restaurant/add', {
			templateUrl: '/templates/restaurant/form.html',
			controller: 'restaurantCtrl'
		})
		.when('/saucer', {
			templateUrl: '/templates/saucers.html',
			controller: 'saucerCtrl',
			resolve: {
				saucerPromise: ['saucer', function(saucer) {
					saucer.getSaucers();
				}]
			}
		})
		.when('/saucer/:id/details', {
			templateUrl: '/templates/saucer/detail.html',
			controller: 'saucerDetailsCtrl'
		})
		.when('/saucer/:id/mod', {
			templateUrl: '/templates/saucer/saucer.html',
			controller: 'saucerDetailsCtrl'
		})
		.when('/saucer/add', {
			templateUrl: '/templates/saucer/form.html',
			controller: 'saucerCtrl',
			resolve: {
				restaurantPromise: ['restaurant', function(restaurant) {
					restaurant.getRestaurants();
				}]
			}
		})
		.when('/commentary', {
			templateUrl: '/templates/commentary.html',
			controller: 'commentaryCtrl',
			resolve: {
				commentaryPromise: ['commentary', function(commentary) {
					commentary.getComments();
				}]
			}
		})
		.otherwise({
			templateUrl: '/templates/error.html'
		});
}