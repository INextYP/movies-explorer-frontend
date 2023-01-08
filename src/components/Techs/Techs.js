import SectionTitle from '../SectionTitle/SectionTitle';

function Techs() {
  return (
    <section id='techs' className="techs">
      <div className="techs__container">
        <SectionTitle titleText='Технологии' />
        <div className="techs__content">
          <h3 className="techs__about-title">7 технологий</h3>
          <p className="techs__about-text">
            На курсе веб-разработки мы освоили технологии,
            которые применили в дипломном проекте.
          </p>

          <ul className="techs__list-items">
            <li className="techs__list-item">HTML</li>
            <li className="techs__list-item">CSS</li>
            <li className="techs__list-item">JS</li>
            <li className="techs__list-item">React</li>
            <li className="techs__list-item">Git</li>
            <li className="techs__list-item">Express.js</li>
            <li className="techs__list-item">mongoDB</li>
          </ul>
        </div>
        </div>
    </section>
  );
}

export default Techs;
