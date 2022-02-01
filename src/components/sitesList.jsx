import { useContext } from 'react';
import Context from './context';

import List from '@mui/material/List';

import SiteListItem from './siteListItem';

export default function SitesList() {
  const { filteredActiveSites } = useContext(Context);

  return (
    <List
      sx={{
          height: '70vh',
          overflowY: 'auto'
      }}
    >
      {filteredActiveSites.map((site) => {
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
