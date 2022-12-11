import { useEffect, useRef, useState } from 'react';

function SearchForm({ onSearchMovie, onSortMovies, errorsText }) {
  const [isSortMovies, setIsSortMovies] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const movieNameRef = useRef();

  const onCheckboxChecked = (checked) => {
    setIsSortMovies(checked);
    onSortMovies(!isSortMovies);
  };

  const onChangeCheckbox = (e) => {
    onCheckboxChecked(!isChecked);
    setIsChecked(e.target.checked);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSearchMovie(movieNameRef.current.value);
  };

  useEffect(() => {
    movieNameRef.current.value = '';
  }, []);

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__input-container">
        <label className="search-form__item">
          <input ref={movieNameRef} className="search-form__input" type="text" placeholder="Фильм" required />
          <button type="submit" className="search-form__submit-button"></button>
        </label>
        <div className="search-form__toggle">
          <label className="search-form__tumbler-container">
            <input type="checkbox" className="search-form__checkbox" onChange={(e) => onChangeCheckbox(e)} />
            <span className="search-form__checkbox-switch"></span>
          </label>
          <p className="search-form__checkbox-text">Короткометражки</p>
          <p className={`search-form__checkbox-text-error ${errorsText.sortError.length > 0 && isChecked ? 'search-form__checkbox-text-error_status_visible' : ''}`}>{errorsText.sortError}</p>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
