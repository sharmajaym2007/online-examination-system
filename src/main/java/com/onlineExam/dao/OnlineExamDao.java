package com.onlineExam.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.onlineExam.model.User;

@Component
public class OnlineExamDao {

	@Autowired
	private DatabaseConnection dbConnection;
	private Statement statement = null;
	private PreparedStatement preparedStatement = null;
	private ResultSet resultSet = null;

	public void AddUser(User user) throws Exception {
		try {
			String userName = user.getUserName();
			String name = user.getName();
			String role = user.getRole();
			String password = user.getPassword();

			Connection conn = dbConnection.connect();

			String query = " insert into OnlineExam.User (name, user_name, password, role)" + " values (?, ?, ?, ?)";

			// create the mysql insert preparedstatement
			preparedStatement = conn.prepareStatement(query);
			preparedStatement.setString(1, name);
			preparedStatement.setString(2, userName);
			preparedStatement.setString(3, password);
			preparedStatement.setString(4, role);

			// execute the preparedstatement
			preparedStatement.execute();

		} finally {
			dbConnection.close();
		}
	}

	public User getUserInfo(User user) throws Exception {
		try {
			Connection conn = dbConnection.connect();
			statement = conn.createStatement();
			
			String selectStatement = "SELECT * FROM OnlineExam.User where user_name = ? and password = ?";
			PreparedStatement prepStmt = conn.prepareStatement(selectStatement);
			prepStmt.setString(1, user.getUserName());
			prepStmt.setString(2, user.getPassword());
			
			resultSet = prepStmt.executeQuery();

			if (resultSet.next() ) {
				user.setId(resultSet.getInt("id"));
				user.setRole(resultSet.getString("role"));
				user.setName(resultSet.getString("name"));
				user.setValid(true);
			}
			else {
				user.setValid(false);
			}

		} finally {
			dbConnection.close();
		}
		return user;
	}

}
