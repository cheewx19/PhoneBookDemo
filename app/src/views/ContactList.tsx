import {
  Box,
  Button,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { Contact, deleteContact, listContacts } from "../db/repos/contact";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Column } from "../interfaces/table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SearchIcon from '@mui/icons-material/Search';
import ContactFormDialog from "./Forms/ContactFormDialog";
import ConfirmationDialog from "./Forms/ConfirmationDialog";

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>();
  const [selectedContact, setSelectedContact] = useState<Contact>();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openDeleteForm, setOpenDeleteForm] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getContacts = async (search?: string) => {
    setSelectedContact(undefined)
    const res = await listContacts(search);
    if (res.success) {
      return setContacts(res.value);
    }
    return toast.error(res.error);
  };

  useEffect(() => {
    getContacts();
  }, []);

  const headers: readonly Column[] = [
    { label: "Name", align: "left", minWidth: 170 },
    { label: "Phone Number", align: "left", minWidth: 170 },
    { label: "Address", align: "left", minWidth: 250 },
    { label: "Actions", align: "center" },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (contact: Contact) => {
    setOpenForm(true)
    setSelectedContact(contact)
  }

  const handleDelete = (contact: Contact) => {
    setOpenDeleteForm(true)
    setSelectedContact(contact)
  }
  
  const onClose = () => {
    setSelectedContact(undefined)
    setOpenDeleteForm(false)
    setOpenForm(false)
  }

  const onDelete = async (id?: string) => {
    if (!id) return toast.error("Invalid Contact!")
    const res = await deleteContact(id)
    if (res.success) {
      toast.success("Successfully deleted this Contact!")
      getContacts()
      return onClose()
    }
    return toast.error(res.error)
  } 

  return (
    <Box>
      <ContactFormDialog contact={selectedContact} open={openForm} onClose={onClose} refetch={getContacts} />
      <ConfirmationDialog id={selectedContact?.id} model="Contact" open={openDeleteForm} onClose={onClose} onDelete={onDelete} />
      <Box mb={3} display="flex" justifyContent="space-between">
        <TextField
          name="search"
          sx={{ width: "30%"}}
          variant="outlined"
          placeholder="Search for FULL Name or Phone Number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end" sx={{ mr: 2 }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => getContacts(e.target.value)}
        />
        <Button variant="contained" onClick={() => setOpenForm(true)}>
          Add Contact
        </Button>
      </Box>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell
                  sx={{ backgroundColor: "#EBEDEF" }}
                  key={index}
                  align={header.align}
                  style={{ minWidth: header.minWidth }}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: Contact) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell key={1}>{row.name}</TableCell>
                    <TableCell key={2}>{row.phoneNumber}</TableCell>
                    <TableCell key={3}>
                      {`${row.street} ${row.country}, ${row.city} ${row.zipCode}`}
                    </TableCell>
                    <TableCell key={4}>
                      <Stack
                        direction="row"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Button onClick={() => handleEdit(row)}>
                          <EditIcon color="action" />
                        </Button>
                        <Button color="error" onClick={() => handleDelete(row)}>
                          <DeleteForeverIcon />
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={contacts?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
export default ContactList;
