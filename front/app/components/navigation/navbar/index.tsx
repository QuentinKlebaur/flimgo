import React from "react";
import Link from "next/link";
import RouteData from "../../../types/route_data";

import { Burger, Center, Container, Group, Menu } from '@mantine/core';
import classes from './HeaderMenu.module.css';

interface NavbarTileProps {
  route: RouteData
}

const NavbarTile = (props : NavbarTileProps) => {
  //return (
  //  <div>
  //    <li>
  //      <Link href={props.route.route}>
  //        <p>{props.route.text}</p>
  //      </Link>
  //    </li>
  //  </div>
  //)
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

const Navbar = (props: NavbarProps) => {

  //return (
  //    <div className="w-full h-20 bg-emerald-800 sticky top-0">
  //      <div className="container mx-auto px-4 h-full">
  //        <div className="flex justify-between items-center h-full">
  //          <ul className="hidden md:flex gap-x-6 text-white">
  //            {
  //              props.routes.map((route, i) => <NavbarTile key={route.text} route={route} />)
  //            }
  //          </ul>
  //        </div>
  //      </div>
  //    </div>
  //);
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
          {/* <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" /> */}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;