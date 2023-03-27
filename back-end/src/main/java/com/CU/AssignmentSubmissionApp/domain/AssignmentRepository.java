package com.CU.AssignmentSubmissionApp.domain;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AssignmentRepository extends JpaRepository<Assignment,Long>{
	Set<Assignment> findByUser(User user);
	@Query("select a from Assignment a where (a.status='submitted' and (a.codeReviewer is null or a.codeReviewer = :codeReviewer))")
	Set<Assignment> findByCodeReviewer(User codeReviewer);
}
