import { Box, Button } from '@mui/material';
import { Contact, listContacts } from '../db/repos/contact';
import { useEffect, useState } from 'react';

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>();

  const getContacts = async () => {
    const res = await listContacts()
    setContacts(res)
  }

  useEffect(() => {
    getContacts()
  }, [])

  return (
    <Box>
      Hi this is to test stuff
      <Button>
        Click
      </Button>
    </Box>
  )
}
export default ContactList;
