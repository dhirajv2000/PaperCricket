package com.papercricket.controller;


import org.json.JSONArray;

import org.json.JSONObject;

import com.papercricket.exception.CustomException;
import com.papercricket.service.GameService;

public class RequestHandler {
	
	public static void handleRequest(String message, GameController ctx) {
		JSONArray array = new JSONArray(message);
		JSONObject object = array.getJSONObject(0);
		String command = object.getString("command");
		if(command.equals("Run Played")) {
			int lastRun = Integer.parseInt(object.getString("run"));
			String gameId = object.getString("gameId");
			GameService.runPlayed(ctx,lastRun,gameId);
			return;
		}
		if(command.equals("New Game")) {
			GameService.createGame(ctx);
			return;
		}
		if(command.equals("Join Game")) {
			String gameId = object.getString("gameId");
			try {
				GameService.connectGame(ctx, gameId);
			} catch (CustomException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return;
		}
		if(command.equals("Coin Tossed")) {
			GameService.handleToss(ctx, object.getString("chosenSide"), object.getString("gameId"));
			return;
		}
		
		if(command.equals("Innings Chosen")) {
			GameService.startGame(ctx, object.getString("chosenInnings"), object.getString("gameId"));
			return;
		}
	}
	
}