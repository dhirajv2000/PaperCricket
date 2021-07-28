function TossView() {
    let self = this,
        hasValidClick = false,
        gameId, loadingTimer, timer;

    //Displays Toss Screen
    this.showTossScreen = function (message1, newGameId, message2 = null) {
        gameId = newGameId
        document.body.innerHTML = "";
        document.body.innerHTML = templates['tossSection'];
        let textNode = document.createTextNode(message1);
        let spanNode = document.getElementById('loading-dots');
        spanNode.parentNode.insertBefore(textNode, spanNode);
        if (message2) self.statusUpdate('countdown-box', message2);
        loadingTimer = setInterval(function () {
            let dots = document.getElementById('loading-dots');
            if (dots.innerHTML.length == 3) {
                dots.innerHTML = "";
            } else {
                dots.innerHTML += ".";
            }
        }, 500)
    }

    //Starts Toss when player 2 joins
    this.startToss = function () {
        clearInterval(loadingTimer)
        self.statusUpdate('update-box', "Player 2 joined, chose Head or Tails");
        self.statusUpdate('countdown-box', "")
        document.body.innerHTML += templates['coinButtons'];
        hasValidClick = true;
        self.startCountdown([{
            "command": "Coin Tossed",
            "chosenSide": "Head",
            "gameId": gameId
        }]);
        document.getElementById("head-btn").addEventListener('click', self.coinEventHandler);
        document.getElementById("tail-btn").addEventListener('click', self.coinEventHandler);
    }

    //Displays batting and bowling option to toss winner
    this.handleTossResult = function (result, coinSide) {
        let tossResult = result;
        if (tossResult == "Won") {
            hasValidClick = true;
            document.body.innerHTML = "";
            document.body.innerHTML = templates['tossSection'];
            document.body.innerHTML += templates['inningsButtons']
            self.statusUpdate('update-box', coinSide + ", you won the toss, choose between:");
            self.startCountdown([{
                "command": "Innings Chosen",
                "chosenInnings": "Batting",
                "gameId": gameId
            }]);
            document.getElementById("bat-btn").addEventListener('click', self.inningsEventHandler);
            document.getElementById("bowl-btn").addEventListener('click', self.inningsEventHandler);
        } else {
            document.body.innerHTML = "";
            document.body.innerHTML = templates['tossSection'];
            self.statusUpdate('update-box', coinSide + ", you lost the toss, waiting for opponent");
        }
    }

    //Starts the countdown for selectign the options
    this.startCountdown = function (defaultPayload) {
        let timerDuration = 10;
        timer = setInterval(function () {
            if (timerDuration <= 0) {
                clearInterval(timer);
                hasValidMove = false;
                document.getElementById("countdown-box").innerHTML = "Time Up";
                clearInterval(loadingTimer);
                myWorker.postMessage(defaultPayload);
            } else if (hasValidClick == false) {
                clearInterval(timer);
            } else {
                document.getElementById("countdown-box").innerHTML = "&nbsp;&nbsp;&nbsp;" + timerDuration;
            }
            timerDuration -= 1;
        }, 1000);
    }

    //Event handler for innings buttons
    this.inningsEventHandler = function () {
        if (!hasValidClick) return;
        hasValidClick = false;
        document.getElementById("countdown-box").innerHTML = "";
        clearInterval(timer);
        clearInterval(loadingTimer);
        let chosenInnings = this.innerHTML;
        myWorker.postMessage([{
            "command": "Innings Chosen",
            "chosenInnings": chosenInnings,
            "gameId": gameId
        }])
    }

    //Event handler for coin buttons
    this.coinEventHandler = function () {
        if (!hasValidClick) return;
        hasValidClick = false;
        document.getElementById("countdown-box").innerHTML = "";
        clearInterval(timer);
        let chosenSide = this.innerHTML;
        myWorker.postMessage([{
            "command": "Coin Tossed",
            "chosenSide": chosenSide,
            "gameId": gameId
        }])
    }

    this.statusUpdate = function (id, message) {
        document.getElementById(id).innerHTML = message;
    }

}