package com.papercricket.model;

import org.json.JSONObject;

public class ResponseGenerator {
	public static String newGameResponse(String gameId) {
		JSONObject response = new JSONObject();
		response.put("command", "New Game Created");
		response.put("gameId", gameId);
		return response.toString();
	}
	
	public static String joinGameResponse() {
		JSONObject response = new JSONObject();
		response.put("command", "Game Joined");
		return response.toString();
	}
	
	public static String statusUpdate(String message) {
		JSONObject response = new JSONObject();
		response.put("command", "Status Update");
		response.put("message", message);
		return response.toString();
	}
	
	public static String errorUpdate(String message) {
		JSONObject response = new JSONObject();
		response.put("command", "Error Update");
		response.put("message", message);
		return response.toString();
	}
}
