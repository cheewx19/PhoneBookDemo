import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Contact, listContacts } from "../db/repos/contact";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Column } from "../interfaces/table";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openDeleteForm, setOpenDeleteForm] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getContacts = async () => {
    const res = await listContacts();
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
    { label: "Actions", align: "center" }
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

  return (
    <Box>
      <Button onClick={() => setOpenForm(true)}>Add Contact</Button>
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
                console.log(row)
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell key={1}>{row.name}</TableCell>
                    <TableCell key={2}>{row.phoneNumber}</TableCell>
                    <TableCell key={3}>
                      {`${row.street} ${row.country}, ${row.city} ${row.zipCode}`}
                    </TableCell>
                    <TableCell key={4}>
                      <Stack direction="row" display="flex" justifyContent="center" alignItems="center">
                        <Button>
                          <EditIcon />
                        </Button>
                        <Button>
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
