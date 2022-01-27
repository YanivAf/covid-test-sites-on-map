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

const sites = [
  {
  sTitle: 'Site1',
  lat: 32,
  lng: 35,
  sDetails: 'some info...',
  sTestType: 'PCR',
  sType: 'Walk in',
  createdAt: new Date(),
  updatedAt: new Date()
  },
  {
    sTitle: 'Site2',
    lat: 32,
    lng: 35,
    sDetails: 'some info...',
    sTestType: 'Both',
    sType: 'Both',
    createdAt: new Date(),
    updatedAt: new Date()
    },
  {
    sTitle: 'Site3',
    lat: 32,
    lng: 35,
    sDetails: 'some info...',
    sTestType: 'Antigen',
    sType: 'Walk in',
    createdAt: new Date(),
    updatedAt: new Date()
    },
  {
    sTitle: 'Site4',
    lat: 32,
    lng: 35,
    sDetails: 'some info...',
    sTestType: 'PCR',
    sType: 'Drive in',
    createdAt: new Date(),
    updatedAt: new Date()
    },
  {
    sTitle: 'Site5',
    lat: 32,
    lng: 35,
    sDetails: 'some info...',
    sTestType: 'PCR',
    sType: 'Walk in',
    createdAt: new Date(),
    updatedAt: new Date()
    },
  {
    sTitle: 'Site6',
    lat: 32,
    lng: 35,
    sDetails: 'some info...',
    sTestType: 'Antigen',
    sType: 'Both',
    createdAt: new Date(),
    updatedAt: new Date()
    },
  {
    sTitle: 'Site7',
    lat: 32,
    lng: 35,
    sDetails: 'some info...',
    sTestType: 'Both',
    sType: 'Drive in',
    createdAt: new Date(),
    updatedAt: new Date()
    },
  {
    sTitle: 'Site8',
    lat: 32,
    lng: 35,
    sDetails: 'some info...',
    sTestType: 'PCR',
    sType: 'Walk in',
    createdAt: new Date(),
    updatedAt: new Date()
    }
];
const bothSiteTypesCount = sites.filter(site => site.sType === 'Both').length;
const walkInSitesCount = sites.filter(site => site.sType === 'Walk in').length;
const driveInSitesCount = sites.filter(site => site.sType === 'Drive in').length;
const bothTestTypesCount = sites.filter(site => site.sTestType === 'Both').length;
const pcrTypeCount = sites.filter(site => site.sTestType === 'PCR').length;
const antigenTypeCount = sites.filter(site => site.sTestType === 'Antigen').length;


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
        {sites.map((site) => (
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
      {sites.length > 0 &&
      <>
        <Divider />
        <List>
          <ListItem>
            <ListItemText secondary={`Walk-in: ${walkInSitesCount + bothSiteTypesCount} | Drive-in: ${driveInSitesCount + bothSiteTypesCount} | Total: ${sites.length}`} />
            </ListItem>
          <ListItem>
            <ListItemText secondary={`PCR: ${pcrTypeCount + bothTestTypesCount} | Antigen: ${antigenTypeCount + bothTestTypesCount} | Total: ${sites.length}`} />
          </ListItem>
        </List>
      </>
      }
    </Drawer>
  );
}
