
import React from 'react';
import Carousel from './carousel';

export default function FlightTicketListView(
  {
    m,
    isAnswer,
    answer
  }
  :
  {
    m: any,
    isAnswer: boolean,
    answer: Function
  }
) {
  const {
    title,
    contents,
  } = m.customMessage;

  return isAnswer ? (
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{textAlign: 'right' }} >
          {title && <div>{title}</div>}
        </div>
        <Carousel
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
          }}
          answer={answer}
          contents={contents}
        />
      </div>
    ) : (
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
