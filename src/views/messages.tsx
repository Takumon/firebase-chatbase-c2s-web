import React, { useState, useEffect, useCallback  } from 'react';
import styled from '@emotion/styled';
import history from '../history';
import { Layout, Button } from 'antd';
// import SendBird from 'sendbird';
// import Pusher from 'pusher-js';
import * as firestoreMessageUtil from '../utils/firestore-message';
import SendBirdMessage from '../components/sendbird-message';
// import {
//   connect,
//   deleteMessage,
//   enterChannel,
//   getMessage,
//   openChannel,
//   // updateMessage,
//   sendMessage,
//   sendFileMessage,
// } from '../utils/sendbird';
import { createTextMessage, toCustom } from '../utils/message-converter';
import { MessageWeatherBotCreate, MessageTextFormCreate } from '../custom-messages';
import FlightTicketRegisterBot from '../dialog-controllers/flight-ticket-register/bot';
import { DATA_TYPE } from '../dialog-controllers/flight-ticket-register/types';

const { Header, Content, Footer } = Layout;
const APP_ID: string = process.env.REACT_APP_APP_ID || '';
const CHANNEL_ID: string = process.env.REACT_APP_CHANNEL_ID || '';
// const PUSHER_APP_ID: string = process.env.REACT_APP_PUSHER_APP_ID || '';
// const PUSHER_APP_CLUSTER: string = process.env.REACT_APP_PUSHER_APP_CLUSTER || '';
// const BOT_CHANNEL: string = process.env.REACT_APP_BOT_CHANNEL || '';
// const BOT_WEATHER_EVENT: string = process.env.REACT_APP_BOT_WEATHER_EVENT || '';
const EVENT_HANDLER_ID: string = uuid4();
const WEATHER_API_URL: string = 'http://localhost:5000/chat';
// TODO temp user id
const BOT_USER_ID: string = 'inouetakumon@gmail.com';

/****************************/
/*  Style                   */
/****************************/
const Container = styled.div`
  padding: 12px;
`;

const HeaderTitle = styled.div`
  color: white;
  font-size: 36px;
  float: left;
`;

const MessageArea = styled.div`
`;


