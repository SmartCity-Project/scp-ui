app.directive('autoresize', function ($window) {
    return function ($scope) {
        $scope.initializeWindowSize = function () {
            $scope.maxHeight = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight,
                window.innerHeight
            );
            $scope.windowHeight = $window.innerHeight;
            return $scope.windowWidth = $window.innerWidth;

        };
        $scope.initializeWindowSize();

        $scope.$watch('__height', function(newHeight, oldHeight) {
            $scope.initializeWindowSize();
        }); 

        return angular.element($window).bind('resize', function () {

            $scope.initializeWindowSize();
            return $scope.$apply();

        });
    };
});