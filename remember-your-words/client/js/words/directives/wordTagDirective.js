(function(angular) {
  angular.module('wordsApp').directive('wordTag', function($timeout) {
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
            flipper = iElm.find('.flipper'),
            flipContainer = iElm.find('.flip-container');
        
        setHeight();
 
        function toggleFlip() {
          $scope.flip  = !$scope.flip;
          setHeight();
        }

        function setHeight(){
          var delay = 200, duration = 300;
          //flipContainer.css('height', Math.max(front.outerHeight(), back.outerHeight()));
          if(!$scope.flip){
            if(front.outerHeight() > back.outerHeight()){
              flipContainer.animate({height: front.outerHeight() + 'px'}, duration);
              //flipContainer.css('max-height', front.outerHeight() + 'px');
            }else{
              $timeout(function(){
                flipContainer.animate({height: front.outerHeight() + 'px'}, duration);
                //flipContainer.css('max-height', front.outerHeight() + 'px');
              }, delay);
            }
          }else{
            if(front.outerHeight() < back.outerHeight()){
              flipContainer.animate({height: back.outerHeight() + 'px'}, duration);
              //flipContainer.css('max-height', back.outerHeight() + 'px');
            }else{
              $timeout(function(){
                flipContainer.animate({height: back.outerHeight() + 'px'}, duration);
                //flipContainer.css('max-height', back.outerHeight() + 'px');
              }, delay);
            }
          }
        }
      }
    };
  });
}(angular));
