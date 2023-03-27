package com.CU.AssignmentSubmissionApp.controllers;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CU.AssignmentSubmissionApp.domain.Assignment;
import com.CU.AssignmentSubmissionApp.domain.User;
import com.CU.AssignmentSubmissionApp.dto.AssignmentResponseDto;
import com.CU.AssignmentSubmissionApp.enums.AuthorityEnum;
import com.CU.AssignmentSubmissionApp.service.AssignmentService;
import com.CU.AssignmentSubmissionApp.service.UserService;
import com.CU.AssignmentSubmissionApp.util.AuthorityUtil;

@RestController
@RequestMapping("api/assignments")
public class AssignmentController {
	@Autowired
	AssignmentService assignmentService;
	@Autowired
	UserService userService;
	@PostMapping("")
	public ResponseEntity<?> helloUser(@AuthenticationPrincipal User user) {
		return ResponseEntity.ok(assignmentService.save(user));
	}
	@GetMapping("")
	public ResponseEntity<Set<Assignment>> findByUser(@AuthenticationPrincipal User user){
		Set<Assignment> assignments = assignmentService.findByUser(user);
		return ResponseEntity.ok(assignments);
	}
	@GetMapping("{assignmentId}")
	public ResponseEntity<?> findAssingnment(@PathVariable Long assignmentId, @AuthenticationPrincipal User user){
		Optional<Assignment> assignment = assignmentService.findById(assignmentId);
		
		AssignmentResponseDto response = new AssignmentResponseDto(assignment.orElse(new Assignment()));
		return ResponseEntity.ok(response);
	}
	@PutMapping("{assignmentId}")
	public ResponseEntity<?> saveAssingnment(@PathVariable Long assignmentId, @RequestBody Assignment assignment, @AuthenticationPrincipal User user){
		//add code reviewer to assignemnt
		if(assignment.getCodeReviewer() != null) {
			User codeReviewer = assignment.getCodeReviewer();
			codeReviewer = userService.findUserByUsername(codeReviewer.getUsername()).orElse(new User());
			if(AuthorityUtil.hasRole(AuthorityEnum.ROLE_CODE_REVIEWER.name(), codeReviewer)) {
				assignment.setCodeReviewer(codeReviewer);
			}
		}
		Assignment updatedAssignment = assignmentService.save(assignment);
		return ResponseEntity.ok(updatedAssignment);
		//System.out.println(assignment);
		//return null;
	}
}
