(function(app) {
	app.config(function($routeProvider) {
		$routeProvider
		.when("/contact-me", {
			templateUrl : "views/contact-me.html"
		});
	});
})(app);

