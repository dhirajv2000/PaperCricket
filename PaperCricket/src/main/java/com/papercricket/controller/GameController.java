package com.papercricket.controller;

import javax.websocket.server.ServerEndpoint;
import com.papercricket.service.GameService;
import java.io.IOException;
import java.io.StringReader;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.AtomicInteger;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.ArrayList;
import java.util.List;
@ServerEndpoint("/websocket")
public class GameController {
	private Session session;
	private static AtomicInteger userCount = new AtomicInteger(0);
	@OnOpen
	public void onOpen(Session session) {
		this.session = session;
		userCount.incrementAndGet();
		System.out.println("New Connection, online:" + getOnlineCount());
	}
	
	@OnMessage
	public void onMessage(String message, Session session) {
		RequestHandler.handleRequest(message, this);		
	}
	
	@OnClose
	public void onClose() {
		userCount.decrementAndGet();
		System.out.println("Someone Disconnected, online:" + getOnlineCount());
	}
	
	 @OnError
	    public void onError(Session session, Throwable t){
	        System.out.println(t.getMessage());
	        System.out.println(t.getCause());
	        t.printStackTrace();
	    }
	 
	 public void sendMessage(String message) throws IOException{
	        this.session.getBasicRemote().sendText(message);
	    }
	
	
	public static int getOnlineCount() {
		return userCount.get();
	}
}
