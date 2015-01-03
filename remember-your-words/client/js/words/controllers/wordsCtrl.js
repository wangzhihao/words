(function(angular){
	angular.module('wordsApp')
	.controller('wordsCtrl', wordsCtrl);

	wordsCtrl.$inject = ['wordsService'];

	function wordsCtrl(wordsService){
		var ctrl = this;

		ctrl.words = {};
		ctrl.getAllWords = getAllWords;

		function getAllWords(){
			wordsService.getWords().then(function(data){
				console.log(data);
				ctrl.words = data;
			});
		}
	};
})(angular);