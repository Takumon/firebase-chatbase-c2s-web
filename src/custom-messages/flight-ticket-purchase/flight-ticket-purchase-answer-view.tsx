
import React from 'react';
import styled from '@emotion/styled';



const Container = styled.div`
  width: 100%;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0 2px 0px #DDD;
  display: inline-block;
  margin: 0.25rem 0.5rem;
  margin-left: auto;
  overflow: hidden;
  width: 300px;
  text-align: left;

  .header {
    height: 20px;
    background-color: #00539C;
    color: white;
    padding: 10px;

    span {
      float: left;
    }

    span.date {
      float: right;
      background-color: #236BA4;
      border-radius: 5px;
      padding: 5px;
      font-size: 10px;
    }
  }

  .content {
    padding: 10px;

    hr {
      border-style: solid;
      border-color: #DBDBDB;
    }

    table {
      width: 100%;
    }

    td {
      text-align: right;
    }
  }

  .footer {
    background-color: #FAFAFA;
    height: 20px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    span {
      color: #58646D;
    }
  }

  .confirmed {
    cursor: default;
  }
`;


export default function FlightSeatView({ m }: { m: any }) {
  const {
    title,
    contents,
  } = m.customMessage;

  const {
    price,
    tax,
    amount,
    date,
  } = contents.order;


  try {
    const footer =(
      <div className="footer confirmed">
        <span>購入済み</span>
        <svg height="22px" width="22px" version="1.1" viewBox="0 0 22 22">
          <defs/>
          <g id="Symbols" fill="none" stroke="none" strokeWidth="1">
            <g id="confirmation/complete" transform="translate(-222.000000, -17.000000)">
              <circle id="Oval-6" cx="233" cy="28" fill="#BE2026" r="10" stroke="#BE2026"/>
              <polygon id="Check" fill="#FFFFFF" points="228.5 27.5 227 29 231 33 240 24.5 238.5 23 231 30"/>
            </g>
          </g>
        </svg>
      </div>
    );


    return (
      <>
        <div style={{ textAlign: 'right' }} >
          {title}
        </div>
        <Container>
          <div className="header">
            <span>航空券購入</span>
            <span className="date">{date}</span>
          </div>
          <div className="content">
            購入情報
            <hr/>
            <table>
              <tbody>
                <tr>
                  <th>航空券</th>
                  <td>{price}</td>
                </tr>
                <tr>
                  <th>税金</th>
                  <td>{tax}</td>
                </tr>
                <tr>
                  <th>合計</th>
                  <td>{amount}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {footer}
        </Container>
      </>
    );
  } catch (e) {
    return (
      <Container>
        <p>Could not parse carousel content</p>
      </Container>
    )
  }
}
