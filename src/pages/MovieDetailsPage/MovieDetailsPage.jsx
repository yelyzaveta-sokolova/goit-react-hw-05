import { Suspense, useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useParams, } from "react-router-dom";
import toast from "react-hot-toast";

import { getMovieDetailsById } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { movieId } = useParams();
  const goBackRef = useRef(location.state);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const details = await getMovieDetailsById(movieId);
        setMovieDetails(details);
      } catch {
        setError("Error fetching movie details");
        toast.error("Error fetching movie details");
      }
    };
    getDetails();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!movieDetails) return <Loader />;

  return (
    <>
      <Link className={s.detailsBtn} to={goBackRef.current ?? "/movies"}>Go back</Link>
      <div className={s.movieInfo}>
        <img className={s.moviePhoto}
          src={
            movieDetails.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
              : "https://dummyimage.com/500x750/cdcdcd/000.jpg&text=No+poster"
          }
          alt="Movie poster"
        />
        <div>
          <div>
            <h1 className={s.detailTitle}>
              {movieDetails.title} ({movieDetails.release_date.slice(0, 4)})
            </h1>
            <p className={s.detailText}>
              User Score: {Math.round(movieDetails.vote_average * 10) + "%"}
            </p>
          </div>
          <div>
            <h2 className={s.secondTitle}>Overview</h2>
            <p className={s.detailText}>{movieDetails.overview}</p>
          </div>
          <div>
            <h3 className={s.secondTitle}>Genres</h3>
            <p className={s.detailText}>{movieDetails.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
        </div>
      </div>
      <hr />
      <p className={s.detailText}>Additional information</p>
      <ul className={s.detailsList}>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <hr />
      <Suspense fallback={<Loader />}>
        <Outlet context={movieDetails} />
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;