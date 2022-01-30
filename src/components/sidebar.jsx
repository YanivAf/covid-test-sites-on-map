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
  const { allSites, mapVisibleBounds } = useContext(Context);
  const allActiveSites = allSites.filter(site => site.archived === false);
  const allVisibleSites = allActiveSites.filter(site => (
    (site.lat > mapVisibleBounds.sw.lat) &&
    (site.lat < mapVisibleBounds.ne.lat) &&
    (site.lng > mapVisibleBounds.sw.lng) &&
    (site.lng < mapVisibleBounds.ne.lng)
  ));
  
  const getCounts = (sitesArray) => {
    const bothSiteTypesCount = sitesArray.filter(site => site.sType === 'Both').length;
    const walkInSitesCount = sitesArray.filter(site => site.sType === 'Walk in').length;
    const driveInSitesCount = sitesArray.filter(site => site.sType === 'Drive in').length;
    const bothTestTypesCount = sitesArray.filter(site => site.sTestType === 'Both').length;
    const pcrTypeCount = sitesArray.filter(site => site.sTestType === 'PCR').length;
    const antigenTypeCount = sitesArray.filter(site => site.sTestType === 'Antigen').length;

    return {
      bothSiteTypesCount,
      walkInSitesCount,
      driveInSitesCount,
      bothTestTypesCount,
      pcrTypeCount,
      antigenTypeCount
    }
  }

  const allActiveSitesCounts = getCounts(allActiveSites);
  const allVisibleSitesCounts = getCounts(allVisibleSites);

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
          <ListItemText
            secondary={
              <span style={{display: 'flex', justifyContent: 'space-between', fontSize: 12}}>
                <span>{`Walk-in: ${allVisibleSitesCounts.walkInSitesCount + allVisibleSitesCounts.bothSiteTypesCount} (of ${allActiveSitesCounts.walkInSitesCount + allActiveSitesCounts.bothSiteTypesCount})`}</span>
                <span>{`Drive-in: ${allVisibleSitesCounts.driveInSitesCount + allVisibleSitesCounts.bothSiteTypesCount} (of ${allActiveSitesCounts.driveInSitesCount + allActiveSitesCounts.bothSiteTypesCount})`}</span>
                <span>{`Total: ${allVisibleSites.length} (of ${allActiveSites.length})`}</span>
              </span>} />
          </ListItem>
        <ListItem>
          <ListItemText
            secondary={
              <span style={{display: 'flex', justifyContent: 'space-between', fontSize: 12}}>
                <span>{`PCR: ${allActiveSitesCounts.pcrTypeCount + allActiveSitesCounts.bothTestTypesCount} (of ${allActiveSitesCounts.pcrTypeCount + allActiveSitesCounts.bothTestTypesCount})`}</span>
                <span>{`Antigen: ${allActiveSitesCounts.antigenTypeCount + allActiveSitesCounts.bothTestTypesCount} (of ${allActiveSitesCounts.antigenTypeCount + allActiveSitesCounts.bothTestTypesCount})`}</span>
                <span>{`Total: ${allVisibleSites.length} (of ${allActiveSites.length})`}</span>
              </span>} />
        </ListItem>
      </List>
      </> :
      <Typography variant='body1' align='center'>There are currently no registered test sites. Click anywhere on the map to create a new test site</Typography>
      }
    </Drawer>
  );
}
