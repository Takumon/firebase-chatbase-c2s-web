
import React, { useState, useEffect  } from 'react';
import { Card, Button, Input, DatePicker } from 'antd';
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

const Action = styled.div`
  display: flex;

  Button {
    flex-grow: 1;
    margin: 12px;
  }
`;

export default function ProfileView(
  {
    m,
    answer
  }
  :
  {
    m: any
    answer: any
  }
) {

  // const [id ] = useState('');
  // const [leadId ] = useState('');
  const [lastName, setLastName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [sex, setSex] = useState<string>('');
  const [savedResponses, setSavedResponses] = useState<any>(undefined);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [submitted /* , setSubmitted*/] = useState<boolean>(false);


  useEffect(() => {
    let unmounted = false;

    (async () => {

      if (!m.messageId) {
        setSavedResponses(new Error('No message ID'));
        return;
      }

      try {
        // TODO Build Server for Profile
        // const messageId = '' + m.messageId;
        // const res = await get(`/message/${stripPrefix(m.messageId)}`);

        // if (!unmounted) {
        //   setSavedResponses(res);

        //   if (res.profile) {
        //     setId(res.profile.id);
        //     setLeadId(res.profile.leadId);
        //     setLastName(res.profile.lastName);
        //     setFirstName(res.profile.firstName);
        //     setPhone(res.profile.phone);
        //     setBirthday(res.profile.birthday);
        //     setSex(res.profile.sex);
        //     setSavedResponses(res.profile.savedResponses);
        //     setSubmitting(res.profile.isSubmitting);
        //     setSubmitted(res.profile.isSubmitted);
        //   }
        // }
      } catch(err) {
        if (!unmounted) {
          setSavedResponses(err);
        }
      }

    })();

    // clean up
    return () => {
      unmounted = true
    };
  });

  async function onSubmit() {
    setSubmitting(true);

    // const messageId = stripPrefix('' + m.messageId);

    // const patchOp = {
    //   operation: 'set',
    //   property: `profile`,
    //   value: {
    //     id,
    //     leadId,
    //     lastName,
    //     firstName,
    //     phone,
    //     birthday,
    //     sex,
    //     isSubmitted: true,
    //   }
    // };

    // const payload = {
    //   raw: JSON.stringify(patchOp)
    // };

    // TODO サブミットして成功したらAnswerする
    answer({
      lastName,
      firstName,
      phone,
      birthday,
      sex,
    });

    // registerFunc(createTextMessage('予約中です...'));

    // try {
    //   // TODO Build Server for Profile
    //   // const res = await patch(`/message/${messageId}`, payload);
    //   const res = {
    //     ok: true,
    //   };

    //   if (!res.ok) {
    //     setSubmitting(new Error(res.error));
    //   } else {
    //     setSubmitting(false);
    //     setSubmitted(true);

    //     // const payload = {
    //     //   name: firstName + ' ' + lastName,
    //     //   phone,
    //     //   sex,
    //     //   birthday
    //     // };

    //     try {

    //       // TODO Build Server for Profile
    //       // const resp = await patch(`/editProfile?leadID=${leadId}`, payload)
    //       // const resp = { ok: true };

    //       // TODO Build Message sender in Redux
    //       // const conversation = WebSDK.getConversation(this.props.message.conversationId);
    //       // const receiptMIMEType = `application/x.card-response+json`;
    //       // const receiptMessage = conversation.createMessage({
    //       //   parts: [{
    //       //     body: JSON.stringify({}),
    //       //     mimeType: receiptMIMEType,
    //       //   }]
    //       // });
    //       // receiptMessage.send();
    //       // setTimeout(() => {
    //       //   registerFunc(createTextMessage('ご予約が確定しました。次に進みますか。'));
    //       // }, 1000)

    //     } catch(err) {
    //       console.log(err);
    //     }
    //   }
    // } catch(err) {
    //   setSubmitting(err);
    // }
    return () => {
      console.log('do nothing');
    }
  }

  const submitButton =
    submitted ?
      <span>登録済</span>
    : savedResponses instanceof Error ?
      <Button
        className='inline error'
        onClick={() => alert(savedResponses.message)}
      >Error</Button>
    : isSubmitting ?
      <Button
        className='inline'
        disabled
      >登録中</Button>
    :
      <Button
        className='inline'
        type='primary'
        onClick={onSubmit}
      >登録</Button>;

  try {
    return (
      <>
      <div style={{textAlign: 'left'}}>{m.customMessage.title}</div>
      <Container>
        <Card title={'お客様情報'} >
          <Content>
            <table>
              <colgroup>
                <col style={{width: '100px'}}/>
                <col/>
              </colgroup>
              <tbody>

                <tr>
                  <th>お名前（姓）</th>
                  <td>
                    <Input
                      type='text'
                      value={lastName}
                      disabled={submitted}
                      onChange={e => setLastName(e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <th>お名前（名）</th>
                  <td>
                    <Input
                      type='text'
                      value={firstName}
                      disabled={submitted}
                      onChange={e => setFirstName(e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <th>生年月日</th>
                  <td>
                    <DatePicker
                      disabled={submitted}
                      onChange={(date, dateString) => setBirthday(dateString)}
                    />
                  </td>
                </tr>

                <tr>
                  <th>性別</th>
                  <td>
                    <Input
                      type="radio"
                      value="9002"
                      style={{width: '13px'}}
                      checked={sex === '9002'}
                      disabled={submitted}
                      onChange={e => setSex(e.target.value)}
                    />
                    <span style={{marginRight: '10px'}}>男性</span>
                    <Input
                      type="radio"
                      value="9003"
                      style={{width: '13px'}}
                      checked={sex === '9003'}
                      disabled={submitted}
                      onChange={e => setSex(e.target.value)}
                    />
                    <span>女性</span>
                  </td>
                </tr>

                <tr>
                  <th>電話番号</th>
                  <td>
                    <Input type='text'
                      value={phone}
                      disabled={submitted}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </td>
                </tr>

              </tbody>
            </table>
          </Content>

          <Action>
            {submitButton}
          </Action>
        </Card>
      </Container>
      </>
    );
  } catch (e) {
    console.log(e);
    return <p>Undefined profile type</p>;
  }
}
