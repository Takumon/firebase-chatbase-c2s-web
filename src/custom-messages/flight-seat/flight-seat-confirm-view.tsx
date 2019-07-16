
import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  text-align: left;
`;


export default function FlightSeatConfirmView({ m }: { m: any }) {

  return (
    <Container>
      <div>{m.customMessage.text}</div>
      <div>{m.customMessage.seat.name}</div>
    </Container>
  );
}
