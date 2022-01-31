import { useState } from "react";
import { SnackbarProvider } from 'notistack'
import Context from "./components/context";

export default function ContextWrapper({ children }) {
  const [allSites, setAllSites] = useState(
    JSON.parse(localStorage.getItem('allSites')) ?
    JSON.parse(localStorage.getItem('allSites')) :
    []
  );
  const [tempMarker, setTempMarker] = useState({ show: false, lat: null, lng: null });
  const [markerToHighlight, setMarkerToHighlight] = useState(null);
  const [listItemToHighlight, setListItemToHighlight] = useState(null);
  const [mapVisibleBounds, setMapVisibleBounds] = useState({ ne: {lat: null, lng: null}, nw: {lat: null, lng: null}, se: {lat: null, lng: null}, sw:{lat: null, lng: null} });

  return (
    <Context.Provider
      value={{
        allSites,
        setAllSites,
        tempMarker,
        setTempMarker,
        markerToHighlight,
        setMarkerToHighlight,
        listItemToHighlight,
        setListItemToHighlight,
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