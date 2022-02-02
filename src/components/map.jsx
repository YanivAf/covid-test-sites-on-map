import { useContext } from 'react';
import Context from './context';
import { useSnackbar } from 'notistack';
import GoogleMapReact, { fitBounds } from 'google-map-react';
import axios from 'axios';

import SiteMarker from './siteMarker';
import TempMarker from './tempMarker';

import { drawerWidth } from './sidebar';
import { appbarHeight } from './appbar';

import { initialLocation } from '../contextWrapper';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function Map() {
  const { loading, filteredActiveSites, tempMarker, setTempMarker, mapVisibleBounds, setMapVisibleBounds, currentZoom, setCurrentZoom, currentCenter, setCurrentCenter, firstLoad, setFirstLoad } = useContext(Context)
  const { enqueueSnackbar } = useSnackbar();

  const handleSnackbar = (message, variant) => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 5000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      }
    });
  }

  const handleTempMarker = (target, lat, lng) => {
    if ((target.className === '') && (tempMarker.show)) setTempMarker({ ...tempMarker, show: false });
    else if ((target.className === '') && (!tempMarker.show)) showTempMarker(lat, lng);
  }

  const handleChange = (e) => {
    if (firstLoad) {
      const sitesCount = filteredActiveSites.length;
      setFirstLoad(false);
      if (sitesCount === 0) {
        setCurrentZoom(7);
        setCurrentCenter(initialLocation);
      } else if (sitesCount === 1) {
        setCurrentZoom(15);
        setCurrentCenter({lat: filteredActiveSites[0].lat, lng: filteredActiveSites[0].lng});
      } else {
        const { zoom, center } = fitBounds(mapVisibleBounds, e.size);
        console.log(filteredActiveSites.length);
        setCurrentZoom(zoom);
        setCurrentCenter(center);
      }
    } else {
      setMapVisibleBounds(e.bounds);
      setCurrentZoom(e.zoom);
      setCurrentCenter({ lat: e.center.lat, lng: e.center.lng });
    }
  }

  const isInIsrael = async (lat, lng) => {
    const isCountryIsrael = (geoLocationsArray, recurse) => {
      const countryItem = geoLocationsArray[geoLocationsArray.length - 1]; // assumption: last result has country info. YA
      if (countryItem.types.includes('country') && !recurse) {
        if (countryItem.short_name === 'IL') {
          handleSnackbar("Please set your site details", "info");
          return true;
        } else {
          handleSnackbar("Not in Israel! Please select a location in Israel", "error");
          return false;
        }
      } else if (recurse) {
        const addressComponents = countryItem.address_components;
        return isCountryIsrael(addressComponents, false);
      } else {
        handleSnackbar("Could not detect the country. Please select a location in Israel", "warning");
        return false;
      }
    }

    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
    const geoResults = data.results;
    if ((geoResults.length > 2) && (currentZoom > 17)) {
      return isCountryIsrael(geoResults, true);
    } else {
      handleSnackbar("For reasonable accuracy, Please zoom-in and try again", "warning");
      return false;
    }
  }

  const showTempMarker = async (lat, lng) => {
    const inIsrael = await isInIsrael(lat, lng);
    if (inIsrael) {
      setCurrentCenter({lat, lng});
      setTempMarker({ show: true, lat, lng });
    }
  }
  
  return (
    <>
    {!loading &&
    <>
    <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultZoom={7}
        zoom={currentZoom}
        center={currentCenter}
        options={{
          disableDoubleClickZoom: true
        }}
        style = {{ 
          position: "fixed",
          width: `calc(100% - ${drawerWidth}px)`,
          height: `calc(100% - ${appbarHeight}px)`,
          left: `${drawerWidth}px`,
          top: `${appbarHeight}px`,
        }}
        onClick={e => handleTempMarker(e.event.target, e.lat, e.lng)}
        onChange={handleChange}
    >
      {filteredActiveSites.length > 0 &&
      filteredActiveSites.map(site => {
        return (
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
      />
      }
    </GoogleMapReact>
    </>
    }
    </>
  );
}