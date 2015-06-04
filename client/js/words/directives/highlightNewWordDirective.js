(function(angular) {
  angular.module('wordsApp').directive('highlightNewWord', function() {
    return {
      restrict: 'A',
      link: function($scope, iElm, iAttrs, controller) {
        $scope.word.formattedContext = highlight($scope.word.context, $scope.word.name);

        // Find all occurrences of <code>name</code> in <code>context</code> and
        // surround them with a pair of <code>`</code>. If <code>`</code> already
        // exists, then reduce them to just one pair.
        function highlight(context, name){
          var re = new RegExp("`*(" + name + ")`*", 'gim');
          return context.replace(re, '`$1`');
        }
      }
    };
  });
}(angular));
