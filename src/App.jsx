import React from 'react';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Map from './components/map';
import Sidebar from './components/sidebar';
import Appbar from './components/appbar';

export default function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Appbar />
      <Map />
      <Sidebar />
    </Box>
  );
}