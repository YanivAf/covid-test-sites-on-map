import { useState } from 'react';

import DriveEtaIcon from '@mui/icons-material/DriveEta';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';

import SiteForm from './siteForm';

export default function SiteMarker({ site }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'edit-site' : undefined;

  return (
    <>
    <IconButton aria-describedby={id} onClick={handleClick}>
      {site.sType === 'Both' ? <AllInclusiveIcon /> : site.sType === 'Walk in' ? <DirectionsWalkIcon /> : <DriveEtaIcon />}
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
    </>
  );
}
