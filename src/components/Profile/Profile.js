import { Link } from 'react-router-dom';

function Profile({ name, email }) {
  return (
    <section className="profile">
      <h3 className="profile__welcome-message">Привет, {name}!</h3>
      <form className="form">
          <label className="form__label-profile">
            <p className="form__name">Имя</p>
            <input className="form__input" defaultValue={name} placeholder="Имя" required />
          </label>
          <label className="form__label-profile">
            <p className="form__name">E-mail</p>
            <input className="form__input" defaultValue={email} placeholder='E-mail' required/>
          </label>
      </form>
        <div className="profile__editing">
          <Link to="/profile" className="profile__edit-button">Редактировать</Link>
          <Link to="/" className="profile__exit-link">Выйти из аккаунта</Link>
        </div>
    </section>
  );
}

export default Profile;
