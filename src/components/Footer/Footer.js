function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="footer__content">
          <p className="footer__copyright">&copy; 2022</p>
          <nav className="footer__navigation">
            <ul className="footer__navigation-list">
              <li className="footer__navigation-list-item">
                <a className="footer__navigation-link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
              </li>
              <li className="footer__navigation-list-item">
                <a className="footer__navigation-link" href="https://github.com/INextYP" target="_blank" rel="noreferrer">Github</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
