angular
.module('portfolioApp')
.config(function($routeProvider) {
	'use strict';
	$routeProvider
	.when("/contact-me", {
		templateUrl : "views/contact-me.html"
	});
});
