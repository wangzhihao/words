(function(angular) {
  angular.module('wordsApp')
    .factory('wordsLocalService', wordsLocalService);

  function wordsLocalService() {
    var service = {
      todayCache: undefined,
      recentCache: undefined,
      addWordLocal: addWordLocal,
      removeWordLocal: removeWordLocal,
      editWordLocal: editWordLocal
    };
    //all word list caches.
    var caches = [service.todayCache, service.recentCache];

    return service;

    /**
     * Replace the old word with the new word in every cache.
     */
    function editWordLocal(newWord) {
      jQuery.each(caches, function(index, cache) {
        if (cache) {
          jQuery.each(cache, function(index, word) {
            if (word.id === newWord.id) {
              cache[index] = newWord;
            }
          });
        }
      });
    };
    /**
     * Add the new word in the beginning of recent word list cache.
     */
    function addWordLocal(newWord) {
      if (service.recentCache) {
        service.recentCache.unshift(newWord);
      }
    };

    /**
     * Remove the word in every cache.
     */
    function removeWordLocal(word) {
      jQuery.each(caches, function(index, cache) {
        if (cache) {
          cache = jQuery.grep(cache, function(item) {
            return item.id !== word.id;
          });
        }
      });
    };
  };
})(angular);
