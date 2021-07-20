package com.papercricket.model;

import org.json.JSONObject;

public class ResponseGenerator {
	public static String newGameResponse(String gameId) {
		JSONObject response = new JSONObject();
		response.put("command", "New Game Created");
		response.put("gameId", gameId);
		response.put("Innings", "Batting");
		return response.toString();
	}
	
	public static String startGameResponse() {
		JSONObject response = new JSONObject();
		response.put("command", "Start Game");
		return response.toString();
	}
	
	public static String joinGameResponse(String gameId) {
		JSONObject response = new JSONObject();
		response.put("command", "Game Joined");
		response.put("Innings", "Bowling");
		response.put("gameId", gameId);
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
	
	public static String scoreUpdate(int score, int ballsElapsed, int wickets, int battingMove, int bowlingMove) {
		JSONObject response = new JSONObject();
		response.put("command", "Score Update");
		response.put("score", score);
		response.put("balls", ballsElapsed);
		response.put("wickets", wickets);
		response.put("battingMove", battingMove);
		response.put("bowlingMove", bowlingMove);
		return response.toString();
	}
}
