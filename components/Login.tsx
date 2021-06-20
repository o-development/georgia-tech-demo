import React, { FunctionComponent, useCallback, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { login } from "@inrupt/solid-client-authn-browser";

const Login: FunctionComponent = () => {
  const [issuer, setIssuer] = useState("https://solidweb.org");
  const onLogin = useCallback(async () => {
    if (global.window) {
      await login({
        // Specify the URL of the user's Solid Identity Provider; e.g., "https://broker.pod.inrupt.com" or "https://inrupt.net"
        oidcIssuer: issuer,
        // Specify the URL the Solid Identity Provider should redirect to after the user logs in,
        // e.g., the current page for a single-page app.
        redirectUrl: window.location.href,
        // Pick an application name that will be shown when asked
        // to approve the application's access to the requested data.
        clientName: "Georgia Tech VC Demo",
      });
    }
  }, [issuer]);

  return (
    <Form onSubmit={onLogin}>
      <Form.Field>
        <label htmlFor="issuer">
          Issuer
          <input
            id="issuer"
            value={issuer}
            onChange={(e) => {
              setIssuer(e.target.value);
            }}
          />
        </label>
      </Form.Field>
      <Button type="submit">Login</Button>
    </Form>
  );
};

export default Login;
