package com.CU.AssignmentSubmissionApp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CU.AssignmentSubmissionApp.domain.User;
import com.CU.AssignmentSubmissionApp.domain.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepo;
	public Optional<User> findUserByUsername(String username) {
		return userRepo.findByUsername(username);
	}
}
