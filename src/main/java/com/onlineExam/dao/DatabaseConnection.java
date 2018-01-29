package com.onlineExam.dao;

import java.sql.DriverManager;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.springframework.stereotype.Component;

@Component
public class DatabaseConnection {
	private Connection connect = null;
	private Statement statement = null;
	private PreparedStatement preparedStatement = null;
	private ResultSet resultSet = null;
	
	public Connection connect() throws Exception {
			// This will load the MySQL driver, each DB has its own driver
			Class.forName("com.mysql.cj.jdbc.Driver");
			// Setup the connection with the DB
			connect = DriverManager.getConnection("jdbc:mysql://localhost/sys?" + "user=root&password=root@123");

			// Statements allow to issue SQL queries to the database
//			statement = connect.createStatement();
//			// Result set get the result of the SQL query
//			resultSet = statement.executeQuery("SELECT * FROM OnlineExam.User;");
//			if(resultSet.next()){
//					String a = resultSet.getString("name");
//				   System.out.println("Ress "+resultSet.getString(1));
//			}

			// writeResultSet(resultSet);
			return connect;
	}

	// You need to close the resultSet
	public void close() {
		try {
			if (resultSet != null) {
				resultSet.close();
			}

			if (statement != null) {
				statement.close();
			}

			if (connect != null) {
				connect.close();
			}
		} catch (Exception e) {

		}
	}
}
