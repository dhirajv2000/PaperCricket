let gameView = new GameView();
let tossView = new TossView();
let roomDisplay = new RoomDisplay()

window.addEventListener('resize', function() {
	let buttonSection = document.getElementById('button-section');
    let referenceNode = document.getElementById('main-container');
    try{
    	buttonSection.parentNode.removeChild(buttonSection);
    } catch(err){
    	return;
    }
	if(window.innerWidth/window.screen.availWidth < 0.5){
		buttonSection.style.margin = "auto"; 
		document.body.appendChild(buttonSection);
	} else {
		referenceNode.childNodes[4].parentNode.insertBefore(buttonSection, referenceNode.childNodes[4]);
	}
})

window.onbeforeunload = function (event) {
	return 'Do you really want to close ?';
}

window.onunload = function(event) {
	if(!tossView.getGameId()) return;
	 myWorker.postMessage([{
	        "command" : "Quit Game",
	        "gameId" : tossView.getGameId().toString()
	    }]);
}
document.addEventListener("DOMContentLoaded", () => {
	document.querySelector('.toggle-btn').addEventListener('click', roomDisplay.toggleTable);
	 myWorker.postMessage([{
	        "command" : "Get Rooms"
	    }])
})
