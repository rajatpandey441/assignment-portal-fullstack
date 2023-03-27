import jwt_decode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Badge, Row, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import fetchService from "../../services/fetchService";
import { UserContext } from "../../UserProvider/UserProvider";
import StatusBadge from "../StatusBadge/StatusBadge";

const CodeReviewerDashboard = () => {
  let navigate = useNavigate();
  const user = useContext(UserContext);
  const [assignments, setAssignments] = useState([]);
  function editReview(assignment) {
    window.location.href = `/assignments/${assignment.id}`;
  }

  function claimAssignment(assignment) {
    const decodedJwt = jwt_decode(user.jwt);
    const newUser = {
      id: null,
      username: decodedJwt.sub,
      authorities: decodedJwt.authorities,
    };
    assignment.codeReviewer = newUser;
    assignment.status = "In Review";
    fetchService(
      `api/assignments/${assignment.id}`,
      "PUT",
      user.jwt,
      assignment
    ).then((updatedAssignment) => {
      //update view for assignment that changed
      const assignmentsCopy = [...assignments];
      const i = assignmentsCopy.findIndex((a) => a.id === assignment.id);
      assignmentsCopy[i] = updatedAssignment;
      setAssignments(assignmentsCopy);
    });
  }
  useEffect(() => {
    fetchService("/api/assignments", "GET", user.jwt).then((assignmentData) => {
      console.log(assignmentData);
      setAssignments(assignmentData);
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <div
            className="d-flex justify-content-end"
            style={{ cursor: "pointer" }}
            onClick={() => {
              user.setJwt(null);
              navigate("/login");
            }}
          >
            Logout
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="h1">Code Reviewer Dashboard</div>
        </Col>
      </Row>
      <div className="assignment-wrapper in-review">
        <div className="assignment-wrapper-title h3 px-2">In Review</div>
        {(assignments &&
          assignments.filter((assignment) => assignment.status === "In Review")
            .length > 0 && (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fill,18rem)" }}
            >
              {assignments
                .filter((assignment) => assignment.status === "In Review")
                .map((assignment) => {
                  return (
                    <Card
                      key={assignment.id}
                      style={{ width: "18rem", height: "18rem" }}
                    >
                      <Card.Body className="d-flex flex-column justify-content-around">
                        <Card.Title>Assignment #{assignment.number}</Card.Title>
                        <div>
                          <StatusBadge text={assignment.status} />
                        </div>
                        <Card.Text style={{ marginTop: "1em" }}>
                          <p>
                            <b>GitHub URL</b>: {assignment.githubUrl}
                          </p>
                          <p>
                            <b>Branch</b>: {assignment.branch}
                          </p>
                        </Card.Text>

                        <Button
                          variant="secondary"
                          onClick={() => {
                            editReview(assignment);
                          }}
                        >
                          Edit
                        </Button>
                      </Card.Body>
                    </Card>
                  );
                })}
            </div>
          )) || <p>No assignments found</p>}
      </div>
      <div className="assignment-wrapper submitted">
        <div className="assignment-wrapper-title h3 px-2">Awaiting Review</div>
        {(assignments &&
          assignments.filter(
            (assignment) =>
              assignment.status === "Submitted" ||
              assignment.status === "Resubmitted"
          ).length > 0 && (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fill,18rem)" }}
            >
              {assignments
                .filter(
                  (assignment) =>
                    assignment.status === "Submitted" ||
                    assignment.status === "Resubmitted"
                )
                .sort((a, b) => {
                  if (a.status === "Resubmitted") return -1;
                  else return 1;
                })
                .map((assignment) => {
                  return (
                    <Card
                      key={assignment.id}
                      style={{ width: "18rem", height: "18rem" }}
                    >
                      <Card.Body className="d-flex flex-column justify-content-around">
                        <Card.Title>Assignment #{assignment.number}</Card.Title>
                        <div>
                          <StatusBadge text={assignment.status} />
                        </div>
                        <Card.Text style={{ marginTop: "1em" }}>
                          <p>
                            <b>GitHub URL</b>: {assignment.githubUrl}
                          </p>
                          <p>
                            <b>Branch</b>: {assignment.branch}
                          </p>
                        </Card.Text>

                        <Button
                          variant="secondary"
                          onClick={() => {
                            claimAssignment(assignment);
                          }}
                        >
                          Claim
                        </Button>
                      </Card.Body>
                    </Card>
                  );
                })}
            </div>
          )) || <p>No assignments found</p>}
      </div>
      <div className="assignment-wrapper needs-update">
        <div className="assignment-wrapper-title h3 px-2">Needs Update</div>
        {(assignments &&
          assignments.filter(
            (assignment) => assignment.status === "Needs Update"
          ).length > 0 && (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fill,18rem)" }}
            >
              {assignments
                .filter((assignment) => assignment.status === "Needs Update")
                .map((assignment) => {
                  return (
                    <Card
                      key={assignment.id}
                      style={{ width: "18rem", height: "18rem" }}
                    >
                      <Card.Body className="d-flex flex-column justify-content-around">
                        <Card.Title>Assignment #{assignment.number}</Card.Title>
                        <div>
                          <StatusBadge text={assignment.status} />
                        </div>
                        <Card.Text style={{ marginTop: "1em" }}>
                          <p>
                            <b>GitHub URL</b>: {assignment.githubUrl}
                          </p>
                          <p>
                            <b>Branch</b>: {assignment.branch}
                          </p>
                        </Card.Text>

                        <Button
                          variant="secondary"
                          onClick={() => {
                            window.location.href = `/assignments/${assignment.id}`;
                          }}
                        >
                          View
                        </Button>
                      </Card.Body>
                    </Card>
                  );
                })}
            </div>
          )) || <p>No assignments found</p>}
      </div>
    </Container>
  );
};

export default CodeReviewerDashboard;
