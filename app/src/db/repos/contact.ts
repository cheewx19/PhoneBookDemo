import db from ".."; // import db from db/index
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  doc,
  deleteDoc,
  where,
  query,
  or,
} from "firebase/firestore";
import { Response } from "../domain/response";
import { GetResponse } from "../domain/getResponse";

const COLLECTION_NAME = "Contacts";

export type Contact = {
  id?: string;
  city: string;
  country: string;
  street: string;
  zipCode: string;
  name: string;
  phoneNumber: string;
};

/**
 * Mao a contact object to database Contact
 * @param {Contact} contact
 * @returns {any}
 */
const mapContact = (contact: Contact) => {
  // formulate array of possible searches as Firebase does not support string.Contains() query
  const arr: string[] = [];
  let name = "";
  for (const char of contact.name.trim().toLowerCase()) {
    name += char;
    arr.push(name);
  }
  return {
    city: contact.city.trim(),
    country: contact.country,
    street: contact.street.trim(),
    zipCode: contact.zipCode.trim(),
    name: contact.name.trim(),
    phoneNumber: contact.zipCode.trim(),
    searchList: arr,
  };
};

/**
 * Creates a contact
 * @param {Contact} contact
 * @returns {Promise<Response>}
 */
export const createContact = async (contact: Contact): Promise<Response> => {
  try {
    const docRef = await addDoc(
      collection(db, COLLECTION_NAME),
      mapContact(contact)
    );
    return new Response();
  } catch (e) {
    return new Response(false, "Failed to create contact!");
  }
};

/**
 * Updates a contact
 * @param {Contact} contact
 * @returns {Promise<Response>}
 */
export const updateContact = async (
  id: string,
  contact: Contact
): Promise<Response> => {
  try {
    await updateDoc(doc(db, COLLECTION_NAME, id), mapContact(contact));
    return new Response();
  } catch (e) {
    return new Response(false, "Failed to update contact!");
  }
};

/**
 * Deletes a contact
 * @param {string} id
 * @returns {Promise<Response>}
 */
export const deleteContact = async (id: string): Promise<Response> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return new Response();
  } catch (e) {
    return new Response(false, "Failed to delete contact!");
  }
};

/**
 * List of Contacts
 * @param {string} search
 * @returns {Promise<GetResponse<Contact[]>>}
 */
export const listContacts = async (
  search?: string
): Promise<GetResponse<Contact[]>> => {
  try {
    let list: Contact[] = [];
    let newQuery = query(collection(db, COLLECTION_NAME));
    if (Boolean(search))
      newQuery = query(
        newQuery,
        or(where("searchList", "array-contains", search?.toLowerCase()))
      );
    await getDocs(newQuery).then((querySnapshot) => {
      const newData = querySnapshot.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          } as Contact)
      );
      list = newData;
    });
    return new GetResponse(list);
  } catch (e) {
    return new GetResponse([], false, "Failed to get contacts!");
  }
};
