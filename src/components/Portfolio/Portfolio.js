function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__project-items">
          <li className="portfolio__project-item">
            <a className="portfolio__project-link"
               href="https://github.com/INextYP/how-to-learn"
               target="_blank"
               rel="noreferrer">
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__project-item">
            <a className="portfolio__project-link"
               href="https://github.com/INextYP/russian-travel"
               target="_blank"
               rel="noreferrer">
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__project-item">
            <a className="portfolio__project-link"
               href="https://github.com/INextYP/react-mesto-api-full"
               target="_blank"
               rel="noreferrer">
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
