import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormValidation';

function Profile({
  onEditProfile, onSignOut, successMessage, errorMessage,
}) {
  const currentUser = useContext(CurrentUserContext);

  const {
    values, isValid, handleChange, resetForm, errors,
  } = useFormWithValidation({});

  useEffect(() => {
    if (currentUser.name === values.name || currentUser.email === values.email) {
      resetForm();
    }
  }, [currentUser.email, currentUser.name, onEditProfile, resetForm, values.email, values.name]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (currentUser.name !== values.name || currentUser.email !== values.email) {
      onEditProfile({ name: values.name, email: values.email });
      resetForm();
    }
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
            <input type='email'
                   name='email'
                   className="form__input"
                   defaultValue={currentUser.email || values.email || ''}
                   onChange={handleChange}
                   placeholder='E-mail'
                   pattern='^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.+[a-zA-Z]{2,}$'
                   required />
          </label>
        <span className='form__input-error'>{errors.email}</span>
      </form>
        <div className="profile__editing">
          <span>
            {successMessage.updateUserMessage.length > 0 && successMessage.updateUserMessage}
            {errorMessage.updateUserError.length > 0 && errorMessage.updateUserError} </span>
          <button type='submit' className={`profile__edit-button ${!isValid ? 'profile__edit-button_type_inactive' : ''}`} onClick={handleSubmit}>Редактировать</button>
          <button type='button' className="profile__exit-link" onClick={onSignOut}>Выйти из аккаунта</button>
        </div>
    </section>
  );
}

export default Profile;
