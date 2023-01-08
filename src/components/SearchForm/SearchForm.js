import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SearchForm({
  onSearchMovie, onSortMovies, errorsText, setSearchSavedMovies,
}) {
  const [isSortMovies, setIsSortMovies] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState('');

  const { pathname } = useLocation();

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
    if (value === '') {
      setIsError(true);
    } else {
      setIsError(false);
      if (pathname !== '/saved-movies') {
        localStorage.removeItem('isSavedSearch');
        localStorage.setItem('searchText', JSON.stringify(value));
        onSearchMovie(value);
      } else {
        localStorage.setItem('isSavedSearch', JSON.stringify(value));
        onSearchMovie(value);
      }
    }
  };

  useEffect(() => {
    if (pathname !== '/saved-movies') {
      setSearchSavedMovies([]);
      setValue(JSON.parse(localStorage.getItem('searchText')));
      const getData = JSON.parse((localStorage.getItem('sortStatus')));
      if (getData === true) {
        onSortMovies(true);
        setIsChecked(true);
      }
    }
  }, [pathname]);

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__input-container">
        <label className="search-form__item">
          <input onChange={(e) => setValue(e.target.value)} value={value || ''} className="search-form__input" type="text" placeholder="Фильм" formNoValidate />
          <button type="submit" className="search-form__submit-button"></button>
        </label>
        {isError && <span className='form__input-error'>Нужно ввести ключевое слово</span>}
        <div className="search-form__toggle">
          <label className="search-form__tumbler-container">
            <input type="checkbox" className="search-form__checkbox" onChange={(e) => onChangeCheckbox(e)} checked={isChecked} />
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
