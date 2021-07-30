class GameView {

    constructor() {
        this.hasValidMove = false;
        this.gameId = null;
        this.innings = null;
    }

    //Starts a new game
    startGame(GameId, firstInnings) {
        this.gameId = GameId;
        this.innings = firstInnings;
        document.getElementsByTagName('body')[0].innerText = "";
        document.getElementsByTagName('body')[0].innerHTML = templates['gamePlay']
        this.initializeEventListeners();
        document.getElementById('update-box').innerText = "Innings 1: " + this.innings;
        this.initaliseScoreBoard();
        this.startCountdown();
    }

    //Starts the countdown for playing a move
    startCountdown() {
        this.hasValidMove = true;
        let timerDuration = 10;
        let timer = setInterval(function () {
            if (timerDuration <= 0) {
                clearInterval(timer);
                this.hasValidMove = false;
                document.getElementById("countdown-box").innerText = "Time Up";
                myWorker.postMessage([{
                    "command": "Run Played",
                    "run": "7",
                    "gameId": this.gameId
                }])
            } else if (this.hasValidMove == false) {
                clearInterval(timer);
            } else {
                document.getElementById("countdown-box").innerText = "   " + timerDuration;
            }
            timerDuration -= 1;
        }.bind(this), 1000);
    }

    //Sets up the scoreboard
    initaliseScoreBoard(target = null) {
        if (this.innings == "Batting") {
            document.getElementById('user-scoreboard').innerHTML = templates['battingScoreBoard'];
            document.getElementById('opponent-scoreboard').innerHTML = templates['bowlingScoreBoard'];
            if (target) {
                document.getElementById('user-scoreboard').innerHTML += templates['target'];
            }
        } else {
            document.getElementById('user-scoreboard').innerHTML = templates['bowlingScoreBoard'];
            document.getElementById('opponent-scoreboard').innerHTML = templates['battingScoreBoard'];
            if (target) {
                document.getElementById('opponent-scoreboard').innerHTML += templates['target'];
            }
        }
    }

    //Updates the update box
    statusUpdate(message) {
        document.getElementById('update-box').innerText = message;
    }

    //Updates the scoreboard
    setScoreBoard(score, balls, wickets, target = null) {
        document.getElementById('Runs').innerText = " " + score + "/" + wickets;
        document.getElementById('Balls').innerText = Math.trunc(balls / 6) + "." + (balls % 6);
        if (target) document.getElementById('Target').innerText = target;
    }

    //Displays Oppponents Move
    setOpponentsMove(battingMove, bowlingMove) {
        if (battingMove == 7 || bowlingMove == 7) return;
        if (this.innings == "Batting") {
            document.getElementById('opponent-playarea').innerText = bowlingMove;
        } else {
            document.getElementById('opponent-playarea').innerText = battingMove;
        }
    }

    //Handles scoreUpdate
    scoreUpdate(score, balls, wickets, battingMove, bowlingMove) {
        this.setScoreBoard(score, balls, wickets);
        this.setOpponentsMove(battingMove, bowlingMove);
        setTimeout(function () {
            this.startCountdown();
            this.clearOpponentsMove();
        }.bind(this), 2000);
    }

    //Changes the view after innings change
    inningsChange(target, secondInnings, score, balls, wickets, battingMove, bowlingMove) {
        this.setScoreBoard(score, balls, wickets);
        this.setOpponentsMove(battingMove, bowlingMove);
        this.innings = secondInnings;
        setTimeout(function () {
            this.clearOpponentsMove();
            this.initaliseScoreBoard(target);
            this.setScoreBoard(0, 0, 0, target);
            alert("Innings Change!")
            this.statusUpdate("Innings 2: " + this.innings)
            this.startCountdown();
        }.bind(this), 4000);
    }

    //Resets the playing area
    clearOpponentsMove() {
        document.getElementById('user-playarea').innerText = "?";
        document.getElementById('opponent-playarea').innerText = "?";
    }

    //Handles a dead ball
    deadBall() {
        let statusBarMessage = document.getElementById('update-box').innerText;
        this.statusUpdate("Dead Ball")
        setTimeout(function () {
            this.statusUpdate(statusBarMessage)
            this.clearOpponentsMove();
            this.startCountdown();
        }.bind(this), 3000);
    }

    //Declares the result if match is terminated
    declareResult(result, score = null, balls = null, wickets = null, battingMove = null, bowlingMove = null) {
        if (score) {
            this.setScoreBoard(score, balls, wickets);
            this.setOpponentsMove(battingMove, bowlingMove);
        }
        let resultMessage = {
            'Won': 'You Win !!!',
            'Lost': 'You lose',
            'Draw': "It's a draw",
            'Mt': "Match Terminated, It's a draw"
        }
        this.statusUpdate(resultMessage[result]);
        setTimeout(function () {
            document.getElementsByTagName('body')[0].innerText = "";
            document.getElementsByTagName('body')[0].innerHTML = templates['joinRoom'];
            document.getElementsByTagName('body')[0].innerHTML = templates['joinRoom'];
            document.getElementsByClassName('toggle-btn')[0].addEventListener('click', roomDisplay.toggleTable);
            myWorker.postMessage([{
                "command": "Get Rooms"
            }])
        }.bind(this), 5000);
    }

    //Initializes Event listeners
    initializeEventListeners() {
        for (let index = 1; index < 7; index++) {
            let self = this;
            document.getElementById("game-btn-" + index).addEventListener('click', function () {
                if (!self.hasValidMove) return;
                self.hasValidMove = false;
                document.getElementById("countdown-box").innerText = "";
                let clickedRun = this.innerText
                document.getElementById('user-playarea').innerText = clickedRun;
                myWorker.postMessage([{
                    "command": "Run Played",
                    "run": clickedRun,
                    "gameId": self.gameId
                }])
            });
        }
    }

}