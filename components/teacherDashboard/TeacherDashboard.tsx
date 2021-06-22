import React, { FunctionComponent, useCallback, useState } from "react";
import { Button, Container, Form, Header } from "semantic-ui-react";
import getCredential from "./getCredential";
import saveCredentialToPod from "./saveCredentialToPod";

const TeacherDashboard: FunctionComponent = () => {
  const [studentPod, setStudentPod] = useState(
    "https://jackson.solidcommunity.net/credentials/grade_credential"
  );
  const [credentialContent, setCredentialContent] = useState(
    `{
  "@context": {
    "hasGrade": "https://example.com/ontology/hasGrade"
  },
  "id": "https://jackson.solidcommunity.net/profile/card#me",
  "hasGrade": "C+"
}`
  );
  const onSubmit = useCallback(async () => {
    try {
      const credential = await getCredential(
        JSON.parse(credentialContent),
        studentPod
      );
      await saveCredentialToPod(studentPod, credential);
      // eslint-disable-next-line no-alert
      alert("Successfully Saved");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      // eslint-disable-next-line no-alert
      alert(e.message);
    }
  }, [credentialContent, studentPod]);

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
