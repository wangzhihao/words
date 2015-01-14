(function(angular) {
  angular.module('wordsApp')
    .factory('wordSelectionService', wordSelectionService);

  wordSelectionService.$inject = ['wordsService'];

  function wordSelectionService(wordsService) {
    var service = {
      randomSelect: randomSelect
    };

    /**
     * Select N records randomly. The methodology here is to generate a random array and then pick one item from backend
     * database each time.
     * @param number the number of N.
     * @ctrl  the words store in ctrl.words
     * @cache cache for today words.
     */
    function randomSelect(number, ctrl, cache) {
    	wordsService.getRandomList(number).then(function(data){
    		for(var list = data.list, i = list.length - 1; i >= 0; i--){
          var filter = {};
          filter['offset'] = list[i];
          filter['limit'] = 1;
     			wordsService.getWords(filter).then(function(data){
            //console.log(data);
            if(!cache['today']){
              cache['today'] = [];
            }
    				ctrl.words = cache['today'] = cache['today'].concat(data);
    			});
    		}
    	});
    }
    return service;
  };
})(angular);
