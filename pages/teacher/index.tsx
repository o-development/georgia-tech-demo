import { Header, Container, Menu } from "semantic-ui-react";
import React, { FunctionComponent, useCallback, useState } from "react";
import {
  handleIncomingRedirect,
  logout,
  getDefaultSession,
} from "@inrupt/solid-client-authn-browser";
import Login from "../../components/Login";
import TeacherDashboard from "../../components/teacherDashboard/TeacherDashboard";

const TeacherPerspective: FunctionComponent = () => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loggedInWebId, setLoggedInWebId] = useState<string | null>(null);
  useState(async () => {
    if (global.window) {
      await handleIncomingRedirect({
        restorePreviousSession: true,
      });
      if (getDefaultSession().info.isLoggedIn) {
        setLoggedInWebId(getDefaultSession().info.webId);
      }
      setLoadingAuth(false);
    }
  });
  const logoutCallback = useCallback(async () => {
    await logout();
    setLoggedInWebId(null);
  }, []);

  if (loadingAuth) {
    return <></>;
  }

  if (!loggedInWebId) {
    return (
      <Container text>
        <Header as="h1">Professor Login</Header>
        <Login />
      </Container>
    );
  }

  return (
    <Container>
      <Menu inverted>
        <Menu.Item>
          <p>Logged in as {loggedInWebId}</p>
        </Menu.Item>
        <Menu.Item position="right" name="Log Out" onClick={logoutCallback} />
      </Menu>
      <TeacherDashboard />
    </Container>
  );
};

export default TeacherPerspective;
