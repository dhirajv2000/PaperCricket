function TossView () {
	let self = this, hasValidClick = false, gameId;
	this.showTossScreen = function(message, newGameId) {
		gameId = newGameId
		document.body.innerHTML = "";
		document.body.innerHTML = templates['tossSection'];
		self.statusUpdate(message);
	}
	 
	 this.startToss = function() {
		 self.statusUpdate("Player 2 joined, chose Head or Tails");
		 document.body.innerHTML += templates['coinButtons'];
		 hasValidClick = true;
		 document.getElementById("head-btn").addEventListener('click', self.coinEventHandler);
		 document.getElementById("tail-btn").addEventListener('click', self.coinEventHandler);
	 }
	 
	 this.handleTossResult = function (result) {
		 let tossResult = result;
		 console.log(tossResult)
		 if(tossResult == "Won") {
			 hasValidClick = true;
			 document.body.innerHTML = "";
			 document.body.innerHTML = templates['tossSection'];
			 document.body.innerHTML += templates['inningsButtons']
			 self.statusUpdate("You won the toss, choose between:")
			 document.getElementById("bat-btn").addEventListener('click', self.inningsEventHandler);
			 document.getElementById("bowl-btn").addEventListener('click', self.inningsEventHandler); 
		 } else {
			 document.body.innerHTML = "";
			 document.body.innerHTML = templates['tossSection'];
			 self.statusUpdate("You lost the toss, waiting for opponent")
		 }
	 }
	 
	 this.inningsEventHandler = function(){
		 if(!hasValidClick) return;
		 hasValidClick = false;
		 let chosenInnings = this.innerHTML;
		 myWorker.postMessage([{
	            "command": "Innings Chosen",
	            "chosenInnings": chosenInnings,
	            "gameId": gameId
	        }])
	 }
	 
	 this.coinEventHandler = function() {
		 if(!hasValidClick) return;
		 hasValidClick = false;
		 let chosenSide = this.innerHTML;
		 myWorker.postMessage([{
	            "command": "Coin Tossed",
	            "chosenSide": chosenSide,
	            "gameId": gameId
	        }])
	 }
	 
	 this.statusUpdate = function (message) {
	        document.getElementById('update-box').innerHTML = message;
	 }
	
}