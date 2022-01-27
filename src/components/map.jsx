import React from 'react';
import GoogleMapReact from 'google-map-react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import '../map.css';

const initialLocation = {
  address: 'Kikar Hamedina',
  lat: 32.086920,
  lng: 34.788670,
}

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const LocationPin = () => (
  <div className="pin">
    <LocationOnIcon className="pin-icon" />
  </div>
);

export default function Map() {
  return (
    <Box
    component="main"
    sx={{
      flexGrow: 1,
      bgcolor: 'background.default',
      p: 3
    }}
    >
        <Toolbar />
        <GoogleMapReact
            bootstrapURLKeys={{ key: apiKey }}
            defaultCenter={initialLocation}
            defaultZoom={10}
            style = {{ 
              width: '100%',
              height: '100%'        
            }}
            onClick={ev => {
              console.log(ev);
            }}        
        >
          <LocationPin
          lat={32}
          lng={35}
          />
        </GoogleMapReact>
    </Box>
  );
}
