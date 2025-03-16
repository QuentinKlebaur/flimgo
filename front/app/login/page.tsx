'use client'

import { Input, TextInput, Stack, Button, Container } from '@mantine/core';
import FlimgoRequester from '../request/flimgo/flimgoRequest';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, handlers] = useDisclosure();
    let flimgoRequester: FlimgoRequester

    try {
      flimgoRequester = new FlimgoRequester()
    } catch (e) {
      console.log(e)
    }
    const loginFunction = async () => {
      handlers.open()
      try {
        await flimgoRequester.login(username, password)
      } catch(e) {
        console.log(e) // TODO manage properly
      }
      handlers.close()
    }
    return (
      <>
        <div className="container mx-auto px-4">
          <Container size="xs">
            <Stack justify="center">
            <TextInput value={username} onChange={(event) => setUsername(event.currentTarget.value)} label="Username" placeholder='Username'/>
            <TextInput value={password} onChange={(event) => setPassword(event.currentTarget.value)} label="Password" placeholder='Password' type='password'/>
            <Button variant="filled"  loading={loading} color="blue" loaderProps={{ type: 'dots' }} onClick={loginFunction}>Login</Button>
            </Stack>
          </Container>
        </div>
      </>
    );
  }