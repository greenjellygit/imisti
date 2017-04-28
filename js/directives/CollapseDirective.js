angular.module("emistiApp").directive('collapse', [function() {
  return {
    restrict: 'A',

    link: function($scope, ngElement, attributes) {
      $scope.$watch(attributes.collapse, function(collapsed) {
        ngElement.toggleClass('collapsed', collapsed);
      });
    }
  };
}]);
