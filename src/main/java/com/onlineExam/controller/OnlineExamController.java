package com.onlineExam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.onlineExam.model.MCQ;
import com.onlineExam.model.QuestionAnswers;
import com.onlineExam.model.Result;
import com.onlineExam.model.User;
import com.onlineExam.service.OnlineExamService;

@RestController
@CrossOrigin(origins = "*")
public class OnlineExamController {

	@Autowired
	private OnlineExamService examService;

	ObjectMapper mapper = new ObjectMapper();

	@PostMapping(value = "/logins")
	public ResponseEntity<?> login(@RequestBody User user) throws Exception {
		User u = examService.getUser(user);
		
		HttpStatus status;
		
		if(u.isValid()) {
			status = HttpStatus.OK;
		}
		else {
			status = HttpStatus.UNAUTHORIZED;
		}
		return new ResponseEntity<>(user, new HttpHeaders(), status);
	}

	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers() {
		List<User> users = examService.getAllUsers();

		return new ResponseEntity<>(users, new HttpHeaders(), HttpStatus.OK);
	}

	// used to get students/staff from admin screen
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUser(@PathVariable("id") int id) {
		User user = examService.getUser(id);
		return new ResponseEntity<>(user, new HttpHeaders(), HttpStatus.OK);
	}

	// used to modify student/staff
	@PatchMapping("/users/{id}")
	public ResponseEntity<User> modifyUsers(@PathVariable("id") int id, @RequestBody User user) {
		// examService.modifyNewUser(id, user);
		return new ResponseEntity<>(user, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/addUser")
	public ResponseEntity<?> addStudent(User user) throws Exception {
		examService.addUser(user);

		return new ResponseEntity<>("", new HttpHeaders(), HttpStatus.CREATED);
	}

	// used to delete student/staff
	@DeleteMapping("/users/{id}")
	public ResponseEntity<User> deleteUsers(@PathVariable("id") int id) {
		// User user = examService.getDeletedUsers(id);
		return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/questions")
	public ResponseEntity<List<MCQ>> getQuestions() {
		// List<MCQ> questions = examService.getQuestionAnswers();
		return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.OK);
	}

	@GetMapping("/questions/{id}")
	public ResponseEntity<MCQ> getQuestion(@PathVariable("id") int id) {
		QuestionAnswers questions = new QuestionAnswers();
		questions.setId(2);
		questions.setQuestion("WTF");
		questions.setCorrectAnswer("A");
		questions.setUserChoice("B");

		return new ResponseEntity<>(null, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/questions")
	public ResponseEntity<Result> addUserEntries(@RequestParam("userId") int userId,
			@RequestBody List<QuestionAnswers> questions) {
		Result res = examService.calcUserScore(questions, userId);
		// List<QuestionAnswers> list = (List<QuestionAnswers>) questions;
		return new ResponseEntity<>(res, new HttpHeaders(), HttpStatus.OK);
	}

	@PostMapping("/addQuestion")
	public ResponseEntity<?> addQuestion(QuestionAnswers questionAnswers) {
		examService.addQuestion(questionAnswers);

		return new ResponseEntity<>("", new HttpHeaders(), HttpStatus.CREATED);
	}

	@PutMapping("/questions/{id}")
	public ResponseEntity<?> updateQuestion(@PathVariable("id") int id, @RequestBody MCQ questionAnswers) {
		// examService.updateQuestion(questionAnswers);

		return new ResponseEntity<>("{}", new HttpHeaders(), HttpStatus.OK);
	}

	@DeleteMapping("/questions/{id}")
	public ResponseEntity<?> deleteQuestion(@PathVariable("id") int id, @RequestBody Object questionAnswers) {
		// examService.updateQuestion(questionAnswers); return new
		return new ResponseEntity<>("Question deleted successfully", new HttpHeaders(), HttpStatus.OK);
	}

}
