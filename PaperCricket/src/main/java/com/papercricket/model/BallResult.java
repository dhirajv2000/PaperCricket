package com.papercricket.model;

import java.io.IOException;

import com.papercricket.storage.RoomStorage;

public class BallResult {
	public static void playBall(Player player1, Player player2, Room room) {
		Player batting, bowling;
		if(player1.getInnings().equals("Batting")) {
			batting = player1;
			bowling = player2;
		} else {
			batting = player2;
			bowling = player1;
		}
		int bowlingRun = bowling.getLastRun();
		int battingRun = batting.getLastRun();
		
		if(battingRun != bowlingRun) {
			int battingScore = batting.getScore();
			battingScore += battingRun;
			batting.setScore(battingScore);
		} else {
			int battingWickets = batting.getWickets();
			battingWickets +=1;
			batting.setWickets(battingWickets);
		}
		if(player1.getInnings().equals("Batting")) {
			room.setPlayer1(batting);
			room.setPlayer2(bowling);
		} else {
			room.setPlayer1(bowling);
			room.setPlayer2(batting);
		}
		int ballsElapsed = room.getBallsElapsed();
		ballsElapsed +=1;
		room.setBallsElapsed(ballsElapsed);
		try {
			room.getGc1().sendMessage(ResponseGenerator.scoreUpdate(batting.getScore(), room.getBallsElapsed(), batting.getWickets(), batting.getLastRun(), bowling.getLastRun()));
			room.getGc2().sendMessage(ResponseGenerator.scoreUpdate(batting.getScore(), room.getBallsElapsed(), batting.getWickets(), batting.getLastRun(), bowling.getLastRun()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		batting.setLastRun(0);
		bowling.setLastRun(0);
		RoomStorage.getInstance().setGame(room);
		
	}
}
