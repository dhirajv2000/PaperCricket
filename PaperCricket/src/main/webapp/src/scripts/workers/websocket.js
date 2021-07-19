let socketopen = false;
let Chat = {};
Chat.socket = null;
Chat.connect = (function(host) {
	Chat.socket = new WebSocket(host)
});

Chat.initialize = function(message) {
	Chat.connect('ws://' + 'localhost:8023' + '/PaperCricket/websocket');
	Chat.socket.onopen = function() {
		socketopen = true;
		console.log(message)
		Chat.sendMessage(message);
		console.log("socket opened")
	}
	Chat.socket.onclose = function() {
		socketopen = false;
		console.log("socket closed")
	}
	Chat.socket.onmessage = function(message) {
		console.log(message)
		postMessage(message.data);
		console.log(message.data);
	}

}

Chat.sendMessage = function(payload) {
	Chat.socket.send(JSON.stringify(payload));
}