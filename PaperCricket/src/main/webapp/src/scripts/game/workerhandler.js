let myWorker = new Worker("src/scripts/workers/WebSocketWorker.js");


myWorker.onmessage = function(e){
	let responseFunctions = {
			"New Game Created" : function(){
				console.log('hi')
				gameView.loadNewGame(workerResponse['gameId']);
				gameView.initialize();
			},
			"Game Joined": function(){
				gameView.joinNewGame();
			},
			"Status Update": function(){
				gameView.statusUpdate(workerResponse['message']);
			},
			"Error Update": function(){
				roomJoinView.errorUpdate(workerResponse['message']);
			}
	}
	console.log(e.data)
	let workerResponse = JSON.parse(e.data);
	responseFunctions[workerResponse['command']]();
	console.log(workerResponse['command']);
}