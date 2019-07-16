
import React, { useState  } from 'react';
import styled from '@emotion/styled';
import SelectSeatsCardSvg from '../../images/select-seats-card.svg';
import FlightSeatFullScreen from './flight-seat-fullscreen';


const Container = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0 2px 0px #DDD;
  display: inline-block;
  margin: 0.25rem 0.5rem;
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


export default function FlightSeatView(
  {
    m,
    answer
  }
  :
  {
    m: any
    answer: Function
  }
) {

  const {
    title,
  } = m.customMessage;

  const [isShowDetail, setShowDetail] = useState(false);

  async function select(seat: any) {
    await answer(seat);
    setShowDetail(false);
  }



  try {
    const selectedSeats = (
      <Container>
        <div className='selectedSeat'>
          <span>
          </span>
        </div>
        <div className='selectSeatLabel'>
          <span onClick={() => setShowDetail(true)}>座席を選択する</span>
        </div>
      </Container>
    );


    return (
      <>
        <div style={{ textAlign: 'left' }} >
          {title}
        </div>
        {selectedSeats}
        { isShowDetail
          ? (
            <FlightSeatFullScreen
              close={() => setShowDetail(false)}
              selectedSeat={null}
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
