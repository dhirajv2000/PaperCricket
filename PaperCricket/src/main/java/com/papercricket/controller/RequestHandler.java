package com.papercricket.controller;

import java.io.IOException;

import org.json.JSONArray;

import org.json.JSONObject;

import com.papercricket.exception.CustomException;
import com.papercricket.model.RoomMatcher;
import com.papercricket.service.GameService;

public class RequestHandler {

	public static void handleRequest(String message, GameController ctx) {
		JSONArray array = new JSONArray(message);
		JSONObject object = array.getJSONObject(0);
		String command = object.getString("command");
		switch (command) {
		case "Run Played":
			int lastRun = Integer.parseInt(object.getString("run"));
			String gameId = object.getString("gameId");
			GameService.runPlayed(ctx, lastRun, gameId);
			break;

		case "Get Rooms":
			try {
				if (RoomMatcher.getAllRooms() != null) {
					ctx.sendMessage(RoomMatcher.getAllRooms());
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			break;

		case "New Game":
			GameService.createGame(ctx);
			break;

		case "Join Game":
			try {
				GameService.connectGame(ctx, object.getString("gameId"));
			} catch (CustomException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			break;

		case "Coin Tossed":
			GameService.handleToss(ctx, object.getString("chosenSide"), object.getString("gameId"));
			break;

		case "Innings Chosen":
			GameService.startGame(ctx, object.getString("chosenInnings"), object.getString("gameId"));
			break;

		case "Quit Game":
			GameService.quitGame(ctx, object.getString("gameId"));
			break;

		default:
			System.out.println("Invalid Request");

		}
	}

}