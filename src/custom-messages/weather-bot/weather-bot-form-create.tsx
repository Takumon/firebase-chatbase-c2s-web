
import React, { useState } from 'react';
import styled from '@emotion/styled'
import {
  Input,
  Button,
} from 'antd';
import {
  createTextMessage,
} from '../../utils/message-converter';

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

export default function WeatherBotFormCreate(
  {
    registerFunc,
    fetchToWeatherBotFunc,
  }
  :
  {
    registerFunc: Function
    fetchToWeatherBotFunc: Function
  }
) {

  const [message, setMessage] = useState('');

  function clearForm() {
    setMessage('');
  }

  function action() {
    const messageStr = createTextMessage(message);
    registerFunc(messageStr);
    // ここでWeather Botを呼び出す
    fetchToWeatherBotFunc(messageStr);
    clearForm();
  }

  return (
      <Container>
        <InputArea>
          <Input
            type="text"
            value={message}
            placeholder="New message for Weather Bot!"
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

