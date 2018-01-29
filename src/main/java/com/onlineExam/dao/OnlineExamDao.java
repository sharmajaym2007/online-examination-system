package com.onlineExam.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.onlineExam.model.User;

@Component
public class OnlineExamDao {

	@Autowired
	private DatabaseConnection dbConnection;
	
	public void AddUser(User user) throws Exception {
		try {
		String userName = user.getUserName();
		String name = user.getName();
		String role = user.getRole();
		String password = user.getPassword();
		
		Connection conn = dbConnection.connect();
		
		String query = " insert into OnlineExam.User (name, user_name, password, role)"
		        + " values (?, ?, ?, ?)";

		      // create the mysql insert preparedstatement
		      PreparedStatement preparedStmt = conn.prepareStatement(query);
		      preparedStmt.setString (1, name);
		      preparedStmt.setString (2, userName);
		      preparedStmt.setString (3, password);
		      preparedStmt.setString(4, role);

		      // execute the preparedstatement
		      preparedStmt.execute();
		      
		}
		finally {
			dbConnection.close();
		}
	}
	
}
