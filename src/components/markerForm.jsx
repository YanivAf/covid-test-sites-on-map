import { useState, useEffect } from 'react';

export default function MarkerForm({allSites, setAllSites}) {
  const addMarker = async (lat, lng) => { // when form is submitted
    const updatedAllSites = [...allSites];
    updatedAllSites.push({
      sTitle: `Site${allSites.length + 1}`,
      sId: Math.round(Math.random() * 10000),
      lat,
      lng,
      sDetails: 'some info...',
      sTestType: 'Both',
      sType: 'Drive in',
      createdAt: new Date(),
      updatedAt: new Date(),
      archived: false
    });
    setAllSites(updatedAllSites);
    localStorage.setItem('allSites', JSON.stringify(updatedAllSites));
  }

  useEffect(() => {
  }, []);

  return (
    <></>
  );
}