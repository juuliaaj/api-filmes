// Movie.js
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

const Movie = () => {
  const { id } = useParams();
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const [movie, setMovie] = useState({});
  const [trailerKey, setTrailerKey] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const KEY = process.env.REACT_APP_KEY;

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error("Erro ao buscar detalhes do filme:", err));

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=pt-BR`)
      .then((res) => res.json())
      .then((data) => {
        let trailer = data.results.find(v => v.type === "Trailer" && v.site === "YouTube");
        if (!trailer) {
          return fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=en-US`)
            .then((res) => res.json())
            .then((dataEN) => {
              trailer = dataEN.results.find(v => v.type === "Trailer" && v.site === "YouTube");
              if (trailer) setTrailerKey(trailer.key);
            });
        }
        if (trailer) setTrailerKey(trailer.key);
      })
      .catch((err) => console.error("Erro ao buscar trailer:", err));
  }, [KEY, id]);

  const handleWatchTrailer = () => setShowTrailer(true);
  const handleBackToMovie = () => setShowTrailer(false);

  if (showTrailer && trailerKey) {
    return (
      <div className="trailer-container">
        <nav>
          <h1>Trailer - {movie.title}</h1>
        </nav>

        <div className="trailer-wrapper">
          <iframe
            className="trailer-iframe"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
            title={`Trailer - ${movie.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="trailer-buttons">
          <button className="back_button" onClick={handleBackToMovie}>
            Voltar ao Filme
          </button>
          <Link to="/" className="link-home">
         <button className="home_button">Início</button>
        </Link>

        </div>
      </div>
    );
  }

  return (
    <div>
      <nav>
        <h1>{movie.title || "Carregando..."}</h1>
      </nav>

      {movie.poster_path && (
        <img
          className="img_movie"
          src={`${imagePath}${movie.poster_path}`}
          alt={movie.title}
        />
      )}

      <div className="container">
        <h1>{movie.title}</h1>
        <h3>Data de lançamento: {movie.release_date}</h3>

        <div className="descricao">
          <h4>Descrição:</h4>
          <p className="movie-desc">{movie.overview}</p>
        </div>

        <div className="buttons-container">
          {trailerKey && (
            <button className="trailer_button" onClick={handleWatchTrailer}>
              🎬 Assistir Trailer
            </button>
          )}
          <Link to="/">
            <button className="link_button">Voltar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Movie;


