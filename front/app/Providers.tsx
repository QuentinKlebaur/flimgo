"use client"

import { SessionProvider } from "next-auth/react";
import Navigation from "./components/navigation/navbar"
import React, { ReactNode } from "react";
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

import RouteData from "./types/route_data";

const routes: RouteData[] = [
  {
    route: "/login",
    text: "Login"
  },
  {
    route: "/home",
    text: "Home"
  }
]

const theme = createTheme({
  /** Put your mantine theme override here */
});

interface ProviderProps {
  children: React.ReactNode
}

export const Provider = ( props : ProviderProps ) => {
    return (
        <MantineProvider theme={theme}>
            <SessionProvider>
                <Navigation routes={routes}/>
                {props.children}
            </SessionProvider>
        </MantineProvider>
    );
};