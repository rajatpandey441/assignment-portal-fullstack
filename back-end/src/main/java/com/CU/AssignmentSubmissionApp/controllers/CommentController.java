package com.CU.AssignmentSubmissionApp.controllers;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.CU.AssignmentSubmissionApp.domain.Comment;
import com.CU.AssignmentSubmissionApp.domain.User;
import com.CU.AssignmentSubmissionApp.dto.CommentDto;
import com.CU.AssignmentSubmissionApp.service.CommentService;
import com.fasterxml.jackson.databind.util.JSONWrappedObject;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
	@Autowired
	CommentService commentService;
	@PostMapping("")
	public ResponseEntity<Comment> createComment(@RequestBody CommentDto commentDto, @AuthenticationPrincipal User user){
		Comment comment = commentService.save(commentDto,user);
		return ResponseEntity.ok(comment);
	}
	
	@PutMapping("{commentId}")
	public ResponseEntity<Comment> updateComment(@RequestBody CommentDto commentDto, @AuthenticationPrincipal User user){
		Comment comment = commentService.save(commentDto,user);
		return ResponseEntity.ok(comment);
	}
	@GetMapping("")
	public ResponseEntity<Set<Comment>> getCommentsByAssignment(@RequestParam Long assignmentId){
		
		return ResponseEntity.ok(commentService.getCommentsByAssignmentId(assignmentId));
	}
	
	@DeleteMapping("{commentId}")
	public ResponseEntity<?> deleteComment(@PathVariable Long commentId){
		try {
			
			
			
			commentService.deleteComment(commentId);
			return ResponseEntity.ok("Comment deleted");
		}
		catch(Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
	}
}
