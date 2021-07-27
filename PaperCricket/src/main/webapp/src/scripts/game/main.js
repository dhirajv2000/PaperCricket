let gameView = new GameView();
let tossView = new TossView();

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
		console.log(referenceNode.childNodes)
		console.log(referenceNode.childNodes[4])
		referenceNode.childNodes[4].parentNode.insertBefore(buttonSection, referenceNode.childNodes[4]);
	}
})
