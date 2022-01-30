import { useContext } from 'react';
import Context from './context';

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import SitesList from './sitesList';

export const drawerWidth = 300;

export default function Sidebar() {
  const { allSites } = useContext(Context);
  
  const bothSiteTypesCount = allSites.filter(site => site.sType === 'Both').length;
  const walkInSitesCount = allSites.filter(site => site.sType === 'Walk in').length;
  const driveInSitesCount = allSites.filter(site => site.sType === 'Drive in').length;
  const bothTestTypesCount = allSites.filter(site => site.sTestType === 'Both').length;
  const pcrTypeCount = allSites.filter(site => site.sTestType === 'PCR').length;
  const antigenTypeCount = allSites.filter(site => site.sTestType === 'Antigen').length;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx:{
          overflowY: 'hidden'
        }
      }}
    >
      <Toolbar
      sx={{
        height: '20vh',
      }}/>
      <Divider />
      {allSites.length > 0 ?
      <>
      <SitesList />
      <Divider />
      <List>
        <ListItem>
          <ListItemText secondary={<span style={{display: 'flex', justifyContent: 'space-between'}}><span>{`Walk-in: ${walkInSitesCount + bothSiteTypesCount}`}</span><span>{`Drive-in: ${driveInSitesCount + bothSiteTypesCount}`}</span><span>{`Total: ${allSites.length}`}</span></span>} />
          </ListItem>
        <ListItem>
          <ListItemText secondary={<span style={{display: 'flex', justifyContent: 'space-between'}}><span>{`PCR: ${pcrTypeCount + bothTestTypesCount}`}</span><span>{`Antigen: ${antigenTypeCount + bothTestTypesCount}`}</span><span>{`Total: ${allSites.length}`}</span></span>} />
        </ListItem>
      </List>
      </> :
      <Typography variant='body1' align='center'>There are currently no registered test sites. Click anywhere on the map to create a new test site</Typography>
      }
    </Drawer>
  );
}
