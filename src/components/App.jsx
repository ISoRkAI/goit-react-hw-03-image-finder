import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { ToastContainer } from 'react-toastify';
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
    if (
      prevState.request !== this.state.request ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      const KAY = '30063209-f9a5f01cd42377ca093fcf5d5';
      fetch(
        `https://pixabay.com/api/?q=${this.state.request}&page=${this.state.page}&key=${KAY}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`
      )
        .then(res => res.json())
        .then(pictures => {
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
        })
        .finally(() => this.setState({ isLoading: false }));
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
