import React, { useState } from 'react';
import styled from '@emotion/styled';
import ArrowSvg from '../../images/arrow.svg';
import FlightTicketsSvg from '../../images/flight-tickets.svg';
import CarouselCellFullScreen from './carousel-cell-fullscreen';


const FlightTicket = styled.div`
  background-repeat: no-repeat;
  /*background-image: url("/flight-ticket.svg");*/
  background-size: 100% auto;
  color: white;

  table {
    width: '100%';
    table-layout: 'fixed';
  }

  img {
    width: '100%';
  }

  .dateHeader {
    padding: 5px 0 0 20px;
    color: #BCB4E4;
  }

  .flightTicketCell {
    word-wrap: break-word;
    text-align: center;
  }

  .flightTicketCell p {
    font-size: 20px;
    margin: 0;

    p.airPortJapanese {
      font-size: 8px;
    }

    p.dateTime {
      font-size: 12px;
    }
  }
`;

const FlightTicketPanel = styled.div`
  padding: 10px 10px 25px 10px;

  &> span {
    color: #19A5E4;
    font-weight: bold;
    cursor: pointer;
  }

  &> span:first-of-type {
    float: left;
  }

  &> span:last-child {
    float: right;
  }
`;


const Container = styled.div`
  background: white;
  border: 1px solid #EEE;
  border-radius: 0.5rem;
  box-shadow: 0 0 2px 1px #DDD;
  display: inline-block;
  margin: 0.25rem 0.5rem;
  overflow: hidden;
  width: 250px;
`;

const FlightTickets = styled.div`
  background-image: url(${FlightTicketsSvg});
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: right bottom;
`;




export default function CarouselCell(props: {
  id: string,
  date: string,
  routes: [any],
  price: string,
  time: string,
  milage: string,
  selectable: string,
  answer: Function,
}) {
  const {
    id,
    date,
    routes,
    price,
    time,
    milage,
    selectable,

    answer,
  } = props;

  const [isShowDetail, setShowDetail] = useState(false);

  async function selectFlight() {
    setShowDetail(false);

    const cards = [
      Object.assign({
        id,
        date,
        routes,
        price,
        time,
        milage,
      },
      { 
        selectable: false,
      })
    ];

    await answer(cards);
  }


  const contents = routes.map((route, i) => {
    const dateHeader = ((i === 0) ? date : '');
    return (
      <FlightTicket key={i}>
        <table>
          <colgroup>
            <col style={{width: '40%'}}/>
            <col/>
            <col style={{width: '40%'}}/>
          </colgroup>
          <tbody>
            <tr><td colSpan={3} className='dateHeader'>{dateHeader}</td></tr>
            <tr>
              <td className='flightTicketCell' style={{wordWrap: 'break-word',textAlign: 'center'}}>
                <p>{route.depart.airport}</p>
              </td>
              <td><img style={{width: '100%'}} alt="arrow" src={ArrowSvg} /></td>
              <td className='flightTicketCell'>
                <p>{route.arrival.airport}</p>
              </td>
            </tr>
            <tr>
              <td className='flightTicketCell'>
                <p className='airPortJapanese'>{route.depart.airportJapanese}</p>
                <p className='dateTime'>{route.depart.dateTime}</p>
              </td>
              <td className='flightTicketCell'><p className='airPortJapanese'>{route.flightName} 便</p></td>
              <td className='flightTicketCell'>
                <p className='airPortJapanese'>{route.arrival.airportJapanese}</p>
                <p className='dateTime'>{route.arrival.dateTime}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </FlightTicket>
    );
  });

  const selectButton =
    selectable
      ? <span onClick={selectFlight}>選択する</span>
      : <span />;

  return (
    <>
      <Container>
        <FlightTickets>
          {contents}
        </FlightTickets>
        <FlightTicketPanel>
          <span onClick={() => setShowDetail(true)}>詳細を見る</span>
          {selectButton}
        </FlightTicketPanel>
      </Container>
      { isShowDetail 
        ? (
          <CarouselCellFullScreen
            {...props}
            close={() => setShowDetail(false)}
            select={selectFlight}
          />
        )
        : null
      }
    </>
  )
}
