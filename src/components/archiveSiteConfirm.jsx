import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";

export default function ArchiveSiteConfirm({ onClose, open, sTitle }) {
  const handleCancel = () => {
    onClose(false);
  }

  const handleOk = () => {
    onClose(true);
  }

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>Arcive Test Site</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">Are you sure you would like to archive {sTitle}?</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          No
        </Button>
        <Button onClick={handleOk}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}