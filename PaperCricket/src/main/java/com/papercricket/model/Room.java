package com.papercricket.model;

public class Room {
	private Player player1;
	private Player player2;
	private boolean isOpen;
	private int currentInnings = 1;
	private int ballsElapsed = 0;
	private int target;
	private int combinedNoMoveCount = 0;
	private String gameId;

	public Room(String gameId) {
		super();
		this.gameId = gameId;
		this.isOpen = true;
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

	public int getTarget() {
		return target;
	}

	public void setTarget(int target) {
		this.target = target;
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

	public int getCombinedNoMoveCount() {
		return combinedNoMoveCount;
	}

	public void setCombinedNoMoveCount(int combinedNoMoveCount) {
		this.combinedNoMoveCount = combinedNoMoveCount;
	}

	public boolean isOpen() {
		return isOpen;
	}

	public void setOpen(boolean isOpen) {
		this.isOpen = isOpen;
	}

}
