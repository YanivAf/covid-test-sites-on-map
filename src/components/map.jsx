import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

import SiteMarker from './siteMarker';
import TempMarker from './tempMarker';

const initialLocation = {
  address: 'Kikar Hamedina',
  lat: 32.086920,
  lng: 34.788670,
}

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function Map({ allSites, setAllSites, setSnackbar }) {
  const [currentZoom, setCurrentZoom] = useState(7);
  const [tempMarker, setTempMarker] = useState({ show: false, lat: null, lng: null });

  const isInIsrael = async (lat, lng) => {
    const isCountryIsrael = (geoLocationsArray, recurse) => {
      const countryItem = geoLocationsArray[geoLocationsArray.length - 1]; // assumption: last result is the country item. YA
      if (countryItem.types.includes('country') && !recurse) {
        if (countryItem.short_name === 'IL') {
          setSnackbar({
            open: true,
            message: "Please set your site details",
            severity: "info"
          });
          return true;
        } else {
          setSnackbar({
            open: true,
            message: "Not in Israel! Please select a location in Israel",
            severity: "error"
          });
          return false;
        }
      } else if (recurse) {
        const addressComponents = countryItem.address_components;
        return isCountryIsrael(addressComponents, false);
      } else {
        setSnackbar({
          open: true,
          message: "Could not detect the country. Please select a location in Israel",
          severity: "warning"
        });
        return false;
      }
    }

    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
    const geoResults = data.results;
    if ((geoResults.length > 2) && (currentZoom > 17)) {
      return isCountryIsrael(geoResults, true);
    } else {
      setSnackbar({
        open: true,
        message: "For reasonable accuracy, Please zoom-in and try again",
        severity: "warning"
      });
      return false;
    }
  }

  const showTempMarker = async (lat, lng) => {
    const inIsrael = await isInIsrael(lat, lng);
    if (inIsrael) setTempMarker({ show: true, lat, lng })
  }
  
  return (
    <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={initialLocation}
        defaultZoom={7}
        zoom={currentZoom}
        style = {{ 
          width: '100%',
          height: '100%',
          margin: '10px'
        }}
        onClick={e => showTempMarker(e.lat,e.lng)}
        onChange={e => setCurrentZoom(e.zoom)}
    >
      {allSites.length > 0 &&
      allSites.map(site => {
        if (!site.archived) return (
          <SiteMarker
            key={site.sId}
            lat={site.lat}
            lng={site.lng}
            site={site}
          />
        )
        })}
      
      {tempMarker.show &&
      <TempMarker 
        lat={tempMarker.lat}
        lng={tempMarker.lng}
        setAllSites={setAllSites}
      />}
    </GoogleMapReact>
  );
}