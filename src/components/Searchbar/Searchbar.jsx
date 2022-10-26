import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    request: '',
  };

  handleInputСhange = e => {
    this.setState({ request: e.currentTarget.value.toLowerCase() });
  };

  hendleSubmit = e => {
    e.preventDefault();
    if (this.state.request.trim() === '') {
      toast.error('please, specify your query!');
      return;
    }

    this.props.onSubmit(this.state.request);
    e.currentTarget.reset();
  };

  render() {
    return (
      <>
        <header className={css.searchbar}>
          <form className={css.searchForm} onSubmit={this.hendleSubmit}>
            <button type="submit" className={css.searchFormButton}>
              <span className={css.searchFormButtonLabel}>Search</span>
            </button>

            <input
              className={css.searchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleInputСhange}
            />
          </form>
        </header>
      </>
    );
  }
}
