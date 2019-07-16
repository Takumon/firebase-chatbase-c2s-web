
import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  text-align: left;
  border: 1px solid #222;
  border-radius: 4px;
`;

const Description = styled.div`
  border-top: 1px solid #222;
  font-size: 12px;
  color: #444;
`;

export default function ImageView(
  {
    m
  }
  :
  {
    m: any
  }
) {
  return (
    <Container>
      <img
        src={m.customMessage.link}
        alt={m.customMessage.alt}
      />
      <Description>
        {m.customMessage.description}
      </Description>      
    </Container>
  );
}
