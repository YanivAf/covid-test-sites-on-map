import { useState } from 'react';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Appbar from './components/appbar';
import MapSnackbar from './components/mapSnackbar';
import Map from './components/map';
import Sidebar from './components/sidebar';

export default function App() {
  const [allSites, setAllSites] = useState(
    JSON.parse(localStorage.getItem('allSites')) ?
    JSON.parse(localStorage.getItem('allSites')) :
    []
  );
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  
  if (snackbar.open) setTimeout(() => {
    setSnackbar({ ...snackbar, open: false });
  }, 5000);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Appbar />
      {snackbar.open && <MapSnackbar snackbar={snackbar} />}
      <Map allSites={allSites} setAllSites={setAllSites} setSnackbar={setSnackbar}/>
      <Sidebar allSites={allSites} />
    </Box>
  );
}