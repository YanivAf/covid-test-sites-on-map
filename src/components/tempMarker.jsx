import { useContext } from 'react';
import Context from './context';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import SiteForm from './siteForm';

export default function TempMarker() {
  const { tempMarker, setTempMarker } = useContext(Context);

  return (
    <>
    <LocationOnIcon />
    <Card sx={{ minWidth: 300, position: 'absolute', transform: "translate(10%, -50%)" }}>
      <CardHeader
        action={
          <IconButton aria-label='close-temp-marker' id='close-temp-marker' onClick={() => setTempMarker({ ...tempMarker, show: false })}>
            <CloseIcon />
          </IconButton>
        }
        title="Add new Test Site"
      />
      <CardContent>
        <SiteForm />
      </CardContent>
    </Card>
    </>
  );
}
