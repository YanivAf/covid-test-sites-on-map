import { useContext } from 'react';
import Context from './context';

import List from '@mui/material/List';

import SiteListItem from './siteListItem';

export default function SitesList() {
  const { allActiveSites } = useContext(Context);

  return (
    <List
      sx={{
          height: '70vh',
          overflowY: 'auto'
      }}
    >
      {allActiveSites.map((site) => {
        return (
          <SiteListItem
            key={site.sId}
            site={site}
          />
        )
      })}
    </List>
  );
}
