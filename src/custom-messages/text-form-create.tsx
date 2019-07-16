
import React, { useState } from 'react';
import styled from '@emotion/styled';
import {
  Input,
  Button,
} from 'antd';
import {
  createTextMessage,
} from '../utils/message-converter';

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: stretch;
`;

const InputArea = styled.div`
  flex-grow: 1;
`;

const ButtonArea = styled.div`

`;

export default function TextFormCreate(
  {
    registerAnswerFunc,
  }
  :
  {
    registerAnswerFunc: Function
  }
) {

  const [message, setMessage] = useState<string>('');

  function clearForm() {
    setMessage('');
  }

  function action() {
    const messageStr = createTextMessage(message);
    registerAnswerFunc(messageStr);
    clearForm();
  }

  return (
    <Container>
      <InputArea>
        <Input
          type="text"
          value={message}
          placeholder="New message"
          onChange={e => setMessage(e.target.value)}
        />
      </InputArea>
      <ButtonArea>
        <Button
          onClick={action}
          type="primary"
        >SEND</Button>
      </ButtonArea>
    </Container>
  );
}

