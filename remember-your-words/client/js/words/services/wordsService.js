(function(angular){
	angular.module('wordsApp')
	.factory('wordsService', wordsService);

	wordsService.$inject = ['Restangular'];

	function wordsService(Restangular){
		var service = {
			getWords : getWords,
			removeWord : removeWord,
			saveWord : saveWord,
			updateWord : updateWord
		};

		var httpService = Restangular.withConfig(function(RestangularConfigurer) {
	      RestangularConfigurer.setBaseUrl('api');
	  });
		
		return service;

		function getWords(){
			return httpService.all('words').getList();
		}
		
		function removeWord(id){
			return httpService.all('words').one(id).remove();
		}

		function saveWord(word){
			return httpService.all('words').post(word);
		}

		function updateWord(word){
			return httpService.all('words').one(word.id).customPUT(word);
		}
	};
})(angular);