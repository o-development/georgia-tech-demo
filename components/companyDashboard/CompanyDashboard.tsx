import React, { FunctionComponent, useCallback, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Icon,
} from "semantic-ui-react";
import getCredentailFromPod from "./getCredentialFromPod";
import verifyCredential from "./verifyCredential";

const CompanyDashboard: FunctionComponent = () => {
  const [credentialUri, setCredentialUri] = useState(
    "https://holder.solidweb.org/credentials/grade_credential"
  );
  const [credentialStatus, setCredentialStatus] = useState<
    "none" | "confirmed" | "notFound" | "invalid" | "loading" | "unknownError"
  >("none");
  const onSubmit = useCallback(async () => {
    setCredentialStatus("loading");
    try {
      const credential = await getCredentailFromPod(credentialUri);
      if (credential == null) {
        setCredentialStatus("notFound");
        return;
      }
      const isValidCredential = await verifyCredential(credential);
      setCredentialStatus(isValidCredential ? "confirmed" : "invalid");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      // eslint-disable-next-line no-alert
      alert(e.message);
      setCredentialStatus("unknownError");
    }
  }, [credentialUri]);

  return (
    <Container style={{ marginTop: 16 }}>
      <Header as="h1">Verify a Credential</Header>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label htmlFor="issuer">
            Student's Pod
            <input
              value={credentialUri}
              onChange={(e) => {
                setCredentialUri(e.target.value);
              }}
            />
          </label>
        </Form.Field>
        <Button type="submit">Confirm Credential</Button>
      </Form>
      <Divider />
      {(() => {
        switch (credentialStatus) {
          case "none":
            return undefined;
          case "confirmed":
            return (
              <Header as="h2" color="green">
                <Icon name="check circle" /> Credential Verified
              </Header>
            );
          case "invalid":
            return (
              <Header as="h2" color="red">
                <Icon name="times circle" /> Credential Invalid
              </Header>
            );
          case "notFound":
            return (
              <Header as="h2" color="orange">
                <Icon name="exclamation circle" /> Cannot find credential at{" "}
                {credentialUri}
              </Header>
            );
          case "loading":
            return (
              <Header as="h2" color="blue">
                <Icon loading name="spinner" />
              </Header>
            );
          default:
            return undefined;
        }
      })()}
    </Container>
  );
};

export default CompanyDashboard;
