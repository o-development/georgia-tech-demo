import React, { FunctionComponent } from "react";
import { Container, Header } from "semantic-ui-react";

const Home: FunctionComponent = () => {
  return (
    <Container text textAlign="center">
      <Header as="h1">Demo application for the Solid Credentials Store</Header>
      <Header as="h2">
        <a href="/issuer" target="_blank">
          Issuer's Perspective
        </a>
      </Header>
      <Header as="h2">
        <a
          href="https://penny.vincenttunru.com/explore/?url=https%3A%2F%2Fholder.solidweb.org%2Fcredentials%2F"
          target="_blank"
          rel="noreferrer"
        >
          Holder's Perspective
        </a>
      </Header>
      <Header as="h2">
        <a href="/verifier" target="_blank">
          Verifier's Perspective
        </a>
      </Header>
    </Container>
  );
};

export default Home;
