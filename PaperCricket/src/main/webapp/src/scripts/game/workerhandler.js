let myWorker = new Worker("src/scripts/workers/WebSocketWorker.js");


myWorker.onmessage = function (e) {
    let responseFunctions = {
        "New Game Created": function () {
            gameView.loadNewGame(workerResponse['gameId'], workerResponse['Innings']);
            gameView.initialize();
        },
        "Game Joined": function () {
            gameView.joinNewGame(workerResponse['gameId'], workerResponse['Innings']);
            gameView.initialize();
        },
        "Status Update": function () {
            gameView.statusUpdate(workerResponse['message']);
        },
        "Error Update": function () {
            roomJoinView.errorUpdate(workerResponse['message']);
        },
        "Score Update": function () {
            gameView.scoreUpdate(workerResponse['score'], workerResponse['balls'], workerResponse['wickets'], workerResponse['battingMove'], workerResponse['bowlingMove']);
        },
        "Start Game": function () {
            gameView.startGame();
        }
    }
    let workerResponse = JSON.parse(e.data);
    responseFunctions[workerResponse['command']]();
}