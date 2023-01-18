import React, { FunctionComponent } from "react";
import { Container, Header } from "semantic-ui-react";
import Link from "next/link";

const Home: FunctionComponent = () => {
  return (
    <Container text textAlign="center">
      <Header as="h1">Demo application for Georgia Tech</Header>
      <Header as="h2">
        <Link href="/teacher">Teacher's Perspective</Link>
      </Header>
      <Header as="h2">
        <a href="https://penny.vincenttunru.com/explore/?url=https%3A%2F%2Fjackson.solidcommunity.net%2Fcredentials%2F">
          Student's Perspective
        </a>
      </Header>
      <Header as="h2">
        <Link href="/company">Company's Perspective</Link>
      </Header>
    </Container>
  );
};

export default Home;
