import React, { useState  } from 'react';
import styled from '@emotion/styled'
import {
  Input,
  Button,
} from 'antd';
import history from '../history'

const SingleInputForm = styled.div`
  display: flex;
  align-items: stretch;
`;

const SingleInputFormInput = styled.div`
  flex-grow: 1;
`;

const SingleInputFormButton = styled.div`

`;

export default function Login({ setUserId }: { setUserId: Function }) {
  const [userIdForm, setUserIdForm] = useState<string>('');


  function login(_userId: string) {
    setUserId(_userId);
    history.push('/channel');
  }

  return (
    <>
      <h1>Login</h1>
      <SingleInputForm>
        <SingleInputFormInput>
          <Input
            type="text"
            value={userIdForm}
            onChange={e => setUserIdForm(e.target.value)}
            placeholder="UserId"
          />
        </SingleInputFormInput>
        <SingleInputFormButton>
          <Button
            onClick={() => {
              login(userIdForm);
              setUserIdForm('');
            }}
            type="primary"
          >SEND!</Button>
        </SingleInputFormButton>
      </SingleInputForm>
    </>
  );
}
