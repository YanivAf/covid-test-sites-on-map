import { useState, useEffect } from "react";
import { SnackbarProvider } from 'notistack'
import Context from "./components/context";

export const initialLocation = {
  address: 'Kikar Hamedina',
  lat: 32.086920,
  lng: 34.788670,
}

export default function ContextWrapper({ children }) {
  const [allSites, setAllSites] = useState([]);
  const [sitesToInclude, setSitesToInclude] = useState({
    sTypeToInclude: ['Walk in', 'Drive in', 'Both'],
    sTestTypeToInclude: ['PCR', 'Antigen', 'Both']
  }); 
  const [filteredActiveSites, setFilteredActiveSites] = useState([]);
  const [tempMarker, setTempMarker] = useState({ show: false, lat: null, lng: null });
  const [currentZoom, setCurrentZoom] = useState(7);
  const [currentCenter, setCurrentCenter] = useState({ lat: initialLocation.lat, lng: initialLocation.lng });
  const [firstLoad, setFirstLoad] = useState(true);
  const [markerToHighlight, setMarkerToHighlight] = useState(null);
  const [listItemToHighlight, setListItemToHighlight] = useState(null);
  const [markerAnchorEl, setMarkerAnchorEl] = useState(null);
  const [mapVisibleBounds, setMapVisibleBounds] = useState({
    ne: {lat: null, lng: null},
    sw: {lat: null, lng: null}
  });

  const getSites = async () => {
    const data = await JSON.parse(localStorage.getItem('allSites'));
    if (data) {
      setAllSites(data);
      if (data.length > 0) {
        const activeSites = data.filter(site => !site.archived);
        setFilteredActiveSites(activeSites);
        calculateBounds(activeSites);
      }
    }
  }

  const calculateBounds = (activeSites) => {
    if (activeSites.length > 0) {
      const northenmostSite = activeSites.reduce((acc, curr) => curr.lat > acc.lat ? curr : acc);
      const easternmostSite = activeSites.reduce((acc, curr) => curr.lng > acc.lng ? curr : acc);
      const southernmostSite = activeSites.reduce((acc, curr) => curr.lat < acc.lat ? curr : acc);
      const westernmostSite = activeSites.reduce((acc, curr) => curr.lng < acc.lng ? curr : acc);
      const calculatedBounds = {
        ne: {
          lat: northenmostSite.lat,
          lng: easternmostSite.lng
        },
        sw: {
          lat: southernmostSite.lat,
          lng: westernmostSite.lng
        }
      };
      setMapVisibleBounds(calculatedBounds);
    }
  }

  useEffect(() => {
    getSites();
  }, []);
  
  return (
    <Context.Provider
      value={{
        allSites,
        setAllSites,
        sitesToInclude,
        setSitesToInclude,
        filteredActiveSites,
        setFilteredActiveSites,
        tempMarker,
        setTempMarker,
        currentZoom,
        setCurrentZoom,
        currentCenter,
        setCurrentCenter,
        firstLoad,
        setFirstLoad,
        markerToHighlight,
        setMarkerToHighlight,
        listItemToHighlight,
        setListItemToHighlight,
        markerAnchorEl,
        setMarkerAnchorEl,
        mapVisibleBounds,
        setMapVisibleBounds
      }}
    >
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        {children}
      </SnackbarProvider>
    </Context.Provider>
  );
}