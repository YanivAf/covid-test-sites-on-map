import { useContext } from 'react';
import Context from './context';

import List from '@mui/material/List';

import SiteListItem from './siteListItem';

export default function SitesList() {
  const { allSites } = useContext(Context);

  return (
    <List
      sx={{
          height: '70vh',
          overflowY: 'auto'
      }}
    >
      {allSites.map((site) => {
        if (!site.archived) return (
          <SiteListItem
            key={site.sId}
            site={site}
          />
        )
      })}
    </List>
  );
}
