package com.papercricket.model;

import java.util.Random;

public class GenerateId {
	public static String generateGameId() {
		Random rnd = new Random();
	    int number = rnd.nextInt(999999);
	    return String.format("%06d", number);
	}
}
