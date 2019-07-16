
import React from 'react';
import { Card } from 'antd';
import styled from '@emotion/styled';


const Container = styled.div`
  text-align: left;
  border: 0.1px solid #222;
  border-radius: 4px;
`;

const Content = styled.div`
  padding: 0.5em 1em;

  table {
    width: 100%;

    tbody th {
      font-weight: normal;
    }
  }
`;


export default function ProfileAnswerView({ m }: { m: any }) {

  const { contents } = m.customMessage;

  try {
    return (
      <>
      <Container>
        <Card title={'入力結果'} >
          <Content>
            <table>
              <colgroup>
                <col style={{width: '100px'}}/>
                <col/>
              </colgroup>
              <tbody>

                <tr>
                  <th>お名前（姓）</th>
                  <td>{contents.lastName}</td>
                </tr>

                <tr>
                  <th>お名前（名）</th>
                  <td>{contents.firstName}</td>
                </tr>

                <tr>
                  <th>生年月日</th>
                  <td>{contents.birthday}</td>
                </tr>

                <tr>
                  <th>性別</th>
                  <td>{contents.sex === '9002' ? '男性' : '女性'}</td>
                </tr>

                <tr>
                  <th>電話番号</th>
                  <td>{contents.phone}</td>
                </tr>

              </tbody>
            </table>
          </Content>
        </Card>
      </Container>
      </>
    );
  } catch (e) {
    console.log(e);
    return <p>Undefined profile type</p>;
  }
}
