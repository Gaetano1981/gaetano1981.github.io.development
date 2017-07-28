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
	
    return app;
})(app);