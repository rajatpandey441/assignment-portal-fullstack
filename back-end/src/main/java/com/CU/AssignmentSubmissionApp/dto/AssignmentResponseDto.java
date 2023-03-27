package com.CU.AssignmentSubmissionApp.dto;

import com.CU.AssignmentSubmissionApp.domain.Assignment;
import com.CU.AssignmentSubmissionApp.enums.AssignmentEnum;
import com.CU.AssignmentSubmissionApp.enums.AssignmentStatusEnum;

public class AssignmentResponseDto {
	private Assignment assignment;
	private AssignmentEnum[] assignmentEnum = AssignmentEnum.values();
	private AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();
	public AssignmentStatusEnum[] getStatusEnums() {
		return statusEnums;
	}
	public Assignment getAssignment() {
		return assignment;
	}
	public void setAssignment(Assignment assignment) {
		this.assignment = assignment;
	}
	public AssignmentEnum[] getAssignmentEnum() {
		return assignmentEnum;
	}
	public AssignmentResponseDto(Assignment assignment) {
		
		this.assignment = assignment;
	}
	
}
