import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

const Movie = () => {
    const { id } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/w500";
    const [movie, setMovie] = useState({});
    const KEY = process.env.REACT_APP_KEY;

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                setMovie(data);
            })
            .catch((error) => console.error("Erro ao buscar detalhes do filme:", error));
    }, [KEY, id]);

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

                <Link to="/">
                    <button className="link_button">Voltar</button>
                </Link>
            </div>
        </div>
    );
};

export default Movie;

