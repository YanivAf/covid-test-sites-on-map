import { useState, useContext } from 'react';
import Context from './context';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from '@mui/material/FormHelperText';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';

import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import SaveIcon from "@mui/icons-material/Save";

import ArchiveSiteConfirm from './archiveSiteConfirm';

export default function SiteForm({ existingSite, handleClosePopover }) {
  const { allSites, setAllSites, sitesToInclude, setFilteredActiveSites, tempMarker, setTempMarker } = useContext(Context);
  const [siteInputs, setSiteInputs] = useState(existingSite ?
    existingSite :
    {
      sTitle: '',
      sDetails: '',
      sTestType: '',
      sType: ''
  });
  const [readOnly, setReadOnly] = useState(tempMarker.show ? false : true);
  const [openArchiveConfirm, setOpenArchiveConfirm] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleSnackbar = (message, variant) => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 5000,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center',
      }
    });
  }

  const handleClickArchive = () => {
    setOpenArchiveConfirm(true);
  }

  const handleCloseArchiveConfirm = (isConfirmed) => {
    if (isConfirmed) {
      handleArchive();
      handleClosePopover();
    }
    setOpenArchiveConfirm(false);
  }

  const handleChange = (e) => {
    setSiteInputs({
      ...siteInputs,
      [e.target.name]: e.target.value
    });
  }

  const getExistingSiteIndex = (updatedAllSites) => {
    const siteToUpdateIndex = updatedAllSites.findIndex(site => (site.sId === existingSite.sId));
    if (siteToUpdateIndex === -1) handleSnackbar(`Issues finding to site. Please refresh`, "error");
    if (updatedAllSites[siteToUpdateIndex].archived) {
      handleSnackbar(`Action is not allowed for archived sites. Please refresh`, "error");
      return -1;
    }
    return siteToUpdateIndex;
  }

  const handleFilteredSites = (updatedAllSites) => {
    const filteredActiveSites = updatedAllSites.filter(site => (
      !site.archived &&
      sitesToInclude.sTypeToInclude.includes(site.sType) &&
      sitesToInclude.sTestTypeToInclude.includes(site.sTestType)
    ));
    setFilteredActiveSites(filteredActiveSites);
  }

  const handleSite = async (e, lat, lng) => {
    try {
      
    } catch (error) {
      
    }
    e.preventDefault();
    const updatedAllSites = [...allSites];
    if (!existingSite) {
      const titleDuplicate = updatedAllSites.filter(site => (site.sTitle === siteInputs.sTitle && site.archived === false));
      const locationDuplicate = updatedAllSites.filter(site => (site.lat === lat && site.lng === lng && site.archived === false));
      if (titleDuplicate.length > 0) return handleSnackbar(`Site title "${siteInputs.sTitle}" already exists. Please change and try again`, "error");
      if (locationDuplicate.length > 0) return handleSnackbar(`Site location already exists. Please change and try again`, "error");
      const newSite = {
        ...siteInputs,
        sId: uuidv4(),
        lat,
        lng,
        createdAt: new Date(),
        updatedAt: new Date(),
        archived: false
      };
      updatedAllSites.unshift(newSite);
      await axios.post(`${process.env.REACT_APP_API_DOMAIN}/`, newSite, { withCredentials: true });
    } else {
      const siteToUpdateIndex = getExistingSiteIndex(updatedAllSites);
      if (siteToUpdateIndex === -1) return;
      const updatedSite = {
        ...siteInputs,
        updatedAt: new Date(),
      }
      updatedAllSites[siteToUpdateIndex] = updatedAllSites[0];
      updatedAllSites[0] = updatedSite;
      await axios.put(`${process.env.REACT_APP_API_DOMAIN}/`, updatedSite, { withCredentials: true });
    }
    setAllSites(updatedAllSites);
    handleFilteredSites(updatedAllSites);
    handleSnackbar(`Test Site "${siteInputs.sTitle}" has been successfully saved`, "success");
    setTempMarker({ ...tempMarker, show: false });
  }

  const handleArchive = async () => {
    const updatedAllSites = [...allSites];
    const siteToUpdateIndex = getExistingSiteIndex(updatedAllSites);
    if (siteToUpdateIndex === -1) return;
    updatedAllSites[siteToUpdateIndex] = {
      ...siteInputs,
      updatedAt: new Date(),
      archived: true
    };
    setAllSites(updatedAllSites);
    const { data } = await axios.put(`${process.env.REACT_APP_API_DOMAIN}/archive`, updatedAllSites[siteToUpdateIndex], { withCredentials: true });
    handleFilteredSites(updatedAllSites);
    handleSnackbar(`Test Site "${siteInputs.sTitle}" has been successfully archived`, "success");
  }

  return (
    <form
      onSubmit={(e) => handleSite(e, tempMarker.lat, tempMarker.lng)}
      style={{ display: 'flex', flexDirection: 'column', rowGap: 5, padding: '10px' }}
    >
      <TextField
        label='Site Title'
        name='sTitle'
        helperText={"2-20 chars"}
        error={
          (siteInputs.sTitle !== '' &&
          (siteInputs.sTitle.length < 2 ||
          siteInputs.sTitle.length > 20))}
        inputProps={{
          minLength: 2,
          maxLength: 20
        }}
        value={siteInputs.sTitle}
        onChange={handleChange}
        InputProps={{ readOnly }}
        required
      />
      <TextField
        label='Site Details'
        name='sDetails'
        helperText={"20-200 chars"}
        error={
          (siteInputs.sDetails !== '' &&
          (siteInputs.sDetails.length < 20 ||
          siteInputs.sDetails.length > 200))}
        inputProps={{
          minLength: 20,
          maxLength: 200
        }}
        multiline
        value={siteInputs.sDetails}
        onChange={handleChange}
        InputProps={{ readOnly }}
        required
      />
      <FormControl required>
        <InputLabel id="tests-type-label">Tests Type</InputLabel>
        <Select
          label="Tests Type *"
          labelId="tests-type-label"
          value={siteInputs.sTestType}
          name="sTestType"
          onChange={handleChange}
          readOnly={readOnly}
        >
          <MenuItem value="PCR">PCR</MenuItem>
          <MenuItem value="Antigen">Antigen</MenuItem>
          <MenuItem value="Both">Both</MenuItem>
        </Select>
      </FormControl>
      <FormControl required>
        <InputLabel id="site-type-label">Site Type</InputLabel>
        <Select
          label="Site Type *"
          value={siteInputs.sType}
          name="sType"
          onChange={handleChange}
          readOnly={readOnly}
        >
          <MenuItem value="Walk in">Walk in</MenuItem>
          <MenuItem value="Drive in">Drive in</MenuItem>
          <MenuItem value="Both">Both</MenuItem>
        </Select>
      </FormControl>
      {existingSite &&
      <>
      <FormHelperText>Created: {new Date(existingSite.createdAt).toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' })}</FormHelperText>
      <FormHelperText>Updated: {new Date(existingSite.updatedAt).toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' })}</FormHelperText>
      </>
      }
      {(existingSite && readOnly) ?
      <div>
      <IconButton onClick={e => setReadOnly(false)}>
        <EditIcon color="primary" />
      </IconButton>
      <IconButton onClick={handleClickArchive} aria-controls="archive-confirm">
        <ArchiveIcon color="error" />
      </IconButton>
      <ArchiveSiteConfirm
        id="archive-confirm"
        // keepMounted
        open={openArchiveConfirm}
        onClose={handleCloseArchiveConfirm}
        sTitle={existingSite.sTitle}
      />
      </div>
      : <Button
        variant="outlined"
        color="success"
        startIcon={<SaveIcon />}
        type="submit"
        id="site-submit"
        onClick={handleClosePopover}
      >
        Save
      </Button>}
    </form>
  );
}