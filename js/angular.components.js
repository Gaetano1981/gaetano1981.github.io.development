(function(app) {

    var mainCtrl = function($scope, $http, DataService) {

        $scope.isProjectLoaded = false;
        $scope.project_title = '';
        $scope.project_description = '';

        $scope.leftActivated = true;
        $scope.rightActivated = false;
        $scope.ActivateTab = function(where) {
            $scope.leftActivated = (where === 'left');
            $scope.rightActivated = (where === 'right');
            $scope.details = false;

            // Not done by Angular, should be improved:
            window.scrollTo(0, 0);
        };
        $scope.ShowProjectDetails = function(elem) {
            $scope.projectData = [];
            $scope.leftActivated = false;
            $scope.rightActivated = false;
            $scope.details = true;
            var key = elem.target.getAttribute('view-name');
            if (key != null && key.indexOf('.xml') != -1) {
                var extendedKey = 'data/projects/' + key;
                $scope = DataService.GetProjectsData(extendedKey, $scope);
            }
        };

        $scope.works_data = GetData();
    };
    mainCtrl.$inject = ['$scope', '$http', 'DataService'];
    app.controller('mainCtrl', mainCtrl);

    var tabActivatedCtrl = function($scope) {
        $scope.loaded = function(where) {
            if (where == 'left') {
                documentLoadScriptByURL('js/animations.js', function() {});
            }
        }
    }
    tabActivatedCtrl.$inject = ['$scope'];
    app.controller('tabActivatedCtrl', tabActivatedCtrl);
	
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

    return app;
})(app);