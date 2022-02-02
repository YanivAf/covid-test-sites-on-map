import { useContext } from 'react';
import Context from './context';

import List from '@mui/material/List';

import SiteListItem from './siteListItem';

export default function SitesList() {
  const { loading, filteredActiveSites } = useContext(Context);

  return (
    <List
      sx={{
          height: '70vh',
          overflowY: 'auto'
      }}
    >
      {!loading &&
      filteredActiveSites.map((site) => {
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
