import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function FormPage({
  name, isValid, title, children, buttonText, question, path, link, handleSubmit,
}) {
  const buttonStyleStatus = `form__submit-button form__submit-button_place_auth ${!isValid ? 'form__submit-button_type_inactive' : ''}`;

  return (
    <section className="section-form">
      <Link to="/" className="section-form__link">
        <img className='section-form__logo' src={logo} alt="Логотип"></img>
      </Link>
    <form className='form__auth' name={`${name}`} onSubmit={handleSubmit}>
      <h2 className='form__head'>{title}</h2>
      <fieldset className='form__input-container'>
        {children}
        <button type="submit" className={buttonStyleStatus}>{buttonText}</button>
      </fieldset>
    </form>
      <div className="form__question-container">
        <p className='form__question'>
          {question}
          <Link to={path} className='form__link'>
            {link}
          </Link>
        </p>
      </div>
    </section>
  );
}

export default FormPage;
