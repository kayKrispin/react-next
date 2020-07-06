import React from 'react';
import './App.css';
import { getFilms } from "./api";
import { getFilmsRequest } from "./redux/films/actions";
import { connect } from "react-redux";
import useSsrEffect from "./helpers/useSsrEffect";

function App({ fetchedFilms, fetchFilms }) {

  const [count, setCount] = React.useState(1);

  useSsrEffect( () => {
    fetchFilms("lord of the");
  },[]);


  const onIncrement = () => {
    setCount(count + 1);
  };

  const onDecrement = () => {

    if (!count) return;

    setCount(count -1);
  };

  const onChange = e => {
    const { value } = e.target;

    fetchFilms(value);
  };

  return (
    <div className="App">
      <p>{count}</p>
      <button className="btn-inc" onClick={onIncrement}>increment</button>
      <button onClick={onDecrement} >decrement</button>
      <div className="search-input">
        <input onChange={onChange} className="search-input-block" type="text"/>
      </div>
      <div className="film-container">
        {
          fetchedFilms && fetchedFilms.map((film, index) => {
            return (
              <div key={index} className="film-block">
                <h4>
                  <b>{film.Title}</b>
                </h4>
                <img src={film.Poster} alt=""/>
                <p>
                  {film.Year}
                </p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default connect(
  state => ({
    fetchedFilms: state.films.films
  }),
  dispatch => ({
    fetchFilms: (data) => dispatch(getFilmsRequest(data))
  })
)(App);
