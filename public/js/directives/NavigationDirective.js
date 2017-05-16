angular.module("emistiApp").directive('navigation', [function() {
  return {
    restrict: 'E',
    link: function($scope, ngElement, attributes) {
      $scope.$watch(attributes.collapse, function(collapsed) {
        ngElement.toggleClass('c  ollapsed', collapsed);
      });
    }
  };
}]);
