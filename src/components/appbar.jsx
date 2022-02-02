import React from 'react';
import { useContext } from 'react';
import Context from './context';

import CssBaseline from '@mui/material/CssBaseline';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Loader from './loader';
import { drawerWidth } from './sidebar';

export const appbarHeight = 64;

export default function Appbar() {
  const { loading } = useContext(Context)

  return (
    <>
    <CssBaseline />
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, height: `${appbarHeight}px`, left: `${drawerWidth}px` }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          COVID-19 Test Sites Map
        </Typography>
      </Toolbar>
      {loading && <Loader />}
    </AppBar>
    </>
  );
}