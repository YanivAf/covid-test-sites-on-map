import { useState, useEffect, useContext, useRef } from 'react';
import Context from './context';

import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';

import DriveEtaIcon from '@mui/icons-material/DriveEta';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

import SiteForm from './siteForm';

export default function SiteMarker({ site }) {
  const { markerToHighlight, setListItemToHighlight, setMarkerAnchorEl } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);
  const elementRef = useRef();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'edit-site' : undefined;
  const markerStyle = {
    '&:hover': { fontSize: '50px' },
    ...(markerToHighlight === site.sId && { fontSize: '50px' })
  };

  useEffect(() => {
    if (markerToHighlight === site.sId) {
      setMarkerAnchorEl(elementRef.current);
    }
  }, [markerToHighlight]);
  
  return (
    <div style={{ position: "absolute", transform: "translate(-50%, -50%)" }}>
    <IconButton
      aria-describedby={id}
      onClick={handleClick}
      onMouseEnter={e => setListItemToHighlight(site.sId)}
      onMouseLeave={e => setListItemToHighlight(null)}
      ref={elementRef}
    >
      {site.sType === 'Both' ?
        <AllInclusiveIcon
          sx={markerStyle}
        /> :
        site.sType === 'Walk in' ?
          <DirectionsWalkIcon
            sx={markerStyle}
          /> :
          <DriveEtaIcon
            sx={markerStyle}
          />
      }
    </IconButton>
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
    >
      <SiteForm existingSite={site} handleClosePopover={handleClose} />
    </Popover>
    </div>
  );
}
