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
  const [message, setMessage] = useState({
    updateUserMessage: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchSavedMovies, setSearchSavedMovies] = useState([]);
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
    });

  useEffect(() => {
    getSavedMovies();
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  const getSavedMovies = () => {
    mainApi.getSavedMovies()
      .then((res) => {
        localStorage.setItem('savedMovies', JSON.stringify(res));
        const initialSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        setSavedMovies(initialSavedMovies);
      }).catch((err) => console.log(err));
  };

  useEffect(() => {
    const initialMovies = JSON.parse(localStorage.getItem('moviesApi'));
    if (initialMovies) {
      setMovies(initialMovies);
      const searchResult = JSON.parse(localStorage.getItem('searchResult'));
      if (searchResult) {
        setSearchMovies(searchResult);
      }
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
          handleLoginUser({ email, password });
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
    localStorage.clear();
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
        setMessage({ updateUserMessage: 'Данные успешно обновлены.' });
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
    if (movies.length === 0) {
      setIsLoading(true);
      moviesApi.getInitialMovies()
        .then((res) => {
          localStorage.setItem('moviesApi', JSON.stringify(res));
          const initialMovies = JSON.parse(localStorage.getItem('moviesApi'));
          setMovies(initialMovies);
          const whereSearch = JSON.parse(localStorage.getItem('sortResult'));
          console.log(whereSearch);
          // eslint-disable-next-line max-len
          const searchMoviesResult = whereSearch
            // eslint-disable-next-line max-len
            ? whereSearch.filter((movie) => movie.nameRU.toLowerCase().includes(keyword.toLowerCase()))
            // eslint-disable-next-line max-len
            : initialMovies.filter((movie) => movie.nameRU.toLowerCase().includes(keyword.toLowerCase()));
          if (searchMoviesResult.length === 0) {
            setErrors({ searchError: 'По вашему запросу ничего не найдено.', sortError: '', updateUserError: '' });
          } else {
            setErrors({ searchError: '', sortError: '', updateUserError: '' });
          }
          setSearchMovies(searchMoviesResult);
          localStorage.setItem('searchResult', JSON.stringify(searchMoviesResult));
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } else if (movies.length > 0 && !localStorage.getItem('isSavedSearch')) {
      setIsLoading(true);
      const whereSearchSort = JSON.parse(localStorage.getItem('sortResult'));
      console.log(whereSearchSort);
      // eslint-disable-next-line max-len
      const searchMoviesResult = whereSearchSort && whereSearchSort.length !== 0 ? whereSearchSort.filter((movie) => movie.nameRU.toLowerCase().includes(keyword.toLowerCase()))
        : movies.filter((movie) => movie.nameRU.toLowerCase().includes(keyword.toLowerCase()));
      if (searchMoviesResult.length === 0) {
        setErrors({ searchError: 'По вашему запросу ничего не найдено.', sortError: '', updateUserError: '' });
      } else {
        setErrors({ searchError: '', sortError: '', updateUserError: '' });
      }
      setSearchMovies(searchMoviesResult);
      localStorage.setItem('searchResult', JSON.stringify(searchMoviesResult));
      setTimeout(() => setIsLoading(false), 1000);
    }
    if (localStorage.getItem('isSavedSearch')) {
      setIsLoading(true);
      // eslint-disable-next-line max-len
      const searchMoviesResult = savedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(keyword.toLowerCase()));
      if (searchMoviesResult.length === 0) {
        setErrors({ searchError: 'По вашему запросу ничего не найдено.', sortError: '', updateUserError: '' });
      } else {
        setErrors({ searchError: '', sortError: '', updateUserError: '' });
      }
      setSearchSavedMovies(searchMoviesResult);
      setTimeout(() => setIsLoading(false), 1000);
    }
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

  const handleAddSavedMovies = (data) => {
    mainApi
      .addSavedMovie(data)
      .then((dataMovies) => {
        const dataSavedMovies = dataMovies;
        dataSavedMovies.id = `${data.id}`;
        setSavedMovies([dataSavedMovies, ...savedMovies]);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveSavedMovies = (movie) => {
    // eslint-disable-next-line no-underscore-dangle
    if (movie.id) {
      const getIdForInitialMovie = savedMovies.find((elem) => elem.nameRU === movie.nameRU);
      mainApi
        // eslint-disable-next-line no-underscore-dangle
        .deleteSavedMovie(getIdForInitialMovie._id)
        .then((res) => {
          // eslint-disable-next-line no-underscore-dangle
          setSavedMovies((state) => state.filter((c) => c._id !== getIdForInitialMovie._id));
        })
        .catch((err) => console.log(err));
    } else {
      mainApi
        // eslint-disable-next-line no-underscore-dangle
        .deleteSavedMovie(movie._id)
        .then((res) => {
          console.log(movie);
          // eslint-disable-next-line no-underscore-dangle
          setSavedMovies((state) => state.filter((c) => c._id !== movie._id));
          console.log(savedMovies);
        })
        .catch((err) => console.log(err));
    }
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
            onSubmitSearch={handleSearchMovies}
            onSortMovies={handleSortMovies}
            handleCardLike={handleCardLike}
            handleCheckLikeStatus={handleCheckLikeStatus}
            isLoading={isLoading}
            setSearchSavedMovies={setSearchSavedMovies}
          />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn}>
          <Header loggedIn={loggedIn}/>
          <SavedMovies
            errorsText={errors}
            savedMovies={savedMovies}
            searchSavedMovies={searchSavedMovies}
            onSubmitSearch={handleSearchMovies}
            onSortMovies={handleSortMovies}
            handleCardLike={handleCardLike}
            handleCheckLikeStatusSavedMovies={handleCheckLikeStatusSavedMovies}
            isLoading={isLoading}
            setSearchSavedMovies={setSearchSavedMovies}
          />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile" loggedIn={loggedIn} >
          <Header loggedIn={loggedIn}/>
          <Profile onEditProfile={handleUpdateUser}
                   onSignOut={signOut}
                   successMessage={message}
                   errorMessage={errors} />
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
