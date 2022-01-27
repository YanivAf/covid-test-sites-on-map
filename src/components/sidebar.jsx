import React from 'react';

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import DriveEtaIcon from '@mui/icons-material/DriveEta';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

export const drawerWidth = 300;

const allSites = JSON.parse(localStorage.getItem('allSites')) ?
JSON.parse(localStorage.getItem('allSites')) :
[];

const bothSiteTypesCount = allSites.filter(site => site.sType === 'Both').length;
const walkInSitesCount = allSites.filter(site => site.sType === 'Walk in').length;
const driveInSitesCount = allSites.filter(site => site.sType === 'Drive in').length;
const bothTestTypesCount = allSites.filter(site => site.sTestType === 'Both').length;
const pcrTypeCount = allSites.filter(site => site.sTestType === 'PCR').length;
const antigenTypeCount = allSites.filter(site => site.sTestType === 'Antigen').length;


export default function Sidebar() {
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
      <List
      sx={{
          height: '70vh',
          overflowY: 'auto'
      }}>
        {allSites.map((site) => (
          <ListItem button key={site.sTitle}>
            <ListItemIcon title={site.sType} sx={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
              {site.sType === 'Both' ? <AllInclusiveIcon /> : site.sType === 'Walk in' ? <DirectionsWalkIcon /> : <DriveEtaIcon />}
              <Typography variant="caption">{site.sType}</Typography>
            </ListItemIcon>
            <ListItemText primary={site.sTitle} secondary={
            <div>
              {`${site.sTestType} tests`}
              <br/>
              {`updated: ${site.updatedAt.toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' })}`}
            </div>} />
          </ListItem>
        ))}
      </List>
      {allSites.length > 0 &&
      <>
        <Divider />
        <List>
          <ListItem>
            <ListItemText secondary={`Walk-in: ${walkInSitesCount + bothSiteTypesCount} | Drive-in: ${driveInSitesCount + bothSiteTypesCount} | Total: ${allSites.length}`} />
            </ListItem>
          <ListItem>
            <ListItemText secondary={`PCR: ${pcrTypeCount + bothTestTypesCount} | Antigen: ${antigenTypeCount + bothTestTypesCount} | Total: ${allSites.length}`} />
          </ListItem>
        </List>
      </>
      }
    </Drawer>
  );
}
