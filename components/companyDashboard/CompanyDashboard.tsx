import React, { FunctionComponent, useCallback, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Icon,
} from "semantic-ui-react";

const CompanyDashboard: FunctionComponent = () => {
  const [credentialUri, setCredentialUri] = useState(
    "https://jackson.solidcommunity.net/credentials/"
  );
  const [credentialStatus, setCredentialStatus] = useState<
    "none" | "confirmed" | "notFound" | "invalid" | "loading"
  >("none");
  const onSubmit = useCallback(() => {
    console.log("Callback");
  }, []);

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
            )
          default:
            return undefined;
        }
      })()}
    </Container>
  );
};

export default CompanyDashboard;
