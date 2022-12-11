import FormPage from '../FormPage/FormPage';
import useFormWithValidation from '../../hooks/useFormValidation';

function Login({ handleLogin }) {
  const {
    values, errors, isValid, handleChange, resetForm,
  } = useFormWithValidation({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin({ email: values.email, password: values.password });
    resetForm();
  };

  return (
    <FormPage name='login' title="Рады видеть!" buttonText="Войти" question="Ещё не зарегистрированы?" path="/sign-up" link="Регистрация" handleSubmit={handleSubmit} isValid={isValid}>
      <label className="form__label form__label_place_auth">
        <h3 className="form__label-text">E-mail</h3>
        <input type="email" name='email' placeholder='E-mail' className="form__field form__field_place_auth" required value={values.email || ''} onChange={handleChange} />
        <p className="form__item-error">Что-то пошло не так...</p>
      </label>
      <label className="form__label form__label_place_auth">
        <h3 className="form__label-text">Пароль</h3>
        <input type="password" name='password' placeholder='Пароль' minLength="5"
               maxLength="20" className="form__field form__field_place_auth form__field_type_error" required value={values.password || ''} onChange={handleChange} />
        <p className="form__item-error form__item-error-active">Что-то пошло не так...</p>
      </label>
    </FormPage>
  );
}

export default Login;
