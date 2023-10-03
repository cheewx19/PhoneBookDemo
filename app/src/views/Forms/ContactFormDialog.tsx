import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Contact } from "../../db/repos/contact";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface ContactFormDialogProps {
  contact?: Contact;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CONTACT_FORM_SCHEMA = yup
  .object({
    name: yup.string().required("Name is required."),
    phoneNumber: yup.string().required("Phone Number is required"),
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
    street: yup.string().required("Street is required"),
    zipCode: yup.string().required("ZipCode is required")
  })

const ContactFormDialog = (props: ContactFormDialogProps) => {
  const { contact, open, setOpen } = props;
  const defaultValues = {
    name: contact?.name,
    phoneNumber: contact?.phoneNumber,
    city: contact?.city,
    country: contact?.country,
    street: contact?.street,
    zipCode: contact?.zipCode
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>({
    defaultValues,
    resolver: yupResolver(CONTACT_FORM_SCHEMA),
  });
  const onSubmit = async (values: Contact) => {
    console.log(values)
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add Contact</DialogTitle>
      <DialogContent>
        <form>
          <TextField variant="outlined" {...register("name")} error={Boolean(errors.name)} helperText={errors.name?.message} />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit(onSubmit)}>{contact ? "Update" : "Add"}</Button>
      </DialogActions>
    </Dialog>
  );
};
export default ContactFormDialog;