/****************************/
/*  Conponent               */
/****************************/
export default function Messages({ userId }: { userId: string }) {
  if (!userId) {
    console.log('Please set userId');
    history.push('/login');
  }

  const [attachedBot, setAttachedBot] = useState<any>(null);
  const [messages, setMessages] = useState<Array<any>>([]);
  // const [sb, setSb] = useState<any>(null);
  // const [channel, setChannel] = useState<any>(null);
  // const [pusherChannel, setPusherChannel] = useState<any>(null);

  /* Message Operations */
  const registerFunc = useCallback(
    async (messageText) => {
      // TODO Refactoring attating isBot
      const m = JSON.parse(messageText);
      m.isBot = true;
      const registeredMessage = await firestoreMessageUtil.sendMessage(userId, JSON.stringify(m));
      // addMessageInModel(registeredMessage);
    },
    [ userId ],
  );

  const registerAnswerFunc = useCallback(
    async (messageText) => {
      const registeredMessage = await firestoreMessageUtil.sendMessage(userId, messageText);
      // addMessageInModel(registeredMessage);

      // const hasNext = await attachedBot.reactionToAnwer(registeredMessage);
      // console.log('reactionToAnwerの結果', hasNext);
      // if (!hasNext) {
      //   detachBot();
      // }
    },
    [ userId ],
  );


  // TODO Temp
  const registerFileFunc = useCallback(
    async (file) => {
    },
    [ ],
  );


  // const updateFunc = useCallback(
  //   async (message, messageText) => {
  //     const updatedMessage = await updateMessage(channel, message, messageText);
  //     updateMessageInModel(updatedMessage);
  //   },
  //   [ channel ],
  // );


  const deleteFunc = useCallback(
    async (message) => {
      await firestoreMessageUtil.deleteMessage(userId, message.messageId, message);
    },
    [ userId ],
  );


  /* Model Operations */
  function addMessageInModel(newOne: any) {
    setMessages((msgs: any) => {
      let targetIndex: Number | null = null;

      for (const index in msgs) {
        if (msgs[index].messageId === newOne.messageId) {
          targetIndex = Number(index);  // index is string
          break;
        }
      }

      return targetIndex === null
        ? [ ...msgs, newOne ]
        : msgs;
    });
  }

  // function updateMessageInModel(updatedOne: any) {
  //   setMessages((msgs: any) => {
  //     let targetIndex: Number | null = null;
  //     for (const index in msgs) {
  //       if (msgs[index].messageId === updatedOne.messageId) {
  //         targetIndex = Number(index); // index is string
  //         break;
  //       }
  //     }

  //     return targetIndex === null
  //       ? msgs
  //       : [
  //         ...msgs.slice(0, targetIndex),
  //         updatedOne,
  //         ...msgs.slice(Number(targetIndex) + 1)
  //       ];
  //   });
  // }


  function deleteMessageInModel(deletedMessageId: string) {
    setMessages((msgs: any) => {
      let targetIndex = null;

      for (const index in msgs) {
        if (msgs[index].messageId === deletedMessageId) {
          targetIndex = Number(index);  // index is string
          break;
        }
      }

      return targetIndex === null
        ? msgs
        : [
          ...msgs.slice(0, targetIndex),
          ...msgs.slice(targetIndex + 1)
        ];
    });
  }


  /* API Operations */
  // function fetchToWeatherBotFunc(message: any) {
  //   fetch(WEATHER_API_URL, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ message }),
  //   });
  // }


  /* BOT Operations */
  function detachBot() {
    console.log('detachBotするよ');
    console.log('before', attachedBot);
    setAttachedBot(null);
    console.log('after', attachedBot);
  }


  function attachBot() {
    // TODO To be able to chage bot.
    // TODO making departure and arriaval date question
    const bot = new FlightTicketRegisterBot(registerFunc, {
      [DATA_TYPE.CONDITON_NUMBER_OF_PASSENGERS]: 1,
      [DATA_TYPE.CONDITON_DEPARTURE_DATE]: '2019/07/04',
      [DATA_TYPE.CONDITON_ARRIVAL_DATE]: '2019/07/14',
    });
    bot.execQuestion();
    setAttachedBot(bot);
  }


  // useEffect(() => {
  //   (async () => {
  //     // init＿ SendBird
  //     const sb = new SendBird({appId: APP_ID});
  //     // const user = await connect(sb, userId);
  //     await connect(sb, userId);
  //     const openedChannel: any = await openChannel(sb, CHANNEL_ID);
  //     await enterChannel(openedChannel);
  //     setSb(sb);
  //     setChannel(openedChannel);

  //     const currentQuery = openedChannel.createPreviousMessageListQuery();
  //     const fetchedMessages: any = await getMessage(currentQuery);

  //     if(fetchedMessages) {
  //       setMessages(fetchedMessages);
  //     }
  //   })();

  // }, [userId]);


  useEffect(() => {
    if (!userId) {
      return;
    }

    // const ChannelHandler = new sb.ChannelHandler();

    firestoreMessageUtil.onSnapshot(async (snapshot: any) => {
      for(const change of snapshot.docChanges()) {

        if (change.type === 'added') {
          const message = change.doc.data();
          message.messageId = change.doc.id;
          const m = toCustom(message);
          console.log('New : ', m);
          addMessageInModel(m)

          if (attachedBot && !m.customMessage.isBot) {
            const hasNext = await attachedBot.reactionToAnwer(m);
            console.log('reactionToAnwerの結果', hasNext);
            if (!hasNext) {
              detachBot();
            }
          }
        }
        if (change.type === 'modified') {
          // TOD
          console.log('Modified : ', change.doc.data());
        }
        if (change.type === 'removed') {
          // TODO
          console.log('Removed : ', change.doc.id);
          deleteMessageInModel(change.doc.id);

        }
      }
    })

    // // Add event handlers for sync in other browser
    // ChannelHandler.onMessageReceived = async (_: any, message: any) => {
    //   const m = toCustom(message);
    //   // ChatBot has to reaction
    //   addMessageInModel(m);
    // };

    // // ChannelHandler.onMessageUpdated = (_: any, message: any) => updateMessageInModel(message);
    // ChannelHandler.onMessageDeleted = (_: any, messageId: any) => deleteMessageInModel(messageId);
    // console.log('addChannelHandler');
    // sb.addChannelHandler(EVENT_HANDLER_ID, ChannelHandler);

    return () => {
      if (!userId) {
        return;
      }

      console.log('offSnapshot')
      firestoreMessageUtil.offSnapshot();
    };

  }, [userId, attachedBot]);



  // // init Pusher
  // useEffect(() => {
  //   const pusher = new Pusher(PUSHER_APP_ID, {
  //     cluster: PUSHER_APP_CLUSTER,
  //     encrypted: true,
  //   });
  //   setPusherChannel(pusher.subscribe(BOT_CHANNEL));
  // }, []);

  // useEffect(() => {
  //   if (!pusherChannel && !channel) {
  //     return;
  //   }

  //   function registerFuncFromPusher({ message } : { message: any }) {
  //     registerFunc(createTextMessage(message))
  //   }

  //   console.log('bind pusherChannel event')

  //   pusherChannel.bind(BOT_WEATHER_EVENT, registerFuncFromPusher);

  //   return () => {
  //     console.log('unbind pusherChannel event')
  //     pusherChannel.unbind(BOT_WEATHER_EVENT, registerFuncFromPusher);
  //   };

  // }, [pusherChannel, channel, registerFunc]);


  const UserId = styled.div`
    font-size: 12px;
    color: white;
    position: absolute;
    top: 32;
    right: 0;
    padding: 12px;
    height: 32px;
  `;

  return (
    <Layout>
      <Header>
        <HeaderTitle>
          航空券予約
        </HeaderTitle>
          <Button onClick={() => {
            attachedBot
              ? detachBot()
              : attachBot();
          }} >
            { attachedBot ? 'detach' : 'Attach' } Bot
          </Button>
        <UserId>
          { userId }
        </UserId>
        {/* <Link to='/login'>
          <Button>
            Logout
          </Button>
        </Link> */}
      </Header>
      <Content>
        <Container>
          <MessageArea>
            {messages && messages.map(m =>
              <SendBirdMessage
                m={m}
                key={m.messageId}
                viewerUserId={userId}
                registerFunc={registerFunc}
                registerAnswerFunc={registerAnswerFunc}
                registerFileFunc={registerFileFunc}
                deleteFunc={deleteFunc}
              />
            )}
          </MessageArea>

          <MessageTextFormCreate
            registerAnswerFunc={registerAnswerFunc}
          />

          {/* <MessageWeatherBotCreate
            registerFunc={registerFunc}
            fetchToWeatherBotFunc={fetchToWeatherBotFunc}
          /> */}

        </Container>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

function uuid4() {
  let d = new Date().getTime();

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string) => {
    // tslint:disable-next-line: no-bitwise
    const r = ((d + Math.random() * 16) % 16) | 0;
    d = Math.floor(d / 16);
    // tslint:disable-next-line: no-bitwise
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
