import { Component } from "react";
import { GlobalStyle } from "./GlobalStyle";
import { Layuot } from "./Layout";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
// import { nanoid } from 'nanoid';
// import { Filter } from "./Filter/Filter";
// import { ContactForm } from "./ContactForm/ContactForm.js";
// import { ContactList } from "./ContactList/ContactList.js";

export class App extends Component {
  state = {
    // contacts: [
    //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    // ],
    // filter: '',
  };

  // componentDidMount() {
  //   const savedContacts = localStorage.getItem("contacts");
  //   if (savedContacts !== null) {
  //     this.setState({
  //       contacts: JSON.parse(savedContacts)
  //     })
  //   }
  // };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.cotacts !== this.state.contacts) {
  //     localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
  //   }
  // };

  // addContact = newContact => {
  //   const contactName = this.state.contacts.some(contact => contact.name.toLowerCase() === newContact.name.toLowerCase());
  //   if (contactName) {
  //     alert(`${newContact.name} is already contacts.`)
  //     return
  //   }
  //   this.setState(prevState => ({
  //     contacts: [{ id: nanoid(), ...newContact }, ...prevState.contacts],
  //   })
  //   );
  // };

  // deleteContact = contactId => {
  //   this.setState(prevState => ({
  //     contacts: prevState.contacts.filter(contact => contact.id !== contactId),
  //   }))
  // };

  // handleChange = evt => {
  //   const { name, value } = evt.currentTarget
  //   this.setState({ [name]: value })
  // };

  // getVisibilContact = () => {
  //   const { contacts, filter } = this.state;
  //   const normolizedFilter = filter.toLowerCase();
  //   return contacts.filter(contact => contact.name.toLowerCase().includes(normolizedFilter));
  // };

  render() {
    // const { filter } = this.state;
    // const visibilContact = this.getVisibilContact();

    return (
      <Layuot>
        <Searchbar />
        <ImageGallery>
          <ImageGalleryItem />
        </ImageGallery>
        <GlobalStyle />
      </Layuot>
    );
  }
};
