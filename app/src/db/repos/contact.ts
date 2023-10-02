// import db config
import db from "..";
import { collection, addDoc, getDocs } from "firebase/firestore";

// collection name
const COLLECTION_NAME = "Contacts";

export type Contact = {
  id: string;
  city: string;
  country: string;
  street: string;
  zipCode: string;
  name: string;
  phoneNumber: string;
};

export const createContact = async (contact: Contact): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    city: contact.city,
    country: contact.country,
    street: contact.street,
    zipCode: contact.zipCode,
    name: contact.name,
    phoneNumber: contact.zipCode,
  });

  return docRef.id;
};

export const listContacts = async (): Promise<Contact[]> => {
  let list: Contact[] = [];
  await getDocs(collection(db, COLLECTION_NAME)).then((querySnapshot) => {
    const newData = querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        } as Contact)
    );
    list = newData;
  });
  return list;
};
