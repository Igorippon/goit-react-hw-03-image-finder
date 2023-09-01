import { Component } from "react";
import { GlobalStyle } from "./GlobalStyle";
import { Layuot } from "./Layout";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { serviceSearch } from "api";
import { Button } from "./Button/Button.js";
import { Loader } from "./Loader/Loader";

export class App extends Component {
  state = {
    page: 1,
    search: '',
    images: [],
    total: 0,
    loading: false,
    error: false
  };

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

  handleSubmit = async (evt) => {
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
    }
    evt.target.reset();
  }

  handleClickLoad = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  };

  // handleClickImage = (id) => {
  //   this.state.images.map(image => image.id === id)
  // }

  render() {
    const { images, page, total, loading } = this.state;

    return (
      <Layuot>
        <Searchbar onSubmit={this.handleSubmit}
          onChange={this.handleChange} />
        <ImageGallery>
          {images.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem key={id}
              webformatURL={webformatURL}
              tags={tags}

            />
          ))}
        </ImageGallery>
        {loading && <Loader />}
        {images.length !== 0 && page < total / 12 && <Button onClick={this.handleClickLoad} />}
        <GlobalStyle />
      </Layuot>
    );
  }
};
