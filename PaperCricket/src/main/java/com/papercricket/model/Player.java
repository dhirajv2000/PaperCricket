package com.papercricket.model;

public class Player {
	private int lastRun;
	private int wickets;
	private int score;
	private String innings;
	public Player() {
		super();
		// TODO Auto-generated constructor stub
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
	
	
}
