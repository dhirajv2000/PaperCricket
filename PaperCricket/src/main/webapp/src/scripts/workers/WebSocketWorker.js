importScripts("websocket.js");

onmessage = function(e){
	function sendPayload(payload) {
		if(!socketopen){
			Chat.initialize(payload);
		} else {
			Chat.sendMessage(payload);
		}
	}
	sendPayload(e.data);
}