import { Component } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from "./GlobalStyle";
import { Layuot } from "./Layout";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { serviceSearch } from "api";
import { Button } from "./Button/Button.js";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";



export class App extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    image: {},
    total: 0,
    loader: false,
    modal: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handlerKeyDownModal);
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { page, query, total } = this.state;
    const index = query.indexOf("/");
    const queryIndex = query.slice(index + 1, query.length);
    if (prevState.page !== page || prevState.query !== query) {
      try {
        this.setState({ loader: true });
        const { hits, totalHits } = await serviceSearch(queryIndex, page);
        if (totalHits === 0) {
          toast.error('Nothing found for your request');
          return;
        };
        if (prevState.total !== total) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        };
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          total: totalHits,
        }));
      } catch (error) {
        toast.error('Oops... something went wrong, please reload the page!');
      } finally {
        this.setState({ loader: false });
      };

    };
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerKeyDownModal);
  };

  handlerSubmit = async (evt) => {
    evt.preventDefault();
    const { search } = evt.currentTarget;
    const searchValue = search.value.trim();
    if (searchValue === '') {
      toast.error('Please enter search words');
      return;
    }

    this.setState({ query: `${Date.now()}/${searchValue}`, page: 1, images: [], total: 0 })
    evt.target.reset();
  };

  handlerClickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handlerClickImage = (id) => {

    const image = this.state.images.find(image => image.id === id);
    this.setState({ image: image, modal: true });
  };

  handlerClickModal = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.setState({ modal: false });
    };
  };

  handlerKeyDownModal = (evt) => {
    if (evt.code === "Escape") {
      this.setState({ modal: false });
    };
  };

  render() {
    const { images, image, page, total, loader, modal } = this.state;

    return (
      <Layuot >
        <Searchbar onSubmit={this.handlerSubmit} />
        <ImageGallery>
          {images.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem key={id}
              webformatURL={webformatURL}
              tags={tags}
              onClick={this.handlerClickImage}
              id={id}
            />
          ))}
        </ImageGallery>
        {loader && <Loader />}
        {images.length !== 0 && page < Math.ceil(total / 12) && <Button onClick={this.handlerClickLoadMore} />}
        {modal && <Modal
          largeImageURL={image.largeImageURL}
          tags={image.tags}
          onClick={this.handlerClickModal}
        />}
        <GlobalStyle />
        <Toaster />
      </Layuot>
    );
  };
};
