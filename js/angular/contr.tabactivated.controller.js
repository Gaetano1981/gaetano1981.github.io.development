angular
.module('portfolioApp')
.controller('tabActivatedCtrl', function($scope) {
    $scope.loaded = function(where) {
        if (where == 'left') {
            documentLoadScriptByURL('js/animations.js', function() {});
        }
    }
});
