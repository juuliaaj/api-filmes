import React, { useEffect, useState } from "react";
import { Container, Movie, MovieList, Btn } from "./style";
import { Link } from "react-router-dom";

function Home() {
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const KEY = process.env.REACT_APP_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${KEY}&language=pt-BR`);
        const data = await res.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
      }
    };

    fetchGenres();
  }, [KEY]);


  useEffect(() => {
    const fetchMovies = async () => {
      let url = "";
      if (selectedGenre !== "") {
        url = `${BASE_URL}/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=${selectedGenre}`;
      } else {
        url = `${BASE_URL}/movie/popular?api_key=${KEY}&language=pt-BR`;
      }

      try {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };

    fetchMovies();
  }, [KEY, selectedGenre]);

  return (
    <Container>
      <h1>Filmes em Cartaz</h1>

      <select
    value={selectedGenre}
    onChange={(e) => setSelectedGenre(e.target.value)}
    style={{
        padding: "12px",
        width: "100%",
        borderRadius: "10px",
        border: "none",
        backgroundColor: "#1a1a1a",
        color: "#f2f2f2",
        marginBottom: "30px",
        fontSize: "1rem",
        outline: "none",
        appearance: "none",
        backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"white\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/></svg>')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 10px center",
        backgroundSize: "24px",
    }}
    >

        <option value="">Filtrar por gênero</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>{genre.name}</option>
        ))}
      </select>

      <MovieList>
        {movies.length === 0 && <p style={{ color: "#f2f2f2", textAlign: "center" }}>Nenhum filme encontrado.</p>}
        {movies.map((movie) => (
          <Movie key={movie.id}>
            <img
              src={movie.poster_path ? `${imagePath}${movie.poster_path}` : "/fallback.png"}
              alt={movie.title}
            />
            <span>{movie.title}</span>
            <Link to={`/${movie.id}`}>
              <Btn>Detalhes</Btn>
            </Link>
          </Movie>
        ))}
      </MovieList>
    </Container>
  );
}

export default Home;


