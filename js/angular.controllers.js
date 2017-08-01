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
            // Not done by Angular, should be improved:
            window.scrollTo(0, 0);

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

    var contactmeCtrl = function($scope, $http) {
        $scope.toggle_count = 0;
        $scope.message = '';

        $scope.Count = function() {
            $scope.toggle_count++;

            if ($scope.toggle_count %2 == 0 && $scope.message != '') {
				// send me an e-mail feature to be implemented here
            }
        }

        $scope.UpdateMessage = function() {
            $scope.message = this.contact_me_message_M;
            $scope.viewscope = this;
        }
    }
    contactmeCtrl.$inject = ['$scope', '$http'];
    app.controller('contactmeCtrl', contactmeCtrl);
})(app);
