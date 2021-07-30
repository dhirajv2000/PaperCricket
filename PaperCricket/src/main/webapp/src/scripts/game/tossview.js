class TossView {

    constructor() {
        this.hasValidClick = false;
    }

    //Displays Toss Screen
    showTossScreen(message1, newGameId, message2 = null) {
        this.gameId = newGameId
        document.body.innerText = "";
        document.body.innerHTML = templates['tossSection'];
        let textNode = document.createTextNode(message1);
        let spanNode = document.getElementById('loading-dots');
        spanNode.parentNode.insertBefore(textNode, spanNode);
        if (message2) this.statusUpdate('countdown-box', message2);
        this.loadingTimer = setInterval(function () {
            let dots = document.getElementById('loading-dots');
            if (dots.innerHTML.length == 3) {
                dots.innerText = "";
            } else {
                dots.innerText += ".";
            }
        }, 500)
    }

    //Starts Toss when player 2 joins
    startToss() {
        clearInterval(this.loadingTimer)
        this.statusUpdate('update-box', "Player 2 joined, chose Head or Tails");
        this.statusUpdate('countdown-box', "")
        document.body.innerHTML += templates['coinButtons'];
        this.hasValidClick = true;
        this.startCountdown([{
            "command": "Coin Tossed",
            "chosenSide": "Head",
            "gameId": this.gameId
        }]);
        let self = this;
        document.getElementById("head-btn").addEventListener('click', function () {
            self.coinEventHandler(this.innerHTML)
        });
        document.getElementById("tail-btn").addEventListener('click', function () {
        	self.coinEventHandler(this.innerHTML)
        });
    }

    //Displays batting and bowling option to toss winner
    handleTossResult(result, coinSide) {
        let tossResult = result;
        clearInterval(this.loadingTimer)
        if (tossResult == "Won") {
            this.hasValidClick = true;
            document.body.innerText = "";
            document.body.innerHTML = templates['tossSection'];
            document.body.innerHTML += templates['inningsButtons']
            this.statusUpdate('update-box', coinSide + ", you won the toss, choose between:");
            this.startCountdown([{
                "command": "Innings Chosen",
                "chosenInnings": "Batting",
                "gameId": this.gameId
            }]);
            let self = this;
            document.getElementById("bat-btn").addEventListener('click', function() {
            	self.inningsEventHandler(this.innerHTML);
            });
            document.getElementById("bowl-btn").addEventListener('click', function() {
            	self.inningsEventHandler(this.innerHTML);
            });
        } else {
            document.body.innerText = "";
            document.body.innerHTML = templates['tossSection'];
            this.statusUpdate('update-box', coinSide + ", you lost the toss, waiting for opponent");
        }
    }

    //Starts the countdown for selectign the options
    startCountdown(defaultPayload) {
        let timerDuration = 10;
        this.timer = setInterval(function () {
            if (timerDuration <= 0) {
                clearInterval(this.timer);
                this.hasValidMove = false;
                document.getElementById("countdown-box").innerText = "Time Up";
                clearInterval(this.loadingTimer);
                myWorker.postMessage(defaultPayload);
            } else if (this.hasValidClick == false) {
                clearInterval(this.timer);
            } else {
                document.getElementById("countdown-box").innerText = "   " + timerDuration;
            }
            timerDuration -= 1;
        }.bind(this), 1000);
    }

    //Event handler for innings buttons
    inningsEventHandler(clickedInnings) {
        if (!this.hasValidClick) return;
        this.hasValidClick = false;
        document.getElementById("countdown-box").innerText = "";
        clearInterval(this.timer);
        clearInterval(this.loadingTimer);
        let chosenInnings = clickedInnings
        myWorker.postMessage([{
            "command": "Innings Chosen",
            "chosenInnings": chosenInnings,
            "gameId": this.gameId
        }])
    }

    //Returns Game Id
    getGameId() {
        return this.gameId;
    }

    //Event handler for coin buttons
    coinEventHandler(clickedSide) {
        if (!this.hasValidClick) return;
        this.hasValidClick = false;
        document.getElementById("countdown-box").innerText = "";
        clearInterval(this.timer);
        let chosenSide = clickedSide;
        myWorker.postMessage([{
            "command": "Coin Tossed",
            "chosenSide": chosenSide,
            "gameId": this.gameId
        }])
    }

    //Updates Status Bar
    statusUpdate(id, message) {
        document.getElementById(id).innerText = message;
    }

}