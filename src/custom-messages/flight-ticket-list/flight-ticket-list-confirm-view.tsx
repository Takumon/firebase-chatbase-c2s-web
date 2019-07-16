
import React from 'react';
import Carousel from './carousel';

export default function FlightTicketListConfirmView(
  { m, answer }
  :
  { m: any, answer: Function }
) {

  const {
    title,
    contents,
  } = m.customMessage;

  return (
    <div>
      <div style={{textAlign: 'left' }} >
        {title && <div>{title}</div>}
      </div>
      <Carousel
        style={{}}
        answer={answer}
        contents={contents}
      />
    </div>
  );
}
