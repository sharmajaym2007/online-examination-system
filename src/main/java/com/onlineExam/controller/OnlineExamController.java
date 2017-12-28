package com.onlineExam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.onlineExam.service.OnlineExamService;

@RestController("/login")
public class OnlineExamController {

	@Autowired
	private OnlineExamService examService;
	
	@GetMapping("")
	public void login(String username, String password) {
		examService.getLoginInfo(username, password);
	}
}
