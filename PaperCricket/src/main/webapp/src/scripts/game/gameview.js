function GameView() {
    const self = this;
    let gameId, innings, hasValidMove = false;
    this.loadNewGame = function (newGameId, firstInnings) {
        gameId = newGameId;
        innings = firstInnings;
        document.querySelector('body').innerHTML = "";
        document.querySelector('body').innerHTML = templates['gamePlay'];
        document.getElementById('update-box').innerHTML = "Game Id is:" + gameId;
    }

    this.joinNewGame = function (newGameId, firstInnings) {
        gameId = newGameId;
        innings = firstInnings;
        document.querySelector('body').innerHTML = "";
        document.querySelector('body').innerHTML = templates['gamePlay'];
        self.startGame("Player 1 is ready")
    }

    this.startGame = function (message = "Player 2 is ready") {
        document.getElementById('update-box').innerHTML = message;
        setTimeout(function () {
            document.getElementById('update-box').innerHTML = "Innings: " + innings;
            self.startCountdown();
        }, 3000);
    }

    this.startCountdown = function () {
        hasValidMove = true;
        let timerDuration = 10;
        let timer = setInterval(function () {
            if (timerDuration <= 0) {
                clearInterval(timer);
                document.getElementById("countdown-box").innerHTML = "Time Up";
            } else if (hasValidMove == false) {
                clearInterval(timer);
            } else {
                document.getElementById("countdown-box").innerHTML = "&nbsp;&nbsp;&nbsp;" + timerDuration;
            }
            timerDuration -= 1;
        }, 1000);
    }

    this.statusUpdate = function (message) {
        document.getElementById('update-box').innerHTML = message;
    }

    this.scoreUpdate = function (score, balls, wickets, battingMove, bowlingMove) {
        document.querySelector('#Runs').innerHTML = "Runs: " + score;
        document.querySelector('#Wickets').innerHTML = "Wickets: " + wickets;
        document.querySelector('#Balls').innerHTML = "Balls: " + balls;
        if (innings == "Batting") {
            document.querySelector('#opponent-playarea').innerHTML = bowlingMove;
        } else {
            document.querySelector('#opponent-playarea').innerHTML = battingMove;
        }
        setTimeout(function () {
            document.querySelector('#user-playarea').innerHTML = "?";
            document.querySelector('#opponent-playarea').innerHTML = "?";
            self.startCountdown();
        }, 2000);
    }

    this.callBack = function () {
        if (!hasValidMove) return;
        hasValidMove = false;
        document.getElementById("countdown-box").innerHTML = "";
        let clickedRun = this.innerHTML;
        document.querySelector('#user-playarea').innerHTML = clickedRun;
        myWorker.postMessage([{
            "command": "Run Played",
            "run": clickedRun,
            "gameId": gameId
        }])
    }

    this.initialize = function () {
        for (let index = 1; index < 7; index++) {
            document.querySelector('#' + "game-btn-" + index).addEventListener('click', self.callBack);
        }
    }
}
