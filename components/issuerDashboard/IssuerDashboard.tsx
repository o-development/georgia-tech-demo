import React, { FunctionComponent, useCallback, useState } from "react";
import { Button, Container, Form, Header } from "semantic-ui-react";
import getCredential from "./getCredential";
import saveCredentialToPod from "./saveCredentialToPod";

const TeacherDashboard: FunctionComponent = () => {
  const [holderPod, setHolderPod] = useState(
    "https://holder.solidweb.org/credentials/grade_credential"
  );
  const [credentialContent, setCredentialContent] = useState(
    `{
  "@context": {
    "birthday": "http://xmlns.com/foaf/0.1/birthday"
  },
  "id": "https://holder.solidweb.org/profile/card#me",
  "birthday": "1942/11/20"
}`
  );
  const onSubmit = useCallback(async () => {
    try {
      const credential = await getCredential(
        JSON.parse(credentialContent),
        holderPod
      );
      await saveCredentialToPod(holderPod, credential);
      // eslint-disable-next-line no-alert
      alert("Successfully Saved");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      // eslint-disable-next-line no-alert
      alert(e.message);
    }
  }, [credentialContent, holderPod]);

  return (
    <Container>
      <Header as="h1">Send a Credential to a Holder's Pod</Header>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label htmlFor="issuer">
            Holder's Pod
            <input
              value={holderPod}
              onChange={(e) => {
                setHolderPod(e.target.value);
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
        <Button type="submit">Sign and Send to Holder's Pod</Button>
      </Form>
    </Container>
  );
};

export default TeacherDashboard;
