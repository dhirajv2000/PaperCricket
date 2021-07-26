package com.papercricket.controller;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.concurrent.atomic.AtomicInteger;

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
