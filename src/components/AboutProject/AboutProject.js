import SectionTitle from '../SectionTitle/SectionTitle';

function AboutProject() {
  return (
    <section id='about-project' className="about">
      <div className="about__container">
        <SectionTitle titleText="О проекте" />
        <div className="about__content">
          <div className="about__info-container">
            <h3 className="about__info-title">Дипломный проект включал 5 этапов</h3>
            <p className="about__info-text">
              Составление плана, работу над бэкендом, вёрстку,
              добавление функциональности и финальные доработки.
            </p>
          </div>
          <div className="about__info-container">
            <h3 className="about__info-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about__info-text">
              У каждого этапа был мягкий и жёсткий дедлайн,
              которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about__content">
          <div className="about__period-line">
            <h4 className="about__period-line-title about__period-line-title_color_green">1 неделя</h4>
            <p className="about__period-line-text">Back-end</p>
          </div>
          <div className="about__period-line">
            <h4 className="about__period-line-title">4 недели</h4>
            <p className="about__period-line-text">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
