import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import imgAPI from 'api/Requests';

export default class App extends Component {
  state = {
    request: '',
    pictures: [],
    page: 1,
    perPage: 12,
    isLoading: false,
    totalHits: 0,
    showModal: false,
    largeImageURL: null,
  };

  hendleFormSubmit = request => {
    if (request === this.state.request) {
      return;
    }
    this.setState({ request, page: 1 });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(_, prevState) {
    const { request, page, perPage } = this.state;
    if (
      prevState.request !== this.state.request ||
      prevState.page !== this.state.page
    ) {
      imgAPI.fetchData(request, page, perPage).then(pictures => {
        if (prevState.request !== this.state.request) {
          this.setState({
            pictures: [...pictures.hits],
            totalHits: pictures.totalHits,
          });
          return;
        }
        this.setState({
          pictures: [...prevState.pictures, ...pictures.hits],
        });
      });
    }
  }

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: largeImageURL,
    }));
  };

  render() {
    const { pictures, isLoading, totalHits, showModal, largeImageURL } =
      this.state;
    const length = pictures.length !== 0;
    const maxLength = pictures.length !== totalHits;

    return (
      <>
        <Searchbar onSubmit={this.hendleFormSubmit} />
        <ImageGallery pictures={pictures} toggleModal={this.toggleModal} />
        {isLoading && <Loader />}
        {!isLoading && length && maxLength && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.toggleModal} />
        )}
        <ToastContainer theme="colored" position="top-right" autoClose={1500} />
      </>
    );
  }
}
