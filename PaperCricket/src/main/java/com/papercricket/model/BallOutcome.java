package com.papercricket.model;

import java.io.IOException;

import com.papercricket.storage.RoomStorage;

public class BallOutcome {
	public static void playBall(Player player1, Player player2, Room room) {
		Player batting, bowling;
		if (player1.getInnings().equals("Batting")) {
			batting = player1;
			bowling = player2;
		} else {
			batting = player2;
			bowling = player1;
		}
		if (!(checkCombinedResponse(batting, bowling, room))) {
			return;
		}
		if (checkBatsmenResponse(batting, room) && checkBowlerResponse(bowling, batting, room)) {
			checkBallResult(batting, bowling, room);
		}

		if (room.getCurrentInnings() == 1
				&& (batting.getWickets() == 5 || room.getBallsElapsed() == 30 || batting.getNoMoveCount() == 4)
				|| bowling.getNoMoveCount() == 4) {
			inningsChange(batting, bowling, room);
		} else if (room.getCurrentInnings() == 2 && (batting.getWickets() == 5 || room.getBallsElapsed() == 30
				|| batting.getScore() >= room.getTarget() || batting.getNoMoveCount() == 4)
				|| bowling.getNoMoveCount() == 4) {
			declareWinner(batting, bowling, room);
		} else {
			sendScoreUpdate(batting, bowling, room);
		}
	}

	public static boolean checkCombinedResponse(Player batting, Player bowling, Room room) {
		if (batting.getLastRun() == 7 && bowling.getLastRun() == 7) {
			room.setCombinedNoMoveCount(room.getCombinedNoMoveCount() + 1);
			batting.setNoMoveCount(batting.getNoMoveCount() + 1);
			bowling.setNoMoveCount(bowling.getNoMoveCount() + 1);
			batting.setLastRun(0);
			bowling.setLastRun(0);
		} else {
			room.setCombinedNoMoveCount(0);
			return true;
		}
		if (room.getCombinedNoMoveCount() == 3) {
			try {
				batting.getGc().sendMessage(ResponseGenerator.terminateMatch("Mt"));
				bowling.getGc().sendMessage(ResponseGenerator.terminateMatch("Mt"));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return false;
		} else {
			try {
				batting.getGc().sendMessage(ResponseGenerator.deadBall());
				bowling.getGc().sendMessage(ResponseGenerator.deadBall());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return false;
		}
	}

	public static boolean checkBatsmenResponse(Player batting, Room room) {
		if (batting.getLastRun() == 7) {
			batting.setNoMoveCount(batting.getNoMoveCount() + 1);
			room.setBallsElapsed(room.getBallsElapsed() + 1);
			return false;
		} else {
			batting.setNoMoveCount(0);
			return true;
		}

	}

	public static boolean checkBowlerResponse(Player bowling, Player batting, Room room) {
		if (bowling.getLastRun() == 7) {
			bowling.setNoMoveCount(bowling.getNoMoveCount() + 1);
			batting.setScore(batting.getScore() + 1);
			return false;
		} else {
			bowling.setNoMoveCount(0);
			return true;
		}
	}

	public static void checkBallResult(Player batting, Player bowling, Room room) {
		int bowlingRun = bowling.getLastRun();
		int battingRun = batting.getLastRun();
		if (battingRun != bowlingRun) {
			int battingScore = batting.getScore();
			battingScore += battingRun;
			batting.setScore(battingScore);
		} else {
			int battingWickets = batting.getWickets();
			battingWickets += 1;
			batting.setWickets(battingWickets);
		}
		room.setBallsElapsed(room.getBallsElapsed() + 1);
		return;
	}

	public static void sendScoreUpdate(Player batting, Player bowling, Room room) {
		try {
			String response = ResponseGenerator.scoreUpdate(batting.getScore(), room.getBallsElapsed(),
					batting.getWickets(), batting.getLastRun(), bowling.getLastRun());
			batting.getGc().sendMessage(response);
			bowling.getGc().sendMessage(response);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		batting.setLastRun(0);
		bowling.setLastRun(0);
	}

	public static void inningsChange(Player batting, Player bowling, Room room) {
		try {
			batting.setNoMoveCount(0);
			bowling.setNoMoveCount(0);
			batting.getGc()
					.sendMessage(ResponseGenerator.inningsChange(batting.getScore() + 1, "Bowling", batting.getScore(),
							room.getBallsElapsed(), batting.getWickets(), batting.getLastRun(), bowling.getLastRun()));
			bowling.getGc()
					.sendMessage(ResponseGenerator.inningsChange(batting.getScore() + 1, "Batting", batting.getScore(),
							room.getBallsElapsed(), batting.getWickets(), batting.getLastRun(), bowling.getLastRun()));
			room.setBallsElapsed(0);
			room.setCurrentInnings(2);
			room.setTarget(batting.getScore() + 1);
			batting.setLastRun(0);
			bowling.setLastRun(0);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		batting.setInnings("Bowling");
		bowling.setInnings("Batting");
		return;
	}

	public static void declareWinner(Player batting, Player bowling, Room room) {
		String batsmenResult = null, bowlerResult = null;
		if (batting.getWickets() == 5 && room.getBallsElapsed() < 30) {
			bowlerResult = "Won";
			batsmenResult = "Lost";
		} else if (room.getBallsElapsed() == 30) {
			if (batting.getScore() >= room.getTarget()) {
				bowlerResult = "Lost";
				batsmenResult = "Won";
			} else if (batting.getScore() < room.getTarget()) {
				bowlerResult = "Won";
				batsmenResult = "Lost";
			} else {
				bowlerResult = "Draw";
				batsmenResult = "Draw";
			}
		} else if (batting.getScore() >= room.getTarget()) {
			bowlerResult = "Lost";
			batsmenResult = "Won";
		} else if (batting.getNoMoveCount() == 4) {
			bowlerResult = "Won";
			batsmenResult = "Lost";
		} else if (bowling.getNoMoveCount() == 4) {
			bowlerResult = "Lost";
			batsmenResult = "Won";
		}
		try {
			bowling.getGc().sendMessage(ResponseGenerator.declareResults(bowlerResult, batting.getScore(),
					room.getBallsElapsed(), batting.getWickets(), batting.getLastRun(), bowling.getLastRun()));
			batting.getGc().sendMessage(ResponseGenerator.declareResults(batsmenResult, batting.getScore(),
					room.getBallsElapsed(), batting.getWickets(), batting.getLastRun(), bowling.getLastRun()));
			RoomStorage.deleteRoom(room.getGameId());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}
