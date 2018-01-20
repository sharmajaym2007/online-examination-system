package com.onlineExam.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Component;

import com.onlineExam.resource.QuestionAnswers;
import com.onlineExam.resource.Result;
import com.onlineExam.resource.User;

@Component
public class OnlineExamService {

	public User getLoginInfo(User u) {
		
//		User u = new User();
		u.setId(1);
		u.setName("jay");
		u.setRole("staff");
//		u.setUserName((userName);
//		u.setPassword(password);
//		
		if (u != null) {
			u.setValid(true);
			return u;
		}
		return null;
	}
	
	public List<User> getAllUsers() {
		List<User> users = getUsers();
		Iterator<User> itr = users.iterator();
		/*while(itr.hasNext()){
			User userTemp = itr.next();
			if(!userTemp.getRole().equals("student")) {
				users.remove(userTemp);
			}
		}*/
		return users;
	}
	
	public List<QuestionAnswers> getQuestionAnswers() {		
		QuestionAnswers question = new QuestionAnswers();
		question.setId(1);
		question.setQuestion("What is your name?");
		question.setCorrectAnswer("Sandeep");
		// question.setUserChoice("B");
		
		List<String> choices = new ArrayList<>();
		choices.add("Sandeep");
		choices.add("Jay");
		choices.add("Mukesh");
		choices.add("Ranjan");
		question.setChoices(choices);
		
		QuestionAnswers question1 = new QuestionAnswers();
		question1.setId(2);
		question1.setQuestion("What is your Surname?");
		question1.setCorrectAnswer("Sharma");
		// question1.setUserChoice("A");
		choices = new ArrayList<>();
		choices.add("Verma");
		choices.add("Sharma");
		choices.add("Kumar");
		choices.add("Kale");
		question1.setChoices(choices);
		
		List<QuestionAnswers> list = new ArrayList<QuestionAnswers>();
		list.add(question);
		list.add(question1);
		
		return list;
	}
	
	
	public Result calcUserScore(List<QuestionAnswers> questionAnswers, int userID) {
		int total = questionAnswers.size();
		int correctAnswers = getTotalCorrectAnswers(questionAnswers);
		
		double score = correctAnswers/total;
		Result res = new Result(userID, score);
		
		return res;
	}
	
	public void addStudent(User user) {
		
	}
	
	public void addQuestion(QuestionAnswers questionAnswers) {
		
	}
	
	public void updateQuestion(QuestionAnswers questionAnswers) {
		// TODO Auto-generated method stub
		
	}
	
	private int getTotalCorrectAnswers(List<QuestionAnswers> userQuestionAnswers) {
		List<QuestionAnswers> orgQA = getQuestionAnswers();
		int correctAnswers = 0;
		
		for(QuestionAnswers currentUserQuestionAnswers : userQuestionAnswers) {
			for(QuestionAnswers currentOrgQA : orgQA) {
				if(currentUserQuestionAnswers.getQuestion().equals(currentOrgQA.getQuestion())) {
					if(currentUserQuestionAnswers.getUserChoice().equals(currentOrgQA.getCorrectAnswer())) {
						correctAnswers++;
					}
				}
			}
		}
		return correctAnswers;
	}
	
	private List<User> getUsers() {
		User u = new User();
		u.setId(2);
		u.setName("Jay");
		u.setPassword("root");
		u.setRole("student");
		u.setUserName("jaysharma");
		
		User u1 = new User();
		u1.setId(3);
		u1.setName("Sandeep");
		u1.setPassword("root123");
		u1.setRole("student");
		u1.setUserName("sandeepsharma");
		
		User u2 = new User();
		u2.setId(4);
		u2.setName("Naman");
		u2.setPassword("root456");
		u2.setRole("student");
		u2.setUserName("namanvyas");
		
		User u3 = new User();
		u3.setId(5);
		u3.setName("Sam");
		u3.setPassword("root890");
		u3.setRole("staff");
		u3.setUserName("sam123");
		
		List<User> users = new ArrayList<>();
		users.add(u);
		users.add(u1);
		users.add(u2);
		users.add(u3);
		
		return users;
		
	}
}
