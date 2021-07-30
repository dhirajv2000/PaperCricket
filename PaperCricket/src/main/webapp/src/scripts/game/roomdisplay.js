class RoomDisplay {
    constructor() {
        this.headings = ['Game Id', 'Join Button'];
    }

    displayAll(roomList) {
        if (!document.getElementsByClassName('table-div')[0]) {
            if (roomList.length == 0) return;
            let tableDiv = document.createElement('div');
            tableDiv.setAttribute('class', 'table-div');
            tableDiv.innerHTML = templates['roomTable'];
            tableDiv.style.display = "none";
            let referenceNode = document.getElementsByClassName('toggle-btn')[0];
            referenceNode.parentNode.insertBefore(tableDiv, referenceNode.nextSibling);
            this.thead = document.getElementsByTagName('thead')[0];
            this.tbody = document.getElementsByTagName('tbody')[0];
            this.displayHeading();
            this.displayRooms(roomList);
        } else {
            let tablediv = document.getElementsByClassName('table-div')[0];
            tablediv.parentNode.removeChild(tablediv);
            this.displayAll(roomList);
        }
    }
    
    //Displays Table body
    displayRooms(roomList) {
        for (let index = 0; index < roomList.length; index++) {
            const tr = document.createElement('tr');
            for (let i = 0; i < 2; i++) {
                const td = document.createElement('td');
                if (i == 1) {
                    const button = document.createElement('button');
                    button.innerText = "Join"
                    button.setAttribute('class', 'btn');
                    button.setAttribute('id', roomList[index]);
                    button.addEventListener('click', this.joinGame);
                    td.appendChild(button);
                } else {
                    td.innerText = roomList[index];
                }
                tr.appendChild(td);
            }
            this.tbody.appendChild(tr);
        }

    }
    
    //Displays table header
    displayHeading() {
        const tr = document.createElement('tr');
        for (let index = 0; index < this.headings.length; index++) {
            const th = document.createElement('th');
            th.innerText = this.headings[index];
            tr.appendChild(th);
        }
        this.thead.appendChild(tr);
    }
    
    //Callback to join game
    joinGame() {
        myWorker.postMessage([{
            "command": "Join Game",
            "gameId": this.id
        }]);
    }
    
    //Hides/Shows table
    toggleTable() {
        if (!document.getElementsByClassName('table-div')[0]) {
            alert('No Rooms Available');
            return;
        }
        let rows = document.getElementsByTagName('tr');
        let tableDiv = document.getElementsByClassName('table-div')[0];
        if (rows.length == 0) {
            alert('No Rooms Available')
        } else if (tableDiv.style.display == "block") {
            tableDiv.style.display = "none";
        } else {
            tableDiv.style.display = "block";
        }
    }
}