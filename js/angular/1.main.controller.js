angular
.module('portfolioApp')
.controller('mainCtrl', function($scope, $http, DataService) {
    'use strict';
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
            // Not done by Angular, should be improved:
            window.scrollTo(0, 0);

            $scope.projectData = [];
            $scope.leftActivated = false;
            $scope.rightActivated = false;
            $scope.details = true;
            var key = elem.target.getAttribute('view-name');
            if (key !== null && key.indexOf('.xml') !== -1) {
                var extendedKey = 'data/projects/' + key;
                $scope = DataService.GetProjectsData(extendedKey, $scope);
            }
        };

        $scope.works_data = GetData();
});
