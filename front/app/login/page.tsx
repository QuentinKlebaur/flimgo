'use client'

import { Input, TextInput, Stack, Button } from '@mantine/core';
import FlimgoRequester from '../request/flimgo/flimgoRequest';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, handlers] = useDisclosure();
    let flimgoRequester: FlimgoRequester

    //localStorage.clear()
    //setToken("")
    try {
      flimgoRequester = new FlimgoRequester()
    } catch (e) {
      console.log(e)
    }
    const loginFunction = async () => {
      setErrorMessage("")
      handlers.open()
      try {
        await flimgoRequester.login(username, password)
      } catch(e) {
        console.log(e)
        setErrorMessage("Auth failed")
      }
      let accessToken = localStorage.getItem("accessToken")
      if (accessToken)
        setToken(accessToken)
      handlers.close()
    }
    return (
      <>
        <div className="container mx-auto px-4">
          <Stack justify="center">
          <TextInput value={username} onChange={(event) => setUsername(event.currentTarget.value)} label="Username" placeholder='Username'/>
          <TextInput value={password} onChange={(event) => setPassword(event.currentTarget.value)} label="Password" placeholder='Password' type='password'/>
          <Button variant="filled"  loading={loading} color="blue" loaderProps={{ type: 'dots' }} onClick={loginFunction}>Login</Button>
          <p>{token.length ? `Token: ${token}` : ""}</p>
          <p>{errorMessage.length ? errorMessage : ""}</p>
          </Stack>
        </div>
      </>
    );
  }