let gameView = new GameView();
window.addEventListener('resize', function() {
	let buttonSection = document.getElementById('button-section');
    let referenceNode = document.getElementById('main-container');
	buttonSection.parentNode.removeChild(buttonSection);
	if(window.innerWidth < 758){
		buttonSection.style.margin = "auto"; 
		document.body.appendChild(buttonSection);
	} else {
		console.log(referenceNode.childNodes)
		console.log(referenceNode.childNodes[4])
		referenceNode.childNodes[4].parentNode.insertBefore(buttonSection, referenceNode.childNodes[4]);
	}
})
