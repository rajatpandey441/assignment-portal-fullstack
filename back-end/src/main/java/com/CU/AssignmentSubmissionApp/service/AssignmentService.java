package com.CU.AssignmentSubmissionApp.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CU.AssignmentSubmissionApp.domain.Assignment;
import com.CU.AssignmentSubmissionApp.domain.AssignmentRepository;
import com.CU.AssignmentSubmissionApp.domain.User;
import com.CU.AssignmentSubmissionApp.enums.AssignmentStatusEnum;
import com.CU.AssignmentSubmissionApp.enums.AuthorityEnum;

@Service
public class AssignmentService {
	@Autowired
	AssignmentRepository repository;

	public Assignment save(User user) {
		Assignment assignment = new Assignment();
		assignment.setStatus(AssignmentStatusEnum.PENDING_SUBMISSION.getStatus());
		assignment.setUser(user);
		assignment.setNumber(findnextAssignmentToSubmit(user));
		return repository.save(assignment);
	}

	private Integer findnextAssignmentToSubmit(User user) {
		Set<Assignment> assignmentsByUser = repository.findByUser(user);
		Optional<Integer> assignemntByUser = assignmentsByUser.stream().sorted((a1, a2) -> {
			if (a1.getNumber() == null)
				return 1;
			if (a2.getNumber() == null)
				return 1;
			return a2.getNumber().compareTo(a1.getNumber());
		}).map(assignment -> {
			if (assignment.getNumber() == null)
				return 1;
			return assignment.getNumber() + 1;
		}).findFirst();
		return assignemntByUser.orElse(1);
	}

	public Set<Assignment> findByUser(User user) {
		boolean hasCodeReviewer = user.getAuthorities()
		.stream()
		.filter(auth -> AuthorityEnum.ROLE_CODE_REVIEWER.name().equals(auth.getAuthority()))
		.count() > 0;
		if(hasCodeReviewer) {
			return repository.findByCodeReviewer(user);
		}
		else {
			return repository.findByUser(user);
		}
		
	}

	public Optional<Assignment> findById(Long assignmentId) {
		// TODO Auto-generated method stub
		return repository.findById(assignmentId);
	}

	public Assignment save(Assignment assignment) {
		// TODO Auto-generated method stub
		return repository.save(assignment);
	}
}
