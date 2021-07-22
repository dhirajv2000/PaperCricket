function GameView() {
    const self = this;
    let gameId, innings, hasValidMove = false;
    
    //Sets up a new game
    this.loadNewGame = function (newGameId, firstInnings) {
        gameId = newGameId;
        innings = firstInnings;
        document.querySelector('body').innerHTML = "";
        document.querySelector('body').innerHTML = templates['gamePlay'];
        document.getElementById('update-box').innerHTML = "Game Id is:" + gameId;
    }

    //To join a pre-existing game
    this.joinNewGame = function (newGameId, firstInnings) {
        gameId = newGameId;
        innings = firstInnings;
        document.querySelector('body').innerHTML = "";
        document.querySelector('body').innerHTML = templates['gamePlay'];
        self.startGame("Player 1 is ready")
    }
    
    //Begins the game, after players have joined
    this.startGame = function (message = "Player 2 is ready") {
        document.getElementById('update-box').innerHTML = message;
        setTimeout(function () {
            document.getElementById('update-box').innerHTML = "Innings1: " + innings;
            self.startCountdown();
        }, 3000);
    }
    
    //Countdown for each move
    this.startCountdown = function () {
        hasValidMove = true;
        let timerDuration = 10;
        let timer = setInterval(function () {
            if (timerDuration <= 0) {
                clearInterval(timer);
                hasValidMove = false;
                document.getElementById("countdown-box").innerHTML = "Time Up";
                myWorker.postMessage([{
                    "command": "Run Played",
                    "run": "7",
                    "gameId": gameId
                }])
            } else if (hasValidMove == false) {
                clearInterval(timer);
            } else {
                document.getElementById("countdown-box").innerHTML = "&nbsp;&nbsp;&nbsp;" + timerDuration;
            }
            timerDuration -= 1;
        }, 1000);
    }
    
    //Updates the status bar
    this.statusUpdate = function (message) {
        document.getElementById('update-box').innerHTML = message;
    }
    
    //Updates the score Board
    this.setScoreBoard = function (score, balls, wickets, target = null) {
        console.log(target)
        document.querySelector('#Runs').innerHTML = "Runs: " + score;
        document.querySelector('#Wickets').innerHTML = "Wickets: " + wickets;
        document.querySelector('#Balls').innerHTML = "Overs: " + Math.trunc(balls / 6) + "." + (balls % 6);
        if (target) document.querySelector('#Target').innerHTML = "Target: " + target;

    }
    
    //Shows opponents move
    this.setOpponentsMove = function (battingMove, bowlingMove) {
        if (innings == "Batting") {
            document.querySelector('#opponent-playarea').innerHTML = bowlingMove;
        } else {
            document.querySelector('#opponent-playarea').innerHTML = battingMove;
        }
    }
    
    //Resets Move for next ball
    this.clearOpponentsMove = function () {
        document.querySelector('#user-playarea').innerHTML = "?";
        document.querySelector('#opponent-playarea').innerHTML = "?";
    }
    
    //Updates everything after ball is over
    this.scoreUpdate = function (score, balls, wickets, battingMove, bowlingMove) {
        self.setScoreBoard(score, balls, wickets);
        self.setOpponentsMove(battingMove, bowlingMove);
        setTimeout(function () {
            self.clearOpponentsMove();
            self.startCountdown();
        }, 2000);
    }
    
    //Changes the view after innings change
    this.inningsChange = function (target, secondInnings, score, balls, wickets, battingMove, bowlingMove) {
        self.setScoreBoard(score, balls, wickets);
        self.setOpponentsMove(battingMove, bowlingMove);
        innings = secondInnings;
        setTimeout(function () {
            self.setScoreBoard(0, 0, 0, target);
            self.clearOpponentsMove();
            self.statusUpdate("Innings2: " + innings)
            self.startCountdown();
        }, 4000);
    }
    
    //Handles a dead ball
    this.deadBall = function () {
        let statusBarMessage = document.getElementById('update-box').innerHTML;
        self.statusUpdate("Dead Ball")
        setTimeout(function () {
            self.statusUpdate(statusBarMessage)
            self.clearOpponentsMove();
            self.startCountdown();
        }, 3000);
    }
    
    //Declares the result if match is terminated
    this.declareResult = function (result, score = null, balls = null, wickets = null, battingMove = null, bowlingMove = null) {
        if (score) {
            self.setScoreBoard(score, balls, wickets);
            self.setOpponentsMove(battingMove, bowlingMove);
        }
        self.statusUpdate(result);
        setTimeout(function () {
            document.querySelector('body').innerHTML = "";
            document.querySelector('body').innerHTML = templates['joinRoom'];
        }, 5000);
    }
    
    //Call Back function for run buttons
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
    
    //Initializes Event listeners
    this.initialize = function () {
        for (let index = 1; index < 7; index++) {
            document.querySelector('#' + "game-btn-" + index).addEventListener('click', self.callBack);
        }
    }
}
