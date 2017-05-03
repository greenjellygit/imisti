angular.module("emistiApp").controller("ContactController", ["$scope", "ContactService", function($scope, ContactService) {

  $scope.isEmailSend = false;
  $scope.emailData = {
    name: "",
    email: "",
    subject: "",
    text: "",
    attachments: [],
  };

  $scope.sendEmail = function() {
    ContactService.sendEmail($scope.emailData);
    $scope.isEmailSend = true;
  };

  $scope.addFile = function(file) {
    $scope.emailData.attachments.push(file);
  }
}]);
