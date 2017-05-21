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
    $scope.emailData.text = $scope.emailData.text.replace(/\n/g, '<br/>');
    ContactService.sendEmail($scope.emailData);
    $scope.isEmailSend = true;
  };

  $scope.addFile = function(file) {
    $scope.emailData.attachments.push(file);
  }
}]);
