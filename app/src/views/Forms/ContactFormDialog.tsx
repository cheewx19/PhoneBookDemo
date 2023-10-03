import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Contact, createContact, updateContact } from "../../db/repos/contact";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import countryList from "react-select-country-list";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

interface ContactFormDialogProps {
  contact?: Contact;
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

const CONTACT_FORM_SCHEMA = yup.object({
  name: yup.string().required("Name is required."),
  phoneNumber: yup.string().required("Phone Number is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  street: yup.string().required("Street is required"),
  zipCode: yup.string().required("ZipCode is required"),
});

const ContactFormDialog = (props: ContactFormDialogProps) => {
  const { contact, open, onClose, refetch } = props;
  const countryOptions = useMemo(
    () =>
      countryList()
        .getData()
        .map((country) => country.label),
    []
  );
  const defaultValues = {
    name: contact?.name || '',
    phoneNumber: contact?.phoneNumber || '',
    city: contact?.city || '',
    country: contact?.country || '',
    street: contact?.street || '',
    zipCode: contact?.zipCode || '',
  };
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>({
    defaultValues,
    resolver: yupResolver(CONTACT_FORM_SCHEMA),
  });

  const onSubmit = async (values: Contact) => {
    if (!contact?.id) return toast.error("Invalid Contact!")
    const res = await (contact
      ? updateContact(contact.id, values)
      : createContact(values));
    if (res.success) {
      toast.success(`Contact ${contact ? "Updated" : "Added"} successfully!`);
      refetch();
      return onClose();
    }
    return toast.error(res.error);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [contact]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography my={1} variant="h6" fontWeight="bold">
          Contact Form
        </Typography>
        <Typography>Please fill in the details below.</Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Name*"
                variant="outlined"
                {...register("name")}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone Number*"
                variant="outlined"
                {...register("phoneNumber")}
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography my={1} variant="body1" fontWeight="bold">
                Home Address
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Country*"
                select
                variant="outlined"
                {...register("country")}
                defaultValue={defaultValues.country}
                error={Boolean(errors.country)}
                helperText={errors.country?.message}
              >
                {countryOptions.map((country, index) => (
                  <MenuItem key={index} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="City*"
                variant="outlined"
                {...register("city")}
                error={Boolean(errors.city)}
                helperText={errors.city?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Street*"
                variant="outlined"
                {...register("street")}
                error={Boolean(errors.street)}
                helperText={errors.street?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Zip Code*"
                variant="outlined"
                {...register("zipCode")}
                error={Boolean(errors.zipCode)}
                helperText={errors.zipCode?.message}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Box px={2} pb={1}>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            {contact ? "Update" : "Add"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
export default ContactFormDialog;
