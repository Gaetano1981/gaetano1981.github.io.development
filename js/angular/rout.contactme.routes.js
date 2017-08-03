angular
.module('portfolioApp')
.config(function($routeProvider) {
	$routeProvider
	.when("/contact-me", {
		templateUrl : "views/contact-me.html"
	});
});
