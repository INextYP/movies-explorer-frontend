import photo from '../../images/photo.png';
import SectionTitle from '../SectionTitle/SectionTitle';

function AboutMe() {
  return (
    <section id='about-me' className="about-me">
      <div className="about-me__container">
        <SectionTitle titleText="Студент" />
        <div className="about-me__content">
          <div className="about-me__info">
            <h3 className="about-me__name">Виталий</h3>
            <p className="about-me__profession">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__description">
              Я родился и живу в Саратове, закончил факультет экономики СГУ.
              У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
              Недавно начал кодить. С 2015 года работал в компании КБ Контур.
              После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a className="about-me__link" href="https://github.com/INextYP" target="_blank" rel="noreferrer">Github</a>
          </div>
          <img src={photo} alt="Фото" className="about-me__img" />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
