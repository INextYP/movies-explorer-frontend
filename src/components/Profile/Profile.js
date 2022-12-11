import { useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormValidation';

function Profile({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const {
    values, isValid, handleChange,
  } = useFormWithValidation({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onEditProfile({ name: values.name, email: values.email });
  };

  return (
    <section className="profile">
      <h3 className="profile__welcome-message">Привет, {currentUser.name}!</h3>
      <form className="form" onSubmit={handleSubmit}>
          <label className="form__label-profile">
            <p className="form__name">Имя</p>
            <input type='text' name='name' className="form__input" defaultValue={currentUser.name || values.name || ''} onChange={handleChange} placeholder="Имя" minLength="2"
                   maxLength="20" required />
          </label>
          <label className="form__label-profile">
            <p className="form__name">E-mail</p>
            <input type='email' name='email' className="form__input" defaultValue={currentUser.email || values.email || ''} onChange={handleChange} placeholder='E-mail' minLength="5"
                   maxLength="20" required/>
          </label>
      </form>
        <div className="profile__editing">
          <button type='submit' className={`profile__edit-button ${!isValid ? 'profile__edit-button_type_inactive' : ''}`} onClick={handleSubmit}>Редактировать</button>
          <button type='button' className="profile__exit-link" onClick={onSignOut}>Выйти из аккаунта</button>
        </div>
    </section>
  );
}

export default Profile;
