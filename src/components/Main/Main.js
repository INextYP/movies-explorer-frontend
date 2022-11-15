import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import NavigationPromo from '../NavigationPromo/NavigationPromo';

function Main() {
  return (
    <main className='main'>
      <Promo/>
      <NavigationPromo/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
      <Footer/>
    </main>
  );
}

export default Main;
