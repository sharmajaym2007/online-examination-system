package com.onlineExam.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.onlineExam.resource.QuestionAnswers;
import com.onlineExam.resource.Result;
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
	
	public List<QuestionAnswers> getQuestionAnswers() {		
		
		return null;
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
				if(currentUserQuestionAnswers.getQuestionID() == currentOrgQA.getQuestionID()) {
					if(currentUserQuestionAnswers.getUserChoice().equals(currentOrgQA.getCorrectAnswers())) {
						correctAnswers++;
					}
				}
			}
		}
		return correctAnswers;
	}
}
