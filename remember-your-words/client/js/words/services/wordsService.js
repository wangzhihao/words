(function(angular){
	angular.module('wordsApp')
	.factory('wordsService', wordsService);

	wordsService.$inject = ['Restangular'];

	function wordsService(Restangular){
		var service = {getWords : getWords};

		var httpService = Restangular.withConfig(function(RestangularConfigurer) {
	      RestangularConfigurer.setBaseUrl('api');
	  });
		
		return service;

		function getWords(){
			return httpService.all('words').getList();
		}
	};
})(angular);