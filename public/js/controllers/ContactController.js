var ctrl = null;
angular.module("emistiApp").controller("ContactController", ["$scope", "ContactService", function($scope, ContactService) {
  ctrl = $scope;
  $scope.isEmailSend = false;
  $scope.emailData = {
    name: "",
    email: "",
    subject: "",
    text: "",
    attachments: [],
  };

  $scope.tempFiles = [];

  $scope.sendEmail = function() {
    prepareEmail();
    ContactService.sendEmail($scope.emailData);
    $scope.isEmailSend = true;
  };

  var prepareEmail = function() {
    $scope.emailData.text = $scope.emailData.text.replace(/\n/g, '<br/>');
    angular.forEach($scope.emailData.attachments, function(item, index) {
      item.content = item.base64;
      delete item.base64;
      item.encoding = "base64";
    });
  };

  $scope.addAttachment = function(e, fileReader, file, fileList, fileArray, parsedFile) {
    if (!$scope.emailData.attachments.some(function(e) {
        return e.filename == parsedFile.filename
      })) {
      $scope.emailData.attachments.push(parsedFile);
    }
  };

  $scope.isFilesSizeValid = function() {
    var totalSize = 0;
    angular.forEach($scope.emailData.attachments, function(item) {
      totalSize += item.filesize;
    });
    return totalSize * Math.pow(10, -6) <= 10;
  };

  $scope.isFileCountValid = function() {
    return $scope.emailData.attachments.length <= 5;
  };

  $scope.removeAttachment = function(index) {
    $scope.emailData.attachments.splice(index, 1);
  }
}]);
