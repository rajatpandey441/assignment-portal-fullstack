package com.CU.AssignmentSubmissionApp.auth;

import com.CU.AssignmentSubmissionApp.domain.User;

public class AuthenticationResponse {

	private String token;
	private User user;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public AuthenticationResponse(String token) {
		this.token = token;
	}
	public AuthenticationResponse() {}
}
