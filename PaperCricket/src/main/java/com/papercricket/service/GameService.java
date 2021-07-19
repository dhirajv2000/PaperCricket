package com.papercricket.service;

import com.papercricket.controller.GameController;
import com.papercricket.exception.CustomException;
import com.papercricket.model.*;
import com.papercricket.storage.RoomStorage;

import java.io.IOException;

public class GameService {
	public static void createGame(GameController ctx) {
		Room room = new Room();
		String gameId = GenerateId.generateGameId();
		Player player1 = new Player();
		room.setPlayer1(player1);
		room.setGameId(gameId);
		room.setGc1(ctx);
		RoomStorage.getInstance().setGame(room);
		GameController gc1 = room.getGc1();
		String response = ResponseGenerator.newGameResponse(room.getGameId());
		try {
			gc1.sendMessage(response);
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
		if (room.getGc2() != null) {
			try {
				ctx.sendMessage(ResponseGenerator.errorUpdate("Game is full"));
				return;
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		Player player2 = new Player();
		room.setGc2(ctx);
		room.setPlayer2(player2);
		RoomStorage.getInstance().setGame(room);
		try {
			room.getGc2().sendMessage(ResponseGenerator.joinGameResponse());
			room.getGc1().sendMessage(ResponseGenerator.statusUpdate("Player 2 Joined"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
