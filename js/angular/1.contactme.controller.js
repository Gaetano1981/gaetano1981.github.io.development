angular
.module('portfolioApp')
.controller('contactmeCtrl', function($scope, $http) {
    'use strict';
    $scope.toggle_count = 0;
    $scope.message = '';
    $scope.Count = function() {
        $scope.toggle_count++;

        if ($scope.toggle_count %2 === 0 && $scope.message !== '') {
            var url = 'https://slack.com/api/chat.postMessage?token=xoxp-5073955881-147344930176-219126415347-967a6d98de0703e212d6fc7543fc3e6c&channel=U4BA4TC56&text=' + $scope.message;
            $http.get(url).then(function() {});
            $scope.message = '';
            $scope.viewscope.contact_me_message_M = '';
        }
    };

    $scope.UpdateMessage = function() {
        $scope.message = this.contact_me_message_M;
        $scope.viewscope = this;
    };
});

