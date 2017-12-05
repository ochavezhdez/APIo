angular.module('services.apio', ['ngRoute'])
	.factory('restaurant', Restaurant)
	.factory('saucer', Saucer)
	.factory('commentary', Commentary);


function Restaurant($http){
	var modelRestaurant = {
		restaurants: []
	};

	modelRestaurant.getRestaurants = function() {
		return $http.get('/restaurantes')
			.then(function(res) {
				angular.copy(res.data, modelRestaurant.restaurants);
			}, function(res) {
				console.log("Error: " + res.statusText);
			});
	};

	modelRestaurant.searchRestaurants = function(name) {
		return $http.get('/restaurantes?nombreR=' + name)
			.then(function(res) {
				angular.copy(res.data, modelRestaurant.restaurants);
			}, function(res) {
				console.log("Error: " + res.statusText);
			});
	};

	modelRestaurant.postRestaurant = function(newRestaurant) {
		return $http.post('/restaurantes', newRestaurant)
			.then(function(res) {
				modelRestaurant.restaurants.push(res.data);
			}, function(res) {
				console.log("Error: " + res.statusText);
			});
	};

	modelRestaurant.getRestaurantById = function(id) {
		return $http.get('/restaurantes/' + id)
			.then(function(res) {
				angular.copy(res.data, modelRestaurant.restaurants);
			}, function(res) {
				console.log("Error: " + res.statusText);
			});
	};

	modelRestaurant.putRestaurant = function(newRestaurant) {
		return $http.put('/restaurantes/' + newRestaurant._id, newRestaurant)
			.then(function(res) {				
				modelRestaurant.restaurants[newRestaurant] = res.data;
			}, function(res) {
				console.log("Error: " + res.statusText);
			});
	};

	modelRestaurant.deleteRestaurantById = function(id) {
		return $http.delete('/restaurantes/' + id)
			.then(function(res) {
				modelRestaurant.getRestaurants();
			}, function(res) {
				console.log("Error: " + res.statusText);
			});
	};

	return modelRestaurant;

};

function Saucer($http){
	var modelSaucer = {
		saucers: []
	};

	modelSaucer.getSaucers = function() {
		return $http.get('/platillos')
			.then(function(res) {
				angular.copy(res.data, modelSaucer.saucers);
			}, function(res) {
				console.log("Error: " + res.statusText);
			});
	};

	modelSaucer.postSaucer = function(newSaucer) {
		return $http.post('/platillos', newSaucer)
			.then(function(res) {
				modelSaucer.saucers.push(res.data);
			}, function(res) {
				console.log("Error: " + res.statusText);
			});
	};

	modelSaucer.getSaucerById = function(id) {
		return $http.get('/platillos/' + id)
			.then(function(res) {
				angular.copy(res.data, modelSaucer.saucers);
			}, function(res) {
				console.log("Error: " + res.statusText);
			});
	};

	modelSaucer.searchSaucers = function(name) {
		return $http.get('/platillos?nombreP=' + name)
			.then(function(res) {
				angular.copy(res.data, modelSaucer.saucers);
			}, function(res) {
				console.log("Error: " + res.statusText);
			});
	};

	modelSaucer.getSaucersByRestaurantId = function(id) {	
		return $http.get('/restaurantes/' + id + '/platillos')
			.then(function(res) {
				angular.copy(res.data, modelSaucer.saucers);
			}, function(res) {
				console.log("Error: " + res.statusText);
			});
	};

	modelSaucer.putSaucer = function(newSaucer) {
		return $http.put('/platillos/' + newSaucer._id, newSaucer)
			.then(function(res) {				
				modelSaucer.saucer[newSaucer] = res.data;
			}, function(res) {
				console.log("Error: " + res.statusText);
			});
	};

	modelSaucer.deleteSaucerById = function(id) {
		return $http.delete('/platillos/' + id)
			.then(function(res) {
				modelSaucer.getSaucers();
			}, function(res) {
				console.log("Error: " + res.statusText);
			});
	};

	return modelSaucer;

};

function Commentary($http){
	var modelCommentary = {
		comments: []
	};

	modelCommentary.getComments = function() {
		return $http.get('/comentarios')
			.then(function(res) {
				angular.copy(res.data, modelCommentary.comments);
			}, function(res) {
				console.log("Error: " + res.statusText);
			});
	};

	modelCommentary.postCommentary = function(platillo, critica) {
		return $http.post('platillos/' + platillo + '/comentarios', {critica, platillo})
			.then(function(res) {
				modelCommentary.comments.push(res.data);
			}, function(res) {
				console.log("Error: " + res.statusText);
			});
	};

	modelCommentary.getCommentaryById = function(id) {
		return $http.get('/comentarios/' + id)
			.then(function(res) {
				angular.copy(res.data, modelCommentary.comments);
			}, function(res) {
				console.log("Error: " + res.statusText);
			});
	};

	modelCommentary.getCommentsBySaucerId = function(id) {	
		return $http.get('/platillos/' + id + '/comentarios')
			.then(function(res) {
				angular.copy(res.data, modelCommentary.comments);
			}, function(res) {
				console.log("Error: " + res.statusText);
			});
	};

	modelCommentary.deleteCommentaryById = function(id) {
		return $http.delete('/comentarios/' + id)
			.then(function(res) {
				modelCommentary.getComments();
			}, function(res) {
				console.log("Error: " + res.statusText);
			});
	};

	return modelCommentary;

};