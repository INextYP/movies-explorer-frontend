import { Route, Switch, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';

function App() {
  const { pathname } = useLocation();

  return (
    <div className={`App ${pathname !== '/' ? 'App_theme_dark' : ''}`}>
      <Switch>
        <Route exact path="/">
          <Header loggedIn={false}/>
          <Main/>
          <Footer/>
        </Route>
        <Route path="/movies">
          <Header loggedIn={true}/>
          <Movies />
          <Footer />
        </Route>
        <Route exact path="/saved-movies">
          <Header loggedIn={true}/>
          <SavedMovies />
          <Footer />
        </Route>
        <Route exact path="/sign-up">
          <Register/>
        </Route>
        <Route exact path="/sign-in">
          <Login/>
        </Route>
        <Route exact path="/profile">
          <Header loggedIn={true}/>
          <Profile name='Виталий' email="test@test.ru" />
        </Route>
        <Route path="*">
          <PageNotFound/>
        </Route>
      </Switch>
    </div>);
}

export default App;
