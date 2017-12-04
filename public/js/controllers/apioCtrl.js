angular.module('controllers.apio', ['services.apio'])
	.controller('restaurantCtrl', RestaurantCtrl)
	.controller('restaurantDetailsCtrl', RestaurantDetailsCtrl)
	.controller('saucerCtrl', SaucerCtrl)
	.controller('saucerDetailsCtrl', SaucerDetailsCtrl)
	.controller('commentaryCtrl', CommentaryCtrl);

function RestaurantCtrl($scope, $http, restaurant) {
	$scope.restaurants = restaurant.restaurants;

	// ok
	$scope.getRestaurants = function() {
		restaurant.getRestaurants();
		$scope.restaurants = restaurant.restaurants;
	};

	// ok
	$scope.searchRestaurants = function() {
		restaurant.searchRestaurants($scope.name);
		$scope.restaurants = restaurant.restaurants;
		$scope.name = '';
	};

	// ok
	$scope.postRestaurant = function() {
		restaurant.postRestaurant($scope.restaurant);
		$scope.restaurant = {};
		$scope.getRestaurants();
	};

	// ok
	$scope.deleteRestaurantById = function(id) {
		restaurant.deleteRestaurantById(id);
		$scope.getRestaurants();
	}
};

function RestaurantDetailsCtrl ($scope, $http, $routeParams, restaurant, saucer) {
	$scope.restaurants = restaurant.restaurants;
	$scope.saucers = saucer.saucers;
	var resta = restaurant.getRestaurantById($routeParams.id);
	// ok
	saucer.getSaucersByRestaurantId($routeParams.id);
	
	// ok
	$scope.putRestaurant = function(nRestaurant) {
		restaurant.putRestaurant(nRestaurant);
	};
	for (var i in restaurant.restaurants) {
		if (restaurant.restaurants[i]._id == $routeParams.id) {
			var mapOptions = {
		        zoom: 16,
		        panControl: false,
				center: new google.maps.LatLng(restaurant.restaurants[i].lat, restaurant.restaurants[i].lng),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

			var marker = new google.maps.Marker({
				map: $scope.map,
				position: new google.maps.LatLng(restaurant.restaurants[i].lat, restaurant.restaurants[i].lng)
			});
		}
	}
}

function SaucerCtrl($scope, $http, saucer, restaurant) {
	$scope.saucers = saucer.saucers;
	$scope.restaurants = restaurant.restaurants;

	// ok
	$scope.getSaucers = function() {
		saucer.getSaucers();
		$scope.saucers = saucer.saucers;
	};

	// ok
	$scope.searchSaucers = function() {
		saucer.searchSaucers($scope.name);
		$scope.saucers = saucer.saucers;
		$scope.name = '';
	};

	// ok
	$scope.postSaucer = function() {
		saucer.postSaucer($scope.saucer);
		$scope.saucer = {};
		$scope.getSaucers();
	};

	// ok
	$scope.deleteSaucerById = function(id) {
		saucer.deleteSaucerById(id);
		$scope.getSaucers();
	}
};

function SaucerDetailsCtrl ($scope, $http, $routeParams, saucer, restaurant, commentary) {
	$scope.saucers = saucer.saucers;
	$scope.restaurants = restaurant.restaurants;
	$scope.comments = commentary.comments;
	// ok
	saucer.getSaucerById($routeParams.id);
	restaurant.getRestaurants();
	// ok
	commentary.getCommentsBySaucerId($routeParams.id);

	// ok
	$scope.putSaucer = function(nSaucer) {
		saucer.putSaucer(nSaucer);
	};

	// ok
	$scope.postCommentary = function(sid) {
		commentary.postCommentary(sid, $scope.critica);
		$scope.commentary = '';
	};
}

function CommentaryCtrl($scope, $http, commentary) {
	$scope.comments = commentary.comments;

	// ok
	$scope.getComments = function() {
		commentary.getComments();
		$scope.comments = commentary.comments;
	};

	// ok
	$scope.deleteCommentaryById = function(id) {
		commentary.deleteCommentaryById(id);
	}
};
