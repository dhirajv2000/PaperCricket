class RoomJoinView {

    newGame(e) {
        e.preventDefault();
        myWorker.postMessage([{
            "command": "New Game"
        }]);
    }

    joinGame(e) {
        e.preventDefault();
        let gameId = document.getElementById("gameid-box").value;
        myWorker.postMessage([{
            "command": "Join Game",
            "gameId": gameId
        }]);
    }

    errorUpdate(message) {
        document.getElementById('error-bar').innerHTML = message;
    }
}
let roomJoinView = new RoomJoinView();
document.querySelector("#new-game-btn").addEventListener('click', roomJoinView.newGame);
document.querySelector("#join-game-btn").addEventListener('click', roomJoinView.joinGame);