import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard"


const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

import './MovieGrid.css'

const Search = () => {
    const [searchParams] = useSearchParams()

    const [movies, setMovies] = useState([]);
    const query = searchParams.get("q");

    const getSearchedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
    
        setMovies(data.results);
    };
    
    useEffect(() => {
    
        const SearchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;
    
        getSearchedMovies(SearchWithQueryURL);
    }, [query])



    return (
        <div className="container">
            <h3 className="title">Resultados para: <span className="query-text">{query}</span></h3>
            <div className="movies-conteinar">
                {movies.length === 0 && <p>Carregando...</p>}
                {movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    );
};

export default Search;