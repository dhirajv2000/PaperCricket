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
        },
        "Innings Change": function () {
            gameView.inningsChange(workerResponse['Target'], workerResponse['Innings'], workerResponse['score'],
                workerResponse['balls'], workerResponse['wickets'], workerResponse['battingMove'], workerResponse['bowlingMove']);
        },
        "Declare Result": function () {
            gameView.declareResult(workerResponse['message'], workerResponse['score'],
                workerResponse['balls'], workerResponse['wickets'], workerResponse['battingMove'], workerResponse['bowlingMove']);
        },
        "Dead Ball": function () {
            gameView.deadBall();
        },
        "Terminate Match": function () {
            gameView.declareResult(workerResponse['result']);
        }
    }
    let workerResponse = JSON.parse(e.data);
    responseFunctions[workerResponse['command']]();
}