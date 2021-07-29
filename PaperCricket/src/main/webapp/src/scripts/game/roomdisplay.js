function RoomDisplay() {
    const self = this;
	let thead, tbody;
    const headings = ['Game Id', 'Join Button']
	this.displayAll = function(roomList) {
    	if(!document.querySelector('.table-div') && roomList.length !=0){
    		let tableDiv = document.createElement('div');
    		tableDiv.setAttribute('class', 'table-div');
    		tableDiv.innerHTML = templates['roomTable'];
    		tableDiv.style.display = "none";
    		let referenceNode = document.querySelector('.toggle-btn');
    		referenceNode.parentNode.insertBefore(tableDiv, referenceNode.nextSibling);
    		thead = document.querySelector('thead');
    	    tbody = document.querySelector('tbody');
    		self.displayHeading();
            self.displayRooms(roomList);
    	} else{
    		let tablediv = document.querySelector('.table-div');
    		tablediv.parentNode.removeChild(tablediv);
    		self.displayAll(roomList);
    	}
	}

    this.displayRooms = function(roomList) {
        for(let index = 0 ; index < roomList.length; index++){
            const tr = document.createElement('tr');
            for(let i = 0; i < 2; i++){
                const td = document.createElement('td');
                if(i==1) {
                    const button = document.createElement('button');
                    button.innerHTML = "Join"
                    button.setAttribute('class', 'btn');
                    button.setAttribute('id', roomList[index]);
                    button.addEventListener('click', self.joinGame);
                    td.appendChild(button);
                } else {
                    td.innerHTML = roomList[index]; 
                }
                tr.appendChild(td);
            }
         tbody.appendChild(tr);
        }
    
    }

    this.displayHeading = function () {
        const tr = document.createElement('tr');
        for(let index = 0; index < headings.length; index++){
            const th = document.createElement('th');
            th.innerHTML = headings[index];
            tr.appendChild(th);
        }
        thead.appendChild(tr);
    }
    
    this.joinGame = function() {
	    myWorker.postMessage([{"command": "Join Game", "gameId": this.id}]);
    }
    
    this.toggleTable = function() {
    	if(!document.querySelector('.table-div')){
    		alert('No Rooms Available');
    		return;
    	}
    	let rows = document.getElementsByTagName('tr');
    	let tableDiv = document.querySelector('.table-div');
    	if(rows.length == 0){
    		alert('No Rooms Available')
    	} else if(tableDiv.style.display == "block") {
    		tableDiv.style.display = "none";
    	} else {
    		tableDiv.style.display = "block";
    	}
    }
}