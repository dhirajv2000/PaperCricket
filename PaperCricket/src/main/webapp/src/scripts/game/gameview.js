function GameView() {
	const self = this;
	
    this.loadNewGame = function(gameId) {
        document.querySelector('body').innerHTML = "";
        document.querySelector('body').innerHTML = templates['gamePlay'];
        document.getElementById('update-box').innerHTML = "Game Id is:" + gameId;
    }
    
    this.joinNewGame = function(gameId) {
    	document.querySelector('body').innerHTML = "";
        document.querySelector('body').innerHTML = templates['gamePlay'];
        document.getElementById('update-box').innerHTML = "Player 1 is ready";
    }
    
    this.statusUpdate = function(message) {
    	 document.getElementById('update-box').innerHTML = message;
    }
    
    this.callBack =  function() {
    	let clickedRun = this.innerHTML;
    }
    
    this.initialize = function() {
    	for(let index = 1; index < 7; index++){
    		let x = document.getElementById('buttons-container')
    		document.querySelector('#buttons-container').querySelector('#' + "game-btn-" + index).addEventListener('click', self.callBack);
    	}
    }
}

