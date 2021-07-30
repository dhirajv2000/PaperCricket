package com.papercricket.service;

import com.papercricket.controller.GameController;
import com.papercricket.exception.CustomException;
import com.papercricket.model.*;
import com.papercricket.storage.RoomStorage;

import java.io.IOException;

public class GameService {

	public static void runPlayed(GameController ctx, int lastRun, String gameId) {
		Room room = RoomStorage.getInstance().getGames().get(gameId);

		if (room.getPlayer1().getGc() == ctx) {
			Player player1 = room.getPlayer1();
			player1.setLastRun(lastRun);
			Player player2 = room.getPlayer2();
			if (player2.getLastRun() == 0) {
				return;
			} else {
				BallOutcome.playBall(player1, player2, room);
			}
		} else {
			Player player1 = room.getPlayer1();
			Player player2 = room.getPlayer2();
			player2.setLastRun(lastRun);
			if (player1.getLastRun() == 0) {
				return;
			} else {
				BallOutcome.playBall(player1, player2, room);
			}
		}
	}

	public static void startGame(GameController ctx, String chosenInnings, String gameId) {
		Room room = RoomStorage.getInstance().getGames().get(gameId);
		Player player1 = room.getPlayer1();
		Player player2 = room.getPlayer2();
		if (room.getPlayer1().getGc() == ctx) {
			if (chosenInnings.equals("Batting")) {
				player1.setInnings("Batting");
				player2.setInnings("Bowling");
			} else {
				player1.setInnings("Bowling");
				player2.setInnings("Batting");
			}
		} else {
			if (chosenInnings.equals("Batting")) {
				player2.setInnings("Batting");
				player1.setInnings("Bowling");
			} else {
				player2.setInnings("Bowling");
				player1.setInnings("Batting");
			}
		}
		try {
			player1.getGc().sendMessage(ResponseGenerator.startGameResponse(player1.getInnings(), gameId));
			player2.getGc().sendMessage(ResponseGenerator.startGameResponse(player2.getInnings(), gameId));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void handleToss(GameController ctx, String ChosenSide, String gameId) {
		Room room = RoomStorage.getInstance().getGames().get(gameId);
		String coinArray[] = { "Head", "Tail" };
		int randomNumber = (int) (Math.random() * (2 - 0)) + 0;
		if (coinArray[randomNumber].equals(ChosenSide)) {
			try {
				room.getPlayer1().getGc().sendMessage(ResponseGenerator.tossResult("Won", coinArray[randomNumber]));
				room.getPlayer2().getGc().sendMessage(ResponseGenerator.tossResult("Lost", coinArray[randomNumber]));
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			try {
				room.getPlayer2().getGc().sendMessage(ResponseGenerator.tossResult("Won", coinArray[randomNumber]));
				room.getPlayer1().getGc().sendMessage(ResponseGenerator.tossResult("Lost", coinArray[randomNumber]));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	public static void createGame(GameController ctx) {
		String gameId = GenerateId.generateGameId();
		Player player1 = new Player(ctx);
		Room room = new Room(gameId);
		room.setPlayer1(player1);
		RoomStorage.getInstance().setGame(room);
		RoomMatcher.sendAllConnections();
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
		Player player2 = new Player(ctx);
		room.setPlayer2(player2);
		room.setOpen(false);
		RoomMatcher.sendAllConnections();
		RoomStorage.getInstance().setGame(room);
		try {
			room.getPlayer2().getGc().sendMessage(ResponseGenerator.joinGameResponse(gameId));
			room.getPlayer1().getGc().sendMessage(ResponseGenerator.startTossResponse());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static void quitGame(GameController ctx, String gameId) {
		RoomStorage.deleteRoom(gameId);
		RoomMatcher.sendAllConnections();
	}

}
