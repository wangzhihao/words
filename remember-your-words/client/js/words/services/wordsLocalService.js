(function(angular) {
  angular.module('wordsApp')
    .factory('wordsLocalService', wordsLocalService);

  function wordsLocalService() {
    var service = {
      todayCache: [],
      recentCache: [],
      addWordLocal: addWordLocal,
      removeWordLocal: removeWordLocal,
      editWordLocal: editWordLocal
    };
    //all word list caches' name.
    var cacheNames = ['todayCache', 'recentCache'];

    return service;

    /**
     * Replace the old word with the new word in every cache.
     */
    function editWordLocal(newWord) {
      jQuery.each(cacheNames, function(index, name) {
      	var cache = service[name];
        if (cache) {
        	for(var i = cache.length - 1; i >= 0; i--){
        		if(cache[i].id === newWord.id){
        			cache.splice(i, 1, newWord);
        			//console.log(service);
        		}
        	}
        }
      });
    };
    /**
     * Add the new word in the beginning of recent word list cache.
     */
    function addWordLocal(newWord) {
      if (service.recentCache) {
        service.recentCache.unshift(newWord);
        //console.log(service);
      }
    };

    /**
     * Remove the word in every cache.
     */
    function removeWordLocal(word) {
      jQuery.each(cacheNames, function(index, name) {
      	var cache = service[name];
        if (cache) {
        	for(var i = cache.length - 1; i >= 0; i--){
        		if(cache[i].id === word.id){
        			cache.splice(i, 1);
        			//console.log(service);
        		}
        	}
        }
      });
    };
  };
})(angular);
