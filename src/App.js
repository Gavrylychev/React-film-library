import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './App.css';
import { moviesData } from './movies-data/moviesData';

class MovieWillWatchItem extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      title: props.title,
      voteAverage: props.vote
    }
  }

  render(){
    return(
      <li className="list-group-item">
        <div className="d-flex justify-content-between">
          <div>{this.state.title}</div>
          <div>{this.state.voteAverage}</div>
        </div>
      </li>
    );
  };
}

class MovieListWillWatch extends React.Component {

  render(){
    let count = this.props.dataWillWatchList.length;
    const movieWillWatchList = this.props.dataWillWatchList.map((item) => <MovieWillWatchItem key={item.id} title={item.title} vote={item.vote_average} />);
    return(
      <div className="col-3">
        <div style={{position: "fixed"}}>
          <h4>Will Watch: {count} movies</h4>
          <ul className="list-group">{movieWillWatchList}</ul>
        </div>
      </div>
    );
  };
}

class MovieItem extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      item: props.item,
      btnGreen: false,
    };
  }

  toggleBtnHandler = () => {
    this.toggleBtnColor();
    this.props.onClick(this.state.item);
  }

  toggleBtnColor = () => {
    this.setState({
      btnGreen: !this.state.btnGreen
    });
  };

  render(){
    const item = this.state.item;
    return(
        <div className="col-4 mb-4">
          <div className="card" style={{width: "100%"}}>
            <img className="card-img-top"
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title} />
            <div className="card-body">
              <h6 className="card-title" key={item.title}>{item.title}</h6>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0" key={item.vote_average}>Rating: {item.vote_average}</p>
                <button type="button"
                    onClick={this.toggleBtnHandler}
                    className={this.state.btnGreen ? "btn btn-success" : "btn btn-secondary"}
                >Will Watch</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

class MovieList extends React.Component {

  render(){
    const movieItems = this.props.data;
    const movieList = movieItems.map((item) => <MovieItem key={item.id} item={item} onClick={(e) => this.props.onMovieWillWatch(e)} />);

    return (
      <div className="col-9">
        <div className="row">
          {movieList}
        </div>
      </div>
    );
  }

}

class App extends Component {
  constructor(){
    super();

    this.state = {
      movieListWillWatch: [],
      data: moviesData
    }
  }

  onMovieWillWatchHandler(movieInfo){
    this.setState((state, props) => {
      let index = state.movieListWillWatch.indexOf(movieInfo);
      if(index === -1){
        state.movieListWillWatch.push(movieInfo);
      }else{
        state.movieListWillWatch.splice(index, 1);
      }
      console.log(state.movieListWillWatch)
      return {
      movieListWillWatch: state.movieListWillWatch
    }});
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <MovieList data = {this.state.data} onMovieWillWatch={this.onMovieWillWatchHandler.bind(this)}/>
          <MovieListWillWatch dataWillWatchList={this.state.movieListWillWatch}/>
        </div>
      </div>
    );
  }
}

export default App;
