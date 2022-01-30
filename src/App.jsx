import ContextWrapper from './contextWrapper';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Appbar from './components/appbar';
import Map from './components/map';
import Sidebar from './components/sidebar';

export default function App() {
  
  return (
    <ContextWrapper>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Appbar />
          <Map />
          <Sidebar />
        </Box>
    </ContextWrapper>
  );
}