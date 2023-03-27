import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import fetchService from "../../services/fetchService";
import { UserContext } from "../../UserProvider/UserProvider";

import StatusBadge from "../StatusBadge/StatusBadge";

const Dashboard = () => {
  let navigate = useNavigate();
  const user = useContext(UserContext);
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    fetchService("/api/assignments", "GET", user.jwt).then((assignmentData) => {
      console.log(assignmentData);
      setAssignments(assignmentData);
    });
  }, []);
  function submitAssignment() {
    fetchService("/api/assignments", "POST", user.jwt)
      .then((assignment) => {
        window.location.href = `/assignments/${assignment.id}`;
      })
      .catch((message) => console.log(message));
  }
  return (
    <div style={{ margin: "2rem" }}>
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
      <div className="mb-4">
        <Button onClick={submitAssignment}>Submit Assignment</Button>
      </div>
      {assignments && (
        <div
          className="d-grid gap-5"
          style={{ gridTemplateColumns: "repeat(auto-fill,18rem)" }}
        >
          {assignments.map((assignment) => {
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
                    Edit
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
