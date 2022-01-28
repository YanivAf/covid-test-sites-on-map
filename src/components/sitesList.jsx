import React from 'react';

import List from '@mui/material/List';

import SiteListItem from './siteListItem';

export default function SitesList({ allSites }) {

  return (
    <List
    sx={{
        height: '70vh',
        overflowY: 'auto'
    }}>
      {allSites.map((site) => <SiteListItem key={site.sTitle} site={site} />)}
    </List>
  );
}
