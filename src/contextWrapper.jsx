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

  return (
    <Context.Provider
      value={{
        allSites,
        setAllSites,
        tempMarker,
        setTempMarker,
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