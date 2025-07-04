import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

const Movie = () => {
    const { id } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/w500";
    const [movie, setMovie] = useState({});
    const [trailerKey, setTrailerKey] = useState("");
    const KEY = process.env.REACT_APP_KEY;

    useEffect(() => {
        // Buscar detalhes do filme
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                setMovie(data);
            })
            .catch((error) => console.error("Erro ao buscar detalhes do filme:", error));

        // Buscar vídeos/trailers do filme
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                // Procurar por trailer em português primeiro
                let trailer = data.results.find(video => 
                    video.type === "Trailer" && video.site === "YouTube"
                );
                
                // Se não encontrar trailer em português, buscar em inglês
                if (!trailer) {
                    return fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${KEY}&language=en-US`)
                        .then((response) => response.json())
                        .then((englishData) => {
                            trailer = englishData.results.find(video => 
                                video.type === "Trailer" && video.site === "YouTube"
                            );
                            if (trailer) {
                                setTrailerKey(trailer.key);
                            }
                        });
                }
                
                if (trailer) {
                    setTrailerKey(trailer.key);
                }
            })
            .catch((error) => console.error("Erro ao buscar trailer:", error));
    }, [KEY, id]);

    const handleWatchTrailer = () => {
        if (trailerKey) {
            window.open(`https://www.youtube.com/watch?v=${trailerKey}`, '_blank');
        }
    };

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
                        <button 
                            className="trailer_button" 
                            onClick={handleWatchTrailer}
                        >
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

