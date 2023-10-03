import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";

interface ConfirmationDialogProps {
  id?: string;
  model: string;
  open: boolean;
  onClose: () => void
  onDelete: (id?: string) => void;
}

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const { id, model, open, onClose, onDelete } = props;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography my={1} variant="h6" fontWeight="bold">
          Delete {model} Confirmation
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography>
          Are you sure you want to permanently delete this {model.toLowerCase()}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => onDelete(id)}>
          Yes
        </Button>
        <Button variant="contained" onClick={onClose}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmationDialog;
