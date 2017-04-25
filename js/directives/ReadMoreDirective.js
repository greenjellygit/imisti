angular.module("emistiApp").directive("readMore", function() {
  return {
    restrict: 'A',
    scope: {
      text: "=",
      maxLength: "@",
      isOverflowed: "=",
      isMore: "="
    },
    link: function(scope) {
      var fullText = scope.text;
      scope.text = collapseText(scope.text, scope.maxLength);
      scope.isOverflowed = scope.text.length < fullText.length;

      scope.$watch("isMore", function(val) {
        if(val) {
          scope.text = fullText;
        } else {
          scope.text = collapseText(scope.text, scope.maxLength);
        }
      });
    }
  }

  function collapseText(text, maxLength) {
    if(text.length > maxLength) {
      return text = text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  }
});
