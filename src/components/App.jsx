import React, { useState, useEffect } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { nanoid } from 'nanoid';
import {Filter} from './Filter/Filter';
import {ContactList} from './ContactList/ContactList';
import { Container, Title, SubTitle } from './App.styled';

export const App = () => {
  const getLocalContact = () =>{
    return JSON.parse(localStorage.getItem('contacts'));
  }

  const [contacts, setContacts] = useState(getLocalContact ?? []);
  const [filter, setfilter] = useState('');


useEffect(() => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}, [contacts])


  const handleAddContact = (name, number, ) => {
    const contact = {
      name,
      number,
      id: nanoid(),
    }

    const nameInArray = contacts.map(contact => (
      contact.name))
    if (nameInArray.includes(contact.name)) {
      alert(`${contact.name} is already in contacts `)
    } else {
      setContacts(prevState => [...prevState, contact])
    }
  }

  const handleDeleteContact = uniqueId => {
    setContacts(prevState => (prevState.filter(contact => contact.id !== uniqueId)))
  };

  const handelFilterContact = event => {
    setfilter(event.target.value);
  }

  const filterContacts = () => {
    return contacts.filter(contact =>contact.name.toLowerCase().includes(filter.toLowerCase()));
  }

    return(
      <Container>
        <Title>Phonebook</Title>
        <ContactForm contacts={contacts} onAddContact={handleAddContact}/>
        <SubTitle>Contacts</SubTitle>
        <Filter value={filter} onChange={handelFilterContact}/>
        <ContactList contacts={filterContacts()} onDeleteContact={handleDeleteContact}/> 
      </Container>
    )
  };
