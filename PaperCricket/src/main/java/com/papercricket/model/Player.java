package com.papercricket.model;

import com.papercricket.controller.GameController;

public class Player {
	private int lastRun = 0;
	private int wickets = 0;
	private int score = 0;
	private int noMoveCount = 0;
	private String innings;
	GameController gc;
	
	
	public Player(String innings, GameController gc) {
		super();
		this.innings = innings;
		this.gc = gc;
	}

	public GameController getGc() {
		return gc;
	}

	public void setGc(GameController gc) {
		this.gc = gc;
	}

	public int getLastRun() {
		return lastRun;
	}
	public void setLastRun(int lastRun) {
		this.lastRun = lastRun;
	}
	public int getWickets() {
		return wickets;
	}
	public void setWickets(int wickets) {
		this.wickets = wickets;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public String getInnings() {
		return innings;
	}
	public void setInnings(String innings) {
		this.innings = innings;
	}

	public int getNoMoveCount() {
		return noMoveCount;
	}

	public void setNoMoveCount(int noMoveCount) {
		this.noMoveCount = noMoveCount;
	}
	
	
}
