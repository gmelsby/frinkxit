import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

export default function SpinnerMessage({ message }: { message: string }) {
  return (
    <Container className="d-flex flex-column justify-content-center-safe text-center pt-5 h-75">
      <h1>{message}</h1>
      <Spinner className="mx-auto mt-5" animation="border" variant="primary" />
    </Container>
  );
}
