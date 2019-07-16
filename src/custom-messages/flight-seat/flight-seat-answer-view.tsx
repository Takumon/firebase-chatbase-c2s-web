
import React, { useState  } from 'react';
import styled from '@emotion/styled';
import FlightSeatFullScreen from './flight-seat-fullscreen';
import SelectSeatsCardSvg from '../../images/select-seats-card.svg';


const Container = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0 2px 0px #DDD;
  display: inline-block;
  margin: 0.25rem 0.5rem;
  margin-left: 'auto'; /* aligh left */
  overflow: hidden;
  width: 300px;
  background-image: url(${SelectSeatsCardSvg});
  background-size: 100% auto;

  .selectedSeat {
    width: 100%;
    padding-left: 20px;
    display: table-cell;
    vertical-align: middle;
    height: 80px;

    span {
      display: flex;
      align-items: center;
      font-size: 15px;

      svg {
        margin-right: 10px;
      }
    }
  }

  .selectSeatLabel {
    width: 100%;
    background-color: #026CAB;

    span {
      width: 100%;
      display: inline-block;
      color: white;
      text-align: center;
      vertical-align: middle;
      margin: 10px 0;
      cursor: pointer;
    }
  }
`;


export default function FlightSeatAnswerView({ m }: { m: any }) {

  const {
    title,
    contents: seat,
  } = m.customMessage;

  const [isShowDetail, setShowDetail] = useState(false);

  function select() {
    setShowDetail(false);
  }

  try {
    const selectedSeats = (
      <Container>
        <div className='selectedSeat'>
          <span>
            {<>
              <svg height="22px" width="22px" version="1.1" viewBox="0 0 22 22">
                <defs/>
                <g id="Symbols" fill="none" stroke="none" strokeWidth="1">
                  <g id="card/selected-seat" transform="translate(-15.000000, -37.000000)">
                    <circle id="Oval-6" cx="26" cy="48" fill="#BE2026" r="10" stroke="#BE2026"/>
                    <polygon id="Check" fill="#FFFFFF" points="21.5 47.5 20 49 24 53 33 44.5 31.5 43 24 50"/>
                  </g>
                </g>
              </svg>
              <span >{seat.name} が選択されています</span>
            </>}
          </span>
        </div>
        <div className='selectSeatLabel'>
          <span onClick={() => setShowDetail(true)}>座席表で確認する</span>
        </div>
      </Container>
    );


    return (
      <>
        <div style={{ textAlign: 'right' }}>
          {title}
        </div>
        {selectedSeats}
        { isShowDetail
          ? (
            <FlightSeatFullScreen
              close={() => setShowDetail(false)}
              selectedSeat={seat}
              select={select}
            />
          )
          : null
        }
      </>
    );
  } catch (e) {
    console.log(e);
    return (
      <Container>
        <p>Could not parse carousel content</p>
      </Container>
    );
  }
}
