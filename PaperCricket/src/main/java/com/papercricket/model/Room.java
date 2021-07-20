package com.papercricket.model;

import com.papercricket.controller.GameController;

import lombok.Data;


@Data
public class Room {
	private GameController gc1;
	private GameController gc2;
	private Player player1;
	private Player player2;
	private int currentInnings;
	private int ballsElapsed;
	private String gameId;
	
	public Room() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public String getGameId() {
		return gameId;
	}

	public void setGameId(String gameId) {
		this.gameId = gameId;
	}

	
	public Player getPlayer1() {
		return player1;
	}

	public void setPlayer1(Player player1) {
		this.player1 = player1;
	}

	public Player getPlayer2() {
		return player2;
	}

	public void setPlayer2(Player player2) {
		this.player2 = player2;
	}

	public GameController getGc1() {
		return gc1;
	}
	public void setGc1(GameController gc1) {
		this.gc1 = gc1;
	}
	public GameController getGc2() {
		return gc2;
	}
	public void setGc2(GameController gc2) {
		this.gc2 = gc2;
	}

	public int getCurrentInnings() {
		return currentInnings;
	}

	public void setCurrentInnings(int currentInnings) {
		this.currentInnings = currentInnings;
	}

	public int getBallsElapsed() {
		return ballsElapsed;
	}

	public void setBallsElapsed(int ballsElapsed) {
		this.ballsElapsed = ballsElapsed;
	}

}
