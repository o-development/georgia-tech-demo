import { Menu } from "semantic-ui-react";
import React, { FunctionComponent } from "react";
import { Container } from "next/app";

const CompanyPerspective: FunctionComponent = () => {
  return (
    <Container>
      <Menu inverted>
        <Menu.Item>
          <p>Credential Verifier</p>
        </Menu.Item>
      </Menu>
    </Container>
  );
};

export default CompanyPerspective;
