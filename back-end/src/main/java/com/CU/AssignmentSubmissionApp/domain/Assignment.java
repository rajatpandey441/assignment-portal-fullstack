package com.CU.AssignmentSubmissionApp.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Assignment {
	@Override
	public String toString() {
		return "Assignment [id=" + id + ", number=" + number + ", status=" + status + ", githubURL=" + githubUrl
				+ ", branch=" + branch + ", codeReviewURL=" + codeReviewURL + ", user=" + user + "]";
	}
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	private Integer number;
	public Integer getNumber() {
		return number;
	}
	public void setNumber(Integer number) {
		this.number = number;
	}
	//@Column
	private String status;
	@Column(name="githuburl")
	private String githubUrl;
	//@Column
	private String branch;
	//@Column
	private String codeReviewURL;
	@ManyToOne(optional = false)
	private User user;
	@ManyToOne
	private User codeReviewer;
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getGithubUrl() {
		return githubUrl;
	}
	public void setGithubUrl(String githubUrl) {
		this.githubUrl = githubUrl;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	public String getCodeReviewURL() {
		return codeReviewURL;
	}
	public void setCodeReviewURL(String codeReviewURL) {
		this.codeReviewURL = codeReviewURL;
	}
	public User getCodeReviewer() {
		return codeReviewer;
	}
	public void setCodeReviewer(User codeReviewer) {
		this.codeReviewer = codeReviewer;
	}
	
	
}
