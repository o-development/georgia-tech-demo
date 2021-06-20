import React, { FunctionComponent, useCallback, useState } from "react";
import { Button, Container, Form, Header } from "semantic-ui-react";

const TeacherDashboard: FunctionComponent = () => {
  const [studentPod, setStudentPod] = useState(
    "https://jackson.solidcommunity.net/credentials/"
  );
  const [credentialContent, setCredentialContent] = useState("");
  const onSubmit = useCallback(async () => {
    console.log("Callback");
  }, []);

  return (
    <Container>
      <Header as="h1">Send a Credential to a Student's Pod</Header>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label htmlFor="issuer">
            Student's Pod
            <input
              value={studentPod}
              onChange={(e) => {
                setStudentPod(e.target.value);
              }}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="issuer">
            Credential Content
            <textarea
              value={credentialContent}
              onChange={(e) => {
                setCredentialContent(e.target.value);
              }}
            />
          </label>
        </Form.Field>
        <Button type="submit">Sign and Send to Student's Pod</Button>
      </Form>
    </Container>
  );
};

export default TeacherDashboard;
