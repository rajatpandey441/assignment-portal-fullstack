import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import fetchService from "../../services/fetchService";
import { UserContext } from "../../UserProvider/UserProvider";
import Comment from "../Comment/Comment";
import CommentContainer from "../CommentContainer/CommentContainer";
import StatusBadge from "../StatusBadge/StatusBadge";

const AssignmentView = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const user = useContext(UserContext);
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
    number: null,
    status: null,
  });
  //Enums
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);

  const prevAssignmentValue = useRef(assignment);

  function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
  }

  useEffect(() => {
    fetchService(`/api/assignments/${id}`, "GET", user.jwt).then(
      (assignmentResponse) => {
        let assignmentData = assignmentResponse.assignment;
        if (assignmentData.branch === null) assignmentData.branch = "";
        if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
        setAssignment(assignmentData);
        setAssignmentEnums(assignmentResponse.assignmentEnum);
        setAssignmentStatuses(assignmentResponse.statusEnums);

        //setIsLoading(false);
      }
    );
  }, []);

  function save(status) {
    // this implies that the student is submitting the assignment for the first time

    if (status && assignment.status !== status) {
      updateAssignment("status", assignmentStatuses[1].status);
    } else {
      persist();
    }
  }

  function persist() {
    fetchService(`/api/assignments/${id}`, "PUT", user.jwt, assignment).then(
      (assignmentData) => {
        setAssignment(assignmentData);
      }
    );
  }
  useEffect(() => {
    if (prevAssignmentValue.current.status !== assignment.status) {
      persist();
    }
    prevAssignmentValue.current = assignment;
  }, [assignment]);

  return (
    <Container className="mt-5">
      {assignment && (
        <div>
          <Row className="d-flex align-items-center">
            <Col>
              {assignment.number && <h1>Assignment {assignment.number}</h1>}
            </Col>
            <Col>
              <StatusBadge text={assignment.status} />
            </Col>
          </Row>
          <Form.Group as={Row} className="my-3" controlId="assignmentName">
            <Form.Label column sm="3" md="2">
              Assignment Number:
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton
                as={ButtonGroup}
                variant={"info"}
                title={
                  assignment.number
                    ? `Assignment ${assignment.number}`
                    : "Select an Assignment"
                }
                onSelect={(selected) => {
                  updateAssignment("number", selected);
                }}
              >
                {assignmentEnums.map((assignmentEnum) => (
                  <Dropdown.Item
                    eventKey={assignmentEnum.assignmentNum}
                    key={assignmentEnum.assignmentNum}
                  >
                    {assignmentEnum.assignmentNum}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-4" controlId="githubUrl">
            <Form.Label column sm="2">
              GitHub URL:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                onChange={(e) => updateAssignment("githubUrl", e.target.value)}
                type="url"
                value={assignment.githubUrl}
                placeholder="https://github.com/username/repo-name"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="branch">
            <Form.Label column sm="2">
              Branch:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="example_branch_name"
                onChange={(e) => updateAssignment("branch", e.target.value)}
                value={assignment.branch}
              />
            </Col>
          </Form.Group>
          {assignment.status === "Completed" ? (
            <>
              <Form.Group
                as={Row}
                className="d-flex align-items-center mb-3"
                controlId="codeReviewURL"
              >
                <Form.Label column sm="2" md="2">
                  Code Review Video URL:
                </Form.Label>
                <Col sm="10" md="8" lg="6">
                  <a
                    href={assignment.codeReviewURL}
                    style={{ fontWeight: "bold" }}
                  >
                    {assignment.codeReviewURL}
                  </a>
                </Col>
              </Form.Group>
              <div className="d-flex gap-5">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  Back
                </Button>
              </div>
            </>
          ) : assignment.status === "Pending Submission" ? (
            <div className="d-flex gap-5">
              <Button size="lg" onClick={() => save("Submitted")}>
                Submit Assignment
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Back
              </Button>
            </div>
          ) : (
            <div className="d-flex gap-5">
              <Button size="lg" onClick={() => save("Resubmitted")}>
                Re-Submit Assignment
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Back
              </Button>
            </div>
          )}
        </div>
      )}
      <CommentContainer assignmentId={id} />
    </Container>
  );
};

export default AssignmentView;
