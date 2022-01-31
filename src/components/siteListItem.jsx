import { useContext, useRef } from 'react';
import Context from './context';
import useOnScreen from '../hooks/useOnScreen.hook';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import DriveEtaIcon from '@mui/icons-material/DriveEta';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

export default function SiteListItem({ site }) {
  const { mapVisibleBounds, listItemToHighlight, setMarkerToHighlight } = useContext(Context);
  const elementRef = useRef();
  const isListItemVisible = useOnScreen(elementRef);

  const isMarkerVisible = (
    (site.lat > mapVisibleBounds.sw.lat) &&
    (site.lat < mapVisibleBounds.ne.lat) &&
    (site.lng > mapVisibleBounds.sw.lng) &&
    (site.lng < mapVisibleBounds.ne.lng)
  );

  return (
    <ListItem
      button
      key={site.sTitle}
      onMouseEnter={e => {if (isMarkerVisible) setMarkerToHighlight(site.sId)}}
      onMouseLeave={e => setMarkerToHighlight(null)}
      sx={{
        '&:hover': { backgroundColor: '#AADAFF' },
        ...(((listItemToHighlight === site.sId) && (isListItemVisible)) && { backgroundColor: '#AADAFF' })
      }}
      ref={elementRef}
    >
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
