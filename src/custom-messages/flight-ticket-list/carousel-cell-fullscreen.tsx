import React from 'react';
import styled from '@emotion/styled';
import FlightTicketSvg from '../../images/flight-ticket.svg';
import ArrowSvg from '../../images/arrow.svg';

const Container = styled.div`
  position: fixed;
  z-index: 10000;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
`;

const FlightSammary = styled.div`
  width: 95%;
  max-width: 500px;
  background: white;
  border: 1px solid #EEE;
  border-radius: 0.5rem;
  box-shadow: 0 0 2px 1px #DDD;
  margin: auto;
  margin-bottom: 10px;
  padding: 50px 0;
  overflow: hidden;
  background-repeat: no-repeat;
  background-image: url(${FlightTicketSvg});
  background-size: auto 110%;
  color: white;

  table {
    width: 100%;
    table-layout: fixed;
  }

  img {
    width: 100%;
  }

  .dateHeader {
    padding: 5px 0 0 20px;
    color: #BCB4E4;
  }

  .flightTicketCell {
    word-wrap: break-word;
    text-align: center;

    p {
      font-size: 40px;
      margin: 0;
    }

    p.airPortJapanese {
      font-size: 15px;
    }

    p.dateTime {
      font-size: 20px;
    }
  }
`;

const FlightDetail = styled.div`
  width: 100%;

  table {
    width: 100%;
    max-width: 500px;
    margin: auto;
    border-collapse: separate;
    border-spacing: 0;
    text-align: left;
    line-height: 1.5;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;

    tr {
      th {
        width: 150px;
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        border-top: 1px solid #fff;
        border-left: 1px solid #fff;
        background: #eee;
      }

      td {
        padding: 10px;
        vertical-align: top;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        background: #fff;
      }
    }
  }
`;

export default function CarouselCellFullScreen(
  {
    close,
    id,
    date,
    routes,
    price,
    time,
    milage,
    select,
    selectable,
  }
  :
  {
    close: Function,
    id: string,
    date: string,
    routes: [any],
    price: string,
    time: string,
    milage: string,
    select: Function,
    selectable: string,
  }

) {

  const flights = routes.map((route: any, i: number) => (
    <FlightSammary key={i}>
      <table>
        <colgroup>
          <col style={{width: '40%'}}/>
          <col/>
          <col style={{width: '40%'}}/>
        </colgroup>
        <tbody>
          <tr>
            <td className='flightTicketCell' style={{wordWrap: 'break-word', textAlign: 'center'}}>
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
    </FlightSammary>
  ));

  const detail = (
    <FlightDetail>
      <table>
        <tbody>
          <tr>
            <th>金額</th>
            <td>{price}</td>
          </tr>
          <tr>
            <th>備考</th>
            <td>飛行時間: {time}<br/>獲得マイル: {milage}</td>
          </tr>
        </tbody>
      </table>
    </FlightDetail>
  );

  const selectButton = selectable ? <button className='primary' onClick={() => select()}>予約する</button> : null;

  console.log('フルスクリーンで表示')
  return (
    <Container>
      <button onClick={() => close()} className='dismiss'>close</button>
      <div className='carouselCellImage'>
        <h1>{date}</h1>
        {flights}
        {detail}
        <div className='submit'>
          {selectButton}
        </div>
      </div>
    </Container>
  )
};
