function RoomJoinView() {
	this.newGame = function(e) {
		  e.preventDefault();
		  myWorker.postMessage([{"command" : "New Game"}]);
	}
	
	this.joinGame = function(e) {
	    e.preventDefault();
	    let gameId = document.querySelector("#gameid-box").value;
	    myWorker.postMessage([{"command": "Join Game", "gameId": gameId}]);
	}
	
	this.errorUpdate = function(message){
		document.getElementById('error-bar').innerHTML = message;
	}
}
let roomJoinView = new RoomJoinView();
document.querySelector("#new-game-btn").addEventListener('click', roomJoinView.newGame);
document.querySelector("#join-game-btn").addEventListener('click', roomJoinView.joinGame);