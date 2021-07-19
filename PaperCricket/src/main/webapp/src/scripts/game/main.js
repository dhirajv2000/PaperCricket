let gameView = new GameView();

window. onbeforeunload = function () {
	return 'Connection to game will be lost';
	}