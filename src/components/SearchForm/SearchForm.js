function SearchForm() {
  return (
    <form className="search-form">
      <div className="search-form__input-container">
        <label className="search-form__item">
          <input className="search-form__input" type="text" placeholder="Фильм" required />
          <button type="submit" className="search-form__submit-button"></button>
        </label>
        <div className="search-form__toggle">
          <label className="search-form__tumbler-container">
            <input type="checkbox" className="search-form__checkbox" />
            <span className="search-form__checkbox-switch"></span>
          </label>
          <p className="search-form__checkbox-text">Короткометражки</p>
        </div>
      </div>

    </form>
  );
}

export default SearchForm;
