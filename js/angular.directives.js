(function() {
	var slideshow = function() {
        return {
            controller: 'mainCtrl',
            link: function(scope, elem) {
                scope.slideIndex = 1;
                scope.plusSlides = function(n) {
                    scope.slideIndex += n;
                    scope.showSlides(scope.slideIndex);
                }

                scope.currentSlide = function(n) {
                    scope.slideIndex = n;
                    scope.showSlides(scope.slideIndex);
                }

                scope.showSlides = function(n) {
                    var i;
                    var slides = document.getElementsByClassName("mySlides");
                    var dots = document.getElementsByClassName("slideshow-dot");
                    if (n > slides.length) {
                        scope.slideIndex = 1
                    }
                    if (n < 1) {
                        scope.slideIndex = slides.length
                    }
                    for (i = 0; i < slides.length; i++) {
                        slides[i].style.display = "none";
                    }
                    for (i = 0; i < dots.length; i++) {
                        dots[i].className = dots[i].className.replace(" active", "");
                    }
                    slides[scope.slideIndex - 1].style.display = "block";
                    if (dots.length > 0)
                        dots[scope.slideIndex - 1].className += " active";
                }

                if (scope.$last) {
                    scope.showSlides(1);
                }
            }
        }
    };
    app.directive('slideshow', slideshow);
})(app);
