(function () {
	angular
		.module("ProjectMaker")  // without [] means to retrieve module
		.config(Config);

	function Config($routeProvider) {
		$routeProvider
			.when("/", {
				templateUrl: "views/category/category-list.view.client.html",
				controller: "CategoryListController",
				controllerAs: "model",
				resolve: {
					checkCurrentUser: checkCurrentUser
				}
			})
			.when("/category/:categoryId/restaurant", {
				templateUrl: "views/restaurant/restaurant-list.view.client.html",
				controller: "RestaurantListController",
				controllerAs: "model",
				resolve: {
					checkCurrentUser: checkCurrentUser
				}
			})
			.when("/category/:categoryId/zip/:zip/restaurant", {
				templateUrl: "views/restaurant/restaurant-list.view.client.html",
				controller: "RestaurantListController",
				controllerAs: "model",
				resolve: {
					checkCurrentUser: checkCurrentUser
				}
			})
			.when("/category/:categoryId/restaurant/:restaurantId", {
				templateUrl: "views/restaurant/restaurant-info.view.client.html",
				controller: "RestaurantInfoController",
				controllerAs: "model"
			})
			.when("/category/:categoryId/zip/:zip/restaurant/:restaurantId", {
				templateUrl: "views/restaurant/restaurant-info.view.client.html",
				controller: "RestaurantInfoController",
				controllerAs: "model",
				resolve: {
					checkCurrentUser: checkCurrentUser
				}
			})
			.when("/login", {
				templateUrl: "views/user/login.view.client.html",
				controller: "LoginController",
				controllerAs: "model"
			})
			.when("/register", {
				templateUrl: "views/user/register.view.client.html",
				controller: "RegisterController",
				controllerAs: "model"
			})
			.when("/admin/", {
				templateUrl: "views/user/admin-info.view.client.html",
				controller: "AdminInfoController",
				controllerAs: "model",
				resolve: {
					checkAdminLoggedIn: checkAdminLoggedIn
				}
			})
			.when("/admin/:uid", {
				templateUrl: "views/user/admin-info.view.client.html",
				controller: "AdminInfoController",
				controllerAs: "model",
				resolve: {
					checkAdminLoggedIn: checkAdminLoggedIn
				}
			})
			.when("/user/", {
				templateUrl: "views/user/profile-info.view.client.html",
				controller: "ProfileInfoController",
				controllerAs: "model",
				resolve: {
					checkCurrentUser: checkCurrentUser
				}
			})
			.when("/user/:uid", {
				templateUrl: "views/user/profile-info.view.client.html",
				controller: "ProfileInfoController",
				controllerAs: "model",
				resolve: {
					checkCurrentUser: checkCurrentUser
				}
			})
			.when("/user/:uid/edit", {
				templateUrl: "views/user/profile-edit.view.client.html",
				controller: "ProfileEditController",
				controllerAs: "model",
				resolve: {
					// loggedIn: checkLoggedIn
					loggedIn: checkSelfLoggedInOrAdminLoggedIn
				}
			})
			.otherwise({
				redirectTo: "/login",
				controller: "LoginController",
				controllerAs: "model"
			});
	}

	var checkAdminLoggedIn = function($q, $timeout, $http, $location, $rootScope, UserService)
	{
		var deferred = $q.defer();

		UserService
			.loggedIn()
			.then(
				function(res){
					$rootScope.errorMessage = null;
					var user = res.data;
					if (user !== '0' && user.userType === "ADMIN")
					{
						UserService.setCurrentUser(user);
						deferred.resolve();
					} else {
						$location.url("/login");
					}
				},
				function () {
					$location.url("/login");
				});

		return deferred.promise;
	};

	function checkLoggedIn(UserService, $location, $q, $rootScope) {

		// First create a deferred object that defers the promise
		var deferred = $q.defer();

		UserService
			.loggedIn()
			.then(
				function (res) {
					var user = res.data;
					if (user == '0') {
						$rootScope.currentUser = null;
						deferred.reject();
						$location.url("/login");
					} else {
						$rootScope.currentUser = user;
						deferred.resolve();
					}
				},
				function (err) {
					$location.url("/login");
				});

		return deferred.promise;
	}

	function checkSelfLoggedInOrAdminLoggedIn(UserService, $location, $q, $rootScope, $route) {

		// First create a deferred object that defers the promise
		var deferred = $q.defer();

		var uid = $route.current.params.uid;

		UserService
			.loggedIn()
			.then(
				function (res) {
					var user = res.data;
					if (user == '0') {
						$rootScope.currentUser = null;
						deferred.reject();
						$location.url("/login");
					} else if (uid === user._id) {
						$rootScope.currentUser = user;
						deferred.resolve();
					} else if (user.userType === "ADMIN") {
						$rootScope.currentUser = user;
						deferred.resolve();
					} else {
						$rootScope.currentUser = null;
						deferred.reject();
						$location.url("/login");
					}
				},
				function () {
					$location.url("/login");
				});

		return deferred.promise;
	}

	var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope, UserService)
	{
		var deferred = $q.defer();

		UserService
			.loggedIn()
			.success(function(user){
				$rootScope.errorMessage = null;
				// User is Authenticated
				if (user !== '0') {
					UserService.setCurrentUser(user);
				}
				deferred.resolve();
			});

		return deferred.promise;
	};
})();