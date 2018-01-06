package com.onlineExam.resource;

public class Result {
	private int userID;
	private double totalScore;
	
	public Result(int userID, double totalScore) {
		this.userID = userID;
		this.totalScore = totalScore;
	}
	
	public int getUserID() {
		return userID;
	}
	public void setUserID(int userID) {
		this.userID = userID;
	}
	public double getTotalScore() {
		return totalScore;
	}
	public void setTotalScore(double totalScore) {
		this.totalScore = totalScore;
	}

}
