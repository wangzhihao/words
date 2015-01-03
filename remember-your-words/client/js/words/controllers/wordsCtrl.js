(function(angular){
	angular.module('wordsApp')
	.controller('wordsCtrl', wordsCtrl);

	wordsCtrl.$inject = ['wordsService'];

	function wordsCtrl(wordsService){
		var ctrl = this;

		ctrl.words = {};
		ctrl.newWord = {};

		ctrl.getAllWords = getAllWords;
		ctrl.reset = reset;
		ctrl.removeWord = removeWord;
		ctrl.saveWord = saveWord;


		function getAllWords(){
			wordsService.getWords().then(function(data){
				//console.log(data);
				ctrl.words = data;
			});
		}

		function reset(){
			ctrl.newWord = {};
		}

		function removeWord(id){
			wordsService.removeWord(id);
		}

		function saveWord(word){
			wordsService.saveWord(word).then(function(data){
				alert('Saved successfully!');
			},function(error){
				alert('Error occurs, the word is not saved.')
			});
		}
	};
})(angular);