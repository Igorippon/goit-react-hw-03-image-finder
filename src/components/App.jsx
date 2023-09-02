import { Component } from "react";
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
    search: '',
    images: [],
    image: {},
    total: 0,
    loading: false,
    error: false,
    modal: false,

  };

  componentDidMount() {
    window.addEventListener('keydown', this.handlerKeyDownModal);
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { page, search } = this.state;
    if (prevState.page !== page) {
      try {
        this.setState({ loading: true, error: false });
        const { hits } = await serviceSearch(search, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }))
      } catch (error) {
        this.setState({ error: true });
      } finally {
        this.setState({ loading: false });
      }

    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlerKeyDownModal);
  };

  handlerSubmit = async (evt) => {
    evt.preventDefault();
    const { search } = evt.currentTarget;
    const searchValue = search.value.trim();
    try {
      this.setState({ loading: true, error: false });
      const { hits, totalHits } = await serviceSearch(searchValue, this.state.page = 1);
      this.setState({
        images: hits,
        search: searchValue,
        total: totalHits,
      })
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    };
    evt.target.reset();
  };

  handlerClickLoad = () => {
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
    const { images, image, page, total, loading, modal } = this.state;

    return (
      <Layuot >
        <Searchbar onSubmit={this.handlerSubmit}
          onChange={this.handleChange} />
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
        {loading && <Loader />}
        {images.length !== 0 && page < Math.ceil(total / 12) && <Button onClick={this.handlerClickLoad} />}
        {modal && <Modal
          largeImageURL={image.largeImageURL}
          tags={image.tags}
          onClick={this.handlerClickModal}
        />}
        <GlobalStyle />
      </Layuot>
    );
  };
};
