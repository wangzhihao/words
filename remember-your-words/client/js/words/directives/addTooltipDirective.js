(function(angular) {
  angular.module('wordsApp').directive('wordsAddTooltip', function() {
    return {
      link: function($scope, iElm, iAttrs, controller) {
        iElm.tooltip();
      }
    };
  });
}(angular));
