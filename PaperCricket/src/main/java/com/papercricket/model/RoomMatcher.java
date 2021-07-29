package com.papercricket.model;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArraySet;


import org.json.JSONObject;

import com.papercricket.controller.GameController;
import com.papercricket.storage.RoomStorage;

public class RoomMatcher {
	public static String getAllRooms() {
		String response = null;
		if (RoomStorage.getRooms() != null) {
			List<String> roomList = new ArrayList<String>();
			JSONObject jo = new JSONObject();
			jo.put("command", "Display Rooms");
			Iterator<Map.Entry<String, Room>> iterator = RoomStorage.getRooms().entrySet().iterator();
			while (iterator.hasNext()) {
				Map.Entry<String, Room> entry = iterator.next();
				if (entry.getValue().isOpen()) {
					roomList.add(entry.getKey());
				}
			}
			jo.put("roomList", roomList);
			response = jo.toString();
		}
		return response;
	}

	public static void sendAllConnections() {
		Iterator<GameController> iterator = GameController.getGcList().iterator();
		while (iterator.hasNext()) {
			try {
				iterator.next().sendMessage(getAllRooms());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
