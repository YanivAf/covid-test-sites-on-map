import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import DriveEtaIcon from '@mui/icons-material/DriveEta';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

export default function SiteListItem({ site }) {

  return (
    <ListItem button key={site.sTitle}>
      <ListItemIcon title={site.sType} sx={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
        {site.sType === 'Both' ? <AllInclusiveIcon /> : site.sType === 'Walk in' ? <DirectionsWalkIcon /> : <DriveEtaIcon />}
        <Typography variant="caption">{site.sType}</Typography>
      </ListItemIcon>
      <ListItemText primary={site.sTitle} secondary={
      <span>
        {`${site.sTestType} tests`}
        <br/>
        {`updated: ${new Date(site.updatedAt).toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' })}`}
      </span>} />
    </ListItem>
  );
}
