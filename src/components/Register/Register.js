import FormPage from '../FormPage/FormPage';
import useFormWithValidation from '../../hooks/useFormValidation';

function Register({ handleRegister }) {
  const {
    values, errors, isValid, handleChange, resetForm,
  } = useFormWithValidation({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister({ name: values.name, email: values.email, password: values.password });
    resetForm();
  };

  return (
    <FormPage name='registration' title="Добро пожаловать!" buttonText="Зарегистрироваться" question="Уже зарегистрированы?" path="/sign-in" link="Войти" handleSubmit={handleSubmit} isValid={isValid}>
      <label className="form__label form__label_place_auth">
        <h3 className="form__label-text">Имя</h3>
        <input type="text" placeholder='Имя' name='name' className="form__field form__field_place_auth" defaultValue={values.name || ''} onChange={handleChange} required />
        <p className="form__item-error">Что-то пошло не так...</p>
      </label>
      <label className="form__label form__label_place_auth">
        <h3 className="form__label-text">E-mail</h3>
        <input type="email" name='email' placeholder='E-mail' className="form__field form__field_place_auth" required defaultValue={values.email || ''} onChange={handleChange} />
        <p className="form__item-error">Что-то пошло не так...</p>
      </label>
      <label className="form__label form__label_place_auth">
        <h3 className="form__label-text">Пароль</h3>
        <input type="password" name='password' placeholder='Пароль' className="form__field form__field_place_auth form__field_type_error" required defaultValue={values.password || ''} onChange={handleChange} />
        <p className="form__item-error form__item-error-active">Что-то пошло не так...</p>
      </label>
    </FormPage>
  );
}

export default Register;
