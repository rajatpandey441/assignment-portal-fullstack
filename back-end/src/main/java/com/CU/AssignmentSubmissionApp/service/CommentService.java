package com.CU.AssignmentSubmissionApp.service;

import java.time.ZonedDateTime;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CU.AssignmentSubmissionApp.domain.AssignmentRepository;
import com.CU.AssignmentSubmissionApp.domain.Comment;
import com.CU.AssignmentSubmissionApp.domain.User;
import com.CU.AssignmentSubmissionApp.dto.CommentDto;
import com.CU.AssignmentSubmissionApp.repository.CommentRespository;
@Service
public class CommentService {
	@Autowired
	private CommentRespository commentRespository;
	@Autowired
	private AssignmentRepository assignmentRepository;
	public Comment save(CommentDto commentDto,User user) {
		// TODO Auto-generated method stub
		Comment comment = new Comment();
		comment.setId(commentDto.getId());
		comment.setText(commentDto.getText());
		comment.setCreatedBy(user);
		comment.setAssignment(assignmentRepository.findById(commentDto.getAssignmentId()).orElse(null));
		if(comment.getId() == null) {
			comment.setCreatedDate(ZonedDateTime.now());
		}
		else {
			comment.setCreatedDate(commentDto.getCreatedDate());
		}
		
		return commentRespository.save(comment);
	}
	public Set<Comment> getCommentsByAssignmentId(Long assignmentId) {
		// TODO Auto-generated method stub
		Set<Comment> comments = commentRespository.findByAssignmentId(assignmentId);
		return comments;
	}
	public void deleteComment(Long commentId) {
		commentRespository.delete(commentRespository.findById(commentId).orElse(null));
	}

}
