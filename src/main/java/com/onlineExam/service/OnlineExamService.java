package com.onlineExam.service;

import java.util.ArrayList;
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
//		u.setUserName((userName);
//		u.setPassword(password);
//		
		if (u != null) {
			u.setValid(true);
			return u;
		}
		return null;
	}
	
	public List<QuestionAnswers> getQuestionAnswers() {		
		QuestionAnswers question = new QuestionAnswers();
		question.setId(1);
		question.setQuestion("What is your name?");
		question.setCorrectAnswer("A");
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
		question1.setCorrectAnswer("B");
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
	
	private int getTotalCorrectAnswers(List<QuestionAnswers> userQuestionAnswers) {
		List<QuestionAnswers> orgQA = getQuestionAnswers();
		int correctAnswers = 0;
		
		for(QuestionAnswers currentUserQuestionAnswers : userQuestionAnswers) {
			for(QuestionAnswers currentOrgQA : orgQA) {
				if(currentUserQuestionAnswers.getId() == currentOrgQA.getId()) {
					if(currentUserQuestionAnswers.getUserChoice().equals(currentOrgQA.getCorrectAnswer())) {
						correctAnswers++;
					}
				}
			}
		}
		return correctAnswers;
	}
}
