import FormPage from '../FormPage/FormPage';

function Login() {
  return (
    <FormPage name='login' title="Рады видеть!" buttonText="Войти" question="Ещё не зарегистрированы?" path="/sign-up" link="Регистрация">
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

export default Login;
