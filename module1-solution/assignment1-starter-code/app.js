(function() {
    angular.module('LunchChecker',[])
    .controller('LunchCheckerController',function($scope) {
        $scope.message = '';
        $scope.checkText = '';

        $scope.checkForValue = function() {
            if($scope.checkText.length === 0) {
                $scope.message = 'Please enter data first';
                return;
            }

            const items = $scope.checkText.split(',');

            if(items.length <= 3) {
                $scope.message = 'Enjoy';
            }
            else {
                $scope.message = 'Too Much';
            }

        }
    })
})();