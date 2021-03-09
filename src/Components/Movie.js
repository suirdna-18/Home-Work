import React from "react";
import "../style.css";

export default class Movie extends React.Component {
  render() {
    const noImageSrc =
      "https://www.solidbackgrounds.com/images/3600x3600/3600x3600-white-solid-color-background.jpg";
    const imgSrc =
      "https://image.tmdb.org/t/p/w500" + this.props.item.poster_path;

    return (
      <div
        className="singleMovieContent"
        onClick={() => this.props.handleCardClick(this.props.item)}
      >
        <div>
          <img
            className="imgStyle"
            src={this.props.item.poster_path == null ? noImageSrc : imgSrc}
            alt=""
          />
        </div>

        <div className="infoDiv">
          <div>{this.props.item.original_title}</div>
          <div className="description">
            {this.props.item.vote_average} Rating,{" "}
            {this.props.item.release_date.substring(0, 4)}
          </div>
        </div>
      </div>
    );
  }
}
