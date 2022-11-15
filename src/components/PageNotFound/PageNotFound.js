import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <section className='page-not-found'>
      <div className="page-not-found__container">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__text">Страница не найдена</p>
      </div>
      <Link to="/" className="page-not-found__exit-link">Назад</Link>
    </section>
  );
}

export default PageNotFound;
