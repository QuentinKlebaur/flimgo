'use client'

import React from "react";
import { useState } from 'react';
import Link from "next/link";
import RouteData from "../../../types/route_data";

import { Burger, Center, Container, Group, Menu } from '@mantine/core';
import classes from './HeaderMenu.module.css';
import FlimgoRequester from "../../../request/flimgo/flimgoRequest";
import { UserOutput } from "../../../../../back/outputs/outputs";
import { useEffect } from "react";

interface NavbarTileProps {
  route: RouteData
}

const NavbarTile = (props : NavbarTileProps) => {
  return (
    <a
      key={props.route.text}
      href={props.route.route}
      className={classes.link}
    >
      {props.route.text}
    </a>
  );
};

interface NavbarProps {
  routes: RouteData[]
}

export interface UserData {
  username: string | null,
  loggedin: boolean
}

const Navbar = (props: NavbarProps) => {
  let flimgoRequester: FlimgoRequester = new FlimgoRequester()
  const [username, setUsername] = useState('');
  let loggedin: boolean = false

  useEffect(() => {
      async function updateUserData() {
        try {
          console.log("userdata")
          let res: UserOutput = await flimgoRequester.getCurrentUserData()
          loggedin = true
          setUsername(res.username)
        } catch (e) {
          console.log(e)
        }
      }
      updateUserData()
    }
  )

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          Flimgo
          <Group gap={5} visibleFrom="sm">
            {
              props.routes.map((route, i) => <NavbarTile key={route.text} route={route} />)
            }
          </Group>
          {
            username
          }
          {/* <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" /> */}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;