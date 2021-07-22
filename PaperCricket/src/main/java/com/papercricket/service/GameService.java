package com.papercricket.service;

import com.papercricket.controller.GameController;
import com.papercricket.exception.CustomException;
import com.papercricket.model.*;
import com.papercricket.storage.RoomStorage;

import java.io.IOException;

public class GameService {
	public static void createGame(GameController ctx) {
		String gameId = GenerateId.generateGameId();
		Player player1 = new Player( "Batting", ctx);
		Room room = new Room(gameId);
		room.setPlayer1(player1);
		RoomStorage.getInstance().setGame(room);
		String response = ResponseGenerator.newGameResponse(room.getGameId());
		try {
			player1.getGc().sendMessage(response);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static void connectGame(GameController ctx, String gameId) throws CustomException {
		if (!RoomStorage.getInstance().getGames().containsKey(gameId)) {
			try {
				ctx.sendMessage(ResponseGenerator.errorUpdate("Game Id does not exist"));
				return;
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		Room room = RoomStorage.getInstance().getGames().get(gameId);
		if (room.getPlayer2() != null) {
			try {
				ctx.sendMessage(ResponseGenerator.errorUpdate("Game is full"));
				return;
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		Player player2 = new Player("Bowling", ctx);
		room.setPlayer2(player2);
		RoomStorage.getInstance().setGame(room);
		try {
			room.getPlayer2().getGc().sendMessage(ResponseGenerator.joinGameResponse(gameId));
			room.getPlayer1().getGc().sendMessage(ResponseGenerator.startGameResponse());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void runPlayed(GameController ctx, int lastRun, String gameId) {
		Room room = RoomStorage.getInstance().getGames().get(gameId);
		if(room.getPlayer1().getGc() == ctx) {
			Player player1 = room.getPlayer1();
			player1.setLastRun(lastRun);
			Player player2 = room.getPlayer2();
			if(player2.getLastRun() == 0) {
				return;
			} else {
				BallOutcome.playBall(player1, player2, room);
			}	
		} else {
			Player player1 = room.getPlayer1();
			Player player2 = room.getPlayer2();
			player2.setLastRun(lastRun);
			if(player1.getLastRun() == 0) {
				return;
			} else {
				BallOutcome.playBall(player1, player2, room);
			}	
		}
	}
}
