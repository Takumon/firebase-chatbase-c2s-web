import React from 'react';
import styled from '@emotion/styled';
import { Button, Menu, Dropdown, Icon } from 'antd';
import BotAvatorIcon from '../images/bot.png';
import MineAvatorIcon from '../images/mine.png';
import CustomMessage from './custom-message';

const Container = styled.div`
  display: flex;
  align-items: stretch;
  margin-bottom: 36px;
`;

const MessageArea = styled.div`
  position: relative;
  flex-grow: 1;
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
`;

const Avator = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  border: 1px solid gray;
  overflow: hidden;
  margin-right: 1rem;
`;


export default function SendBirdMessage({
  m,
  viewerUserId,
  registerFunc,
  registerAnswerFunc,
  registerFileFunc,
  deleteFunc
}: {
  m: any
  viewerUserId: string
  registerFunc: Function
  registerAnswerFunc: Function
  registerFileFunc: Function
  deleteFunc: Function

}) {

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Button
            onClick={() => deleteFunc(m)}
            type="danger"
        >DELETE</Button>
      </Menu.Item>
    </Menu>
  );

  const dropdown = (
    <div style={{
      position: 'absolute',
      top: '6px',
      right: '-24px',
    }} >
      <Dropdown overlay={menu} placement="bottomRight" >
        <a target="_blank" rel="noopener noreferrer" href="#">
          <Icon type="more" />
        </a>
      </Dropdown>
    </div>
  );

  return (
    <Container>
      <Avator
        alt="avator"
        src={JSON.parse(m.message).isBot ? BotAvatorIcon : MineAvatorIcon }
      />
      <MessageArea>
        <CustomMessage
          m={m}
          registerFunc={registerFunc}
          registerAnswerFunc={registerAnswerFunc}
        />
        {dropdown}
      </MessageArea>
    </Container>
  );
}


