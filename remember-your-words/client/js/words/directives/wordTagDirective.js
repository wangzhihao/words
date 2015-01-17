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
        $scope.flip = false;
        $scope.toggleFlip = toggleFlip;

        var front = iElm.find('.front'),
            back = iElm.find('.back'),
            flipContainer = iElm.find('.flip-container');
        
        setHeight();

        function toggleFlip() {
          $scope.flip  = !$scope.flip;
          setHeight();

        }

        function setHeight(){
          flipContainer.css('height', Math.max(front.outerHeight(), back.outerHeight()));
          if(!$scope.flip){
            front.css('position', 'static');
            back.css('position', 'absolute');
            flipContainer.css('max-height', front.outerHeight() + 'px');
          }else{
            front.css('position', 'absolute');
            back.css('position', 'static');
            flipContainer.css('max-height', back.outerHeight() + 'px');
          }
        }
      }
    };
  });
}(angular));
