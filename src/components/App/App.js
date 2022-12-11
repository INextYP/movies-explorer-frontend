import {
  Redirect, Route, Switch, useHistory, useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { mainApi, moviesApi } from '../../utils/constants';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    searchError: '', sortError: '', updateUserError: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const { pathname } = useLocation();
  const history = useHistory();

  const tokenCheck = () => mainApi.getContent()
    .then((res) => {
      if (res) {
        setLoggedIn(true);
        setCurrentUser(res);
      }
    }).catch((err) => {
      console.log(`Ошибка: ${err}`);
      history.push('/');
    });

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  const getInitialMovies = () => {
    moviesApi.getInitialMovies()
      .then((res) => {
        localStorage.setItem('moviesApi', JSON.stringify(res));
        const initialMovies = JSON.parse(localStorage.getItem('moviesApi'));
        setMovies(initialMovies);
      })
      .catch((err) => console.log(err));
  };

  const getSavedMovies = () => {
    mainApi.getSavedMovies()
      .then((res) => {
        localStorage.setItem('savedMovies', JSON.stringify(res));
        const initialSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        setSavedMovies(initialSavedMovies);
      }).catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loggedIn || localStorage.getItem('moviesApi') || localStorage.getItem('savedMovies')) {
      getInitialMovies();
      getSavedMovies();
    }
  }, [loggedIn]);

  useEffect(() => {
    const initialMovies = JSON.parse(localStorage.getItem('moviesApi'));
    if (initialMovies) {
      setMovies(initialMovies);
      const searchResult = JSON.parse(localStorage.getItem('searchResult'));
      if (searchResult) {
        setSearchMovies(searchResult);
      }
    } else {
      getInitialMovies();
    }
  }, [loggedIn]);

  const handleLoginUser = ({ email, password }) => {
    setIsLoading(true);
    mainApi
      .authorization({ email, password })
      .then(() => {
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegistrationUser = ({ name, email, password }) => {
    setIsLoading(true);
    mainApi
      .registration(name, email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const signOut = () => mainApi.logOut().then(() => {
    localStorage.removeItem('moviesApi');
    localStorage.removeItem('searchResult');
    setCurrentUser({ name: '', email: '' });
    setSearchMovies([]);
    setMovies([]);
    setSavedMovies([]);
    history.push('/');
    setLoggedIn(false);
  });

  const handleUpdateUser = ({ name, email }) => {
    setIsLoading(true);
    mainApi
      .setUserInfo({ name, email })
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email });
      })
      .catch((err) => {
        if (err.code === 400) {
          setErrors({ searchError: '', sortError: '', updateUserError: 'Проверьте правильность введенных данных.' });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearchMovies = (keyword) => {
    // eslint-disable-next-line max-len
    const searchMoviesResult = movies.filter((movie) => movie.nameRU.toLowerCase().includes(keyword.toLowerCase()));
    if (searchMoviesResult.length === 0) {
      setErrors({ searchError: 'По вашему запросу ничего не найдено.', sortError: '', updateUserError: '' });
    } else {
      setErrors({ searchError: '', sortError: '', updateUserError: '' });
    }
    return searchMoviesResult;
  };

  const handleSortMovies = (moviesForSort) => {
    const sortMoviesResult = moviesForSort.filter((movie) => movie.duration <= 40);
    if (sortMoviesResult.length !== 0) {
      setErrors({ searchError: '', sortError: '', updateUserError: '' });
    } else {
      setErrors({ searchError: '', sortError: 'Среди фильмов нет короткометражек.', updateUserError: '' });
    }
    return sortMoviesResult;
  };

  const handleSubmitSearch = (keyword) => {
    setSearchMovies(handleSearchMovies(keyword));
    localStorage.setItem('searchResult', JSON.stringify(handleSearchMovies(keyword)));
  };

  const handleAddSavedMovies = (data) => {
    mainApi
      .addSavedMovie(data)
      .then((dataMovies) => {
        setSavedMovies([dataMovies, ...savedMovies]);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveSavedMovies = (movie) => {
    mainApi
      // eslint-disable-next-line no-underscore-dangle
      .deleteSavedMovie(movie._id)
      .then((res) => {
        // eslint-disable-next-line no-underscore-dangle
        setSavedMovies((state) => state.filter((c) => c._id !== movie._id));
      })
      .catch((err) => console.log(err));
  };

  const handleCheckLikeStatus = (moviesData) => {
    const isLiked = savedMovies.some((i) => i.movieId === moviesData.id);
    return isLiked;
  };

  const handleCheckLikeStatusSavedMovies = (moviesData) => {
    const isLiked = savedMovies.some((i) => i.movieId === moviesData.movieId);
    return isLiked;
  };

  function handleCardLike(moviesData, likeStatus) {
    likeStatus ? handleRemoveSavedMovies(moviesData) : handleAddSavedMovies(moviesData);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className={`App ${pathname !== '/' ? 'App_theme_dark' : ''}`}>
      <Switch>
        <Route exact path="/">
          <Header loggedIn={loggedIn}/>
          <Main/>
          <Footer/>
        </Route>
        <ProtectedRoute exact path="/movies" loggedIn={loggedIn}>
          <Header loggedIn={loggedIn}/>
          <Movies
            errorsText={errors}
            movies={searchMovies}
            onSubmitSearch={handleSubmitSearch}
            onSortMovies={handleSortMovies}
            handleCardLike={handleCardLike}
            handleCheckLikeStatus={handleCheckLikeStatus}
          />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn}>
          <Header loggedIn={loggedIn}/>
          <SavedMovies
            errorsText={errors}
            savedMovies={savedMovies}
            onSubmitSearch={handleSubmitSearch}
            onSortMovies={handleSortMovies}
            handleCardLike={handleCardLike}
            handleCheckLikeStatusSavedMovies={handleCheckLikeStatusSavedMovies}
          />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile" loggedIn={loggedIn} >
          <Header loggedIn={loggedIn}/>
          <Profile onEditProfile={handleUpdateUser} onSignOut={signOut} />
        </ProtectedRoute>
        <Route path="/sign-up">
          <Register handleRegister={handleRegistrationUser} />
        </Route>
        <Route path="/sign-in">
          {loggedIn ? (<Redirect to='/movies' />) : (<Login handleLogin={handleLoginUser}/>)}
        </Route>
        <Route path="*">
          <PageNotFound/>
        </Route>
      </Switch>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
