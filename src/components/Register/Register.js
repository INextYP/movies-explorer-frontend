import FormPage from '../FormPage/FormPage';

function Register() {
  return (
    <FormPage name='registration' title="Добро пожаловать!" buttonText="Зарегистрироваться" question="Уже зарегистрированы?" path="/sign-in" link="Войти">
      <label className="form__label form__label_place_auth">
        <h3 className="form__label-text">Имя</h3>
        <input type="text" placeholder='Имя' className="form__field form__field_place_auth" required />
        <p className="form__item-error">Что-то пошло не так...</p>
      </label>
      <label className="form__label form__label_place_auth">
        <h3 className="form__label-text">E-mail</h3>
        <input type="email" placeholder='E-mail' className="form__field form__field_place_auth" required />
        <p className="form__item-error">Что-то пошло не так...</p>
      </label>
      <label className="form__label form__label_place_auth">
        <h3 className="form__label-text">Пароль</h3>
        <input type="password" placeholder='Пароль' className="form__field form__field_place_auth form__field_type_error" required />
        <p className="form__item-error form__item-error-active">Что-то пошло не так...</p>
      </label>
    </FormPage>
  );
}

export default Register;
