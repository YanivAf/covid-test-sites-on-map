import { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

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
  const [allSites, setAllSites] = useState(
    JSON.parse(localStorage.getItem('allSites')) ?
    JSON.parse(localStorage.getItem('allSites')) :
    []
  );

  const isInIsrael = async (lat, lng) => {
    const isCountryIsrael = (geoLocationsArray, recurse) => {
      const mostAccurate = geoLocationsArray[geoLocationsArray.length - 1]; // assumption: last result is most accurate. YA
      if (mostAccurate.types.includes('country') && !recurse) {
        if (mostAccurate.short_name === 'IL') {
          console.log('In Israel!');
          return true;
        } else {
          console.log('Not in Israel!');
          return false;
        }
      } else if (recurse) {
        const addressComponents = mostAccurate.address_components;
        return isCountryIsrael(addressComponents, false);
      } else {
        console.log('Could not detect the country. Please select a location in Israel');
        return false;
      }
    }

    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
    const geoResults = data.results;
    if (geoResults.length > 2) {
      return isCountryIsrael(geoResults, true);
    } else {
      console.log('Could not detect the country. Please zoom-in and try again.');
      return false;
    }
  }

  const addMarker = async (lat, lng) => {
    const inIsrael = await isInIsrael(lat, lng);
    if (inIsrael) {
      const updatedAllSites = [...allSites];
      // **
      // show pop-up form to get required site data from user
      // **
      updatedAllSites.push({ // if form is submitted
        sTitle: `Site${allSites.length + 2}`,
        lat,
        lng,
        sDetails: 'some info...',
        sTestType: 'Both',
        sType: 'Drive in',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      setAllSites(updatedAllSites);
      localStorage.setItem('allSites', JSON.stringify(updatedAllSites));
    }
  }

  useEffect(() => {
  }, []);

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
            onClick={e => addMarker(e.lat,e.lng)}        
        >
          <LocationPin
          lat={32}
          lng={35}
          />
        </GoogleMapReact>
    </Box>
  );
}