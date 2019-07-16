
import React from 'react';
import styled from '@emotion/styled';
import { Card, Button } from 'antd';

const Container = styled.div`
  text-align: left;
  border: 0.1px solid #222;
  border-radius: 4px;
`;

const Content = styled.div`
  padding: 10px;

  table {
    width: 100%;
  }
  th {
    font-weight: normal;
  }
  td {
    text-align: right;
  }
`;

const Action = styled.div`
  display: flex;

  Button {
    flex-grow: 1;
    margin: 12px;
  }
`;

export default function ConfirmAppStartView(
  { m, answer }
  :
  { m: any, answer: Function }
) {
  const {
    title,
    text,
  } = m.customMessage;

  const ActionYes = (
    <Button
      type="primary"
      onClick={async (e) => {
        const ansMessage = 'はい';
        await answer(ansMessage);
      }}
    >はい</Button>
  );

  const ActionNo = (
    <Button
      type="danger"
      onClick={async () => {
        const ansMessage = 'いいえ';
        await answer(ansMessage);
      }}
    >いいえ</Button>
  );

  return (
    <Container>
      <Card title={title} >
        <Content>
          {text}
        </Content>

        <Action>
          {ActionYes}
          {ActionNo}
        </Action>

      </Card>
    </Container>
  );
}
