package com.CU.AssignmentSubmissionApp.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.CU.AssignmentSubmissionApp.config.JWTService;
import com.CU.AssignmentSubmissionApp.domain.Authority;
import com.CU.AssignmentSubmissionApp.domain.AuthorityRepository;
import com.CU.AssignmentSubmissionApp.domain.Role;
import com.CU.AssignmentSubmissionApp.domain.User;
import com.CU.AssignmentSubmissionApp.domain.UserRepository;

@Service
public class AuthenticateService {

	private final UserRepository userRepository;
	private final AuthorityRepository authorityRepository;
	private final PasswordEncoder passwordEncoder;
	private final JWTService jwtService;
	private final AuthenticationManager authenticationManager;
	@Autowired
	public AuthenticateService(UserRepository userRepository,AuthorityRepository authorityRepository, PasswordEncoder passwordEncoder,JWTService jwtService,AuthenticationManager authenticationManager) {
		this.userRepository = userRepository;
		this.authorityRepository = authorityRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
	}
	public AuthenticateService() {
		this.userRepository = null;
		this.authorityRepository = null;
		this.passwordEncoder = null;
		this.jwtService = new JWTService();
		this.authenticationManager = null;
		
	}
	public AuthenticationResponse register(RegisterRequest request) {
		System.out.println("request = "+request);
		User user = new User(request.getUsername(),passwordEncoder.encode(request.getPassword()),Role.USER);
		Authority authority = new Authority(Role.USER.name());
		authority.setUser(user);
		userRepository.save(user);
		authorityRepository.save(authority);
		var jwtToken = jwtService.generateToken(user);
		AuthenticationResponse authResponse = new AuthenticationResponse(jwtToken);
		return authResponse; 
	}
	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getusername(), request.getPassword()));
		var user = userRepository.findByUsername(request.getusername())
				.orElseThrow(); 
		var jwtToken = jwtService.generateToken(user);
		AuthenticationResponse authResponse = new AuthenticationResponse(jwtToken);
		authResponse.setUser(user);
		return authResponse;
	}
	public Boolean isTokenValid(String token, User user) {
		// TODO Auto-generated method stub
		return jwtService.isTokenValid(token, user);
	}
}
