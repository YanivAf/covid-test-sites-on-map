import ContextWrapper from './contextWrapper';

import Box from '@mui/material/Box';

import Appbar from './components/appbar';
import Map from './components/map';
import Sidebar from './components/sidebar';

export default function App() {
  return (
    <ContextWrapper>
        <Box sx={{ height: '100vh', width: '100vw', display: 'flex' }}>
          <Appbar />
          <Map />
          <Sidebar />
        </Box>
    </ContextWrapper>
  );
}