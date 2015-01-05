(function(angular) {
  angular.module('wordsApp').directive('wordTag', function() {
    return {
      templateUrl : 'js/words/partials/wordTag.html.tpl',
      restrict: 'AE',
      //wordsCtrl should support editWord() and removeWord()
      scope: { 
        word: '=wordEntry',
        wordsCtrl : '=ctrlEntry'
       },
      link: function($scope, iElm, iAttrs, controller) {
        //do nothing.
      }
    };
  });
}(angular));
