package com.papercricket.storage;

import java.util.HashMap;
import java.util.Map;

import com.papercricket.model.Room;

public class RoomStorage {
	
	private static Map<String, Room> rooms;
	private static RoomStorage instance;
	
	private RoomStorage() {
		rooms = new HashMap<>();
	}

	public static synchronized RoomStorage getInstance() {
		if (instance == null) {
			instance = new RoomStorage();
		}
		return instance;
	}

	public Map<String, Room> getGames() {
		return rooms;
	}

	public void setGame(Room room) {
		rooms.put(room.getGameId(), room);
	}
}
