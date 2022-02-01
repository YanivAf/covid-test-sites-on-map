import { useState, useEffect, useContext } from 'react';
import Context from './context';

import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function FilterForm() {
  const { allSites, sitesToInclude, setSitesToInclude, setFilteredActiveSites } = useContext(Context);
  const [filters, setFilters] = useState({
    walkIn: true,
    driveIn: true,
    pcr: true,
    antigen: true
  });

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  const { walkIn, driveIn, pcr, antigen } = filters;

  useEffect(() => {
    let sTypeToInclude = ['Walk in', 'Drive in', 'Both'];
    if (!walkIn) sTypeToInclude = ['Drive in'];
    else if (!driveIn) sTypeToInclude = ['Walk in'];

    let sTestTypeToInclude = ['PCR', 'Antigen', 'Both'];
    if (!pcr) sTestTypeToInclude = ['Antigen'];
    else if (!antigen) sTestTypeToInclude = ['PCR'];
    setSitesToInclude({ sTypeToInclude, sTestTypeToInclude });

    const filteredActiveSites = allSites.filter(site => (
      !site.archived &&
      sTypeToInclude.includes(site.sType) &&
      sTestTypeToInclude.includes(site.sTestType)
    ));
    setFilteredActiveSites(filteredActiveSites);
  }, [filters]);


  return (
    <FormControl
    sx={{ m: 3 }}
    component="fieldset"
    variant="standard">
      <FormGroup sx={{ flexDirection: 'row' }}>
        <FormControlLabel
          control={
            <Checkbox checked={walkIn} onChange={handleChange} name="walkIn" disabled={!driveIn} />
          }
          label="Walk in"
        />
        <FormControlLabel
          control={
            <Checkbox checked={driveIn} onChange={handleChange} name="driveIn" disabled={!walkIn} />
          }
          label="Drive in"
        />
      </FormGroup>
      <FormGroup sx={{ flexDirection: 'row' }}>
        <FormControlLabel
          control={
            <Checkbox checked={pcr} onChange={handleChange} name="pcr" disabled={!antigen} />
          }
          label="PCR"
        />
        <FormControlLabel
          control={
            <Checkbox checked={antigen} onChange={handleChange} name="antigen" disabled={!pcr} />
          }
          label="Antigen"
        />
      </FormGroup>
    </FormControl>
  );
}