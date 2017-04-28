angular.module("emistiApp").controller("ContactController", ["$scope", "ContactService", function($scope, ContactService) {

  $scope.isEmailSend = false;
  $scope.emailData = {
    name: "",
    email: "",
    subject: "",
    text: ""
  };

  $scope.sendEmail = function() {
    ContactService.sendEmail($scope.emailData);
    $scope.isEmailSend = true;
  };
}]);
