(function() {

    var app = angular.module('portfolioApp', []);

    var mainCtrl = function($scope, $http) {

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

            var xmlGetElement = function(parent, name) {
                var out = '';
                var e = parent.getElementsByTagName(name)[0];
                if (e) {
                    var c = e.childNodes[0];
                    if (c)
                        out = c.nodeValue;
                    }
                return out;
            }

            $scope.projectData = [];
            $scope.leftActivated = false;
            $scope.rightActivated = false;
            $scope.details = true;
            var key = elem.target.getAttribute('view-name');
            if (key != null && key.indexOf('.xml') != -1) {
                var extendedKey = 'data/projects/' + key;
                $http.get(extendedKey).then(function(response) {
                    var projectData = response.data;
                    var parser = new DOMParser();
                    var projectXML = parser.parseFromString(projectData, 'application/xml');
                    var technologyList = projectXML.getElementsByTagName('technology');
                    $scope.projectData = [];
                    for (var i = 0; i < technologyList.length; i++) {
                        var technology = technologyList[i];
                        var title = xmlGetElement(technology, 'title');
                        var description = xmlGetElement(technology, 'description');
                        var color = xmlGetElement(technology, 'color');
                        var imageFilename = xmlGetElement(technology, 'imageFilename');
                        var projectItem = {};
                        projectItem.title = title;
                        projectItem.description = description;
                        projectItem.color = color;
                        projectItem.imageFilename = imageFilename;
                        $scope.projectData.push(projectItem);
                    }
                    
                    $scope.project_title = xmlGetElement(projectXML.getElementsByTagName('project')[0], 'project-title');
                    $scope.project_description = xmlGetElement(projectXML.getElementsByTagName('project')[0], 'project-description');
                    $scope.isProjectLoaded = true;
                }, function() { 
                    $scope.isProjectLoaded = false;
                    $scope.project_title = '';
                    $scope.project_description = '';
                });
            }
        };

        $scope.works_data = (function() { 
            // why this code is executed more than one time
            return [
                {
                    'project_title': 'FairSource',
                    'project_data_filename': 'project-1.xml',
                    'project_image_filename': 'fairsource@1x.jpg'
                },
                {
                    'project_title': 'Fair Trade Software Foundation',
                    'project_data_filename': 'project-2.xml',
                    'project_image_filename': 'ftsf@1x.jpg'
                },
                {
                    'project_title': 'Headcount',
                    'project_data_filename': 'project-3.xml',
                    'project_image_filename': 'headcount@1x.jpg'
                },
                {
                    'project_title': 'Competa.com',
                    'project_data_filename': 'project-4.xml',
                    'project_image_filename': 'Competasite@1x.jpg'
                }
            ];
        }());
    };
    mainCtrl.$inject = ['$scope', '$http'];
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
	
})();