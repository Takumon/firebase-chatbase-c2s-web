
import React from 'react';
import styled from '@emotion/styled';


export default function TextView(
  {
    m,
    isAnswer,
  }
  :
  {
    m: any,
    isAnswer: boolean
  }
) {

  const Container = styled.div`
    text-align: ${isAnswer ? 'right' : 'left'};
  `;

  return (
    <Container>
      {m.customMessage.text}
    </Container>
  );
}
