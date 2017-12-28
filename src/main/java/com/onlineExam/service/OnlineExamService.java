package com.onlineExam.service;

import org.springframework.stereotype.Component;

import com.onlineExam.resource.User;

@Component
public class OnlineExamService {

	
	
	public User getLoginInfo(String userName, String password) {
		
		User u = new User();
		u.setID(1);
		u.setName(userName);
		u.setPassword(password);
		
		return (u != null) ? u : null;
	}
}
