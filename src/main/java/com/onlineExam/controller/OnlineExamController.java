package com.onlineExam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.onlineExam.resource.QuestionAnswers;
import com.onlineExam.resource.Result;
import com.onlineExam.resource.User;
import com.onlineExam.service.OnlineExamService;

@RestController
public class OnlineExamController {

	@Autowired
	private OnlineExamService examService;
	
	ObjectMapper mapper = new ObjectMapper();
	
	@PostMapping("/login")
	public ResponseEntity<User> login(String userName, String password) {
		User user = examService.getLoginInfo(userName, password);

		return new ResponseEntity<>(user, new HttpHeaders(), HttpStatus.OK);
	}
	
	@GetMapping("/questions")
	public ResponseEntity<List<QuestionAnswers>> getQuestions() {
		List<QuestionAnswers> questions = examService.getQuestionAnswers();

		return new ResponseEntity<>(questions, new HttpHeaders(), HttpStatus.OK);
	}
	
	@PostMapping("/addResult")
	public ResponseEntity<Result> addUserEntries(@RequestParam("userID") int userID, List<QuestionAnswers> questions) {
		Result res = examService.calcUserScore(questions, userID);
		
		return new ResponseEntity<>(res, new HttpHeaders(), HttpStatus.OK);
	}
	
	@PostMapping("/addStudent")
	public ResponseEntity<?> addStudent(User user) {
		examService.addStudent(user);
		
		return new ResponseEntity<>("", new HttpHeaders(), HttpStatus.CREATED);
	}
	
	@PostMapping("/addQuestion")
	public ResponseEntity<?> addQuestion(QuestionAnswers questionAnswers) {
		examService.addQuestion(questionAnswers);
		
		return new ResponseEntity<>("", new HttpHeaders(), HttpStatus.CREATED);
	}
	
	
}
