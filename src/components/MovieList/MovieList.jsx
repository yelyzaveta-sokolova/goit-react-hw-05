import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul className={css.movieList}>
      {movies.map((item) => (
        <li key={item.id} className={css.item}>
          <Link to={`/movies/${item.id}`} state={location}>
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

