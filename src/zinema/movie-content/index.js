import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentThunk, findCommentsThunk, updateCommentThunk } from '../services/movie-thunks';
import { updateFavoritesThunk } from '../services/list-thunks';

const MovieContent = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  // const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState('');
  const { comments, loading } = useSelector(state => state.movie)
  console.log("comments: ", comments);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [profile, setProfile] = useState(currentUser);
  const [isFavorite, setIsFavorite] = useState(true);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  // Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovie();
  }, [movieId]);

  // Improved find comments
  useEffect(() => {
    const findComments = async () => {
      await dispatch(findCommentsThunk(movieId))
    }
    findComments();
  }, [dispatch, movieId])

  // original handle submit comment:
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const data = { commentData: newComment, username: profile.username, rating: newRating, movie_id: movieId };
    if (!comments || comments.length === 0) {
      const create_data = { name: movie.title, movie_id: movieId, comments: [data] };
      await dispatch(createCommentThunk(create_data));
    } else {
      await dispatch(updateCommentThunk(data));
    }
    await dispatch(findCommentsThunk(movieId));
    setNewComment("");
  }

  // adding to user's favorites list
  const handleSubmitFavorites = async (e) => {
    e.preventDefault();
    // movie_id is the thing we are using for the list. username is to track the specific username 
    // in the database. update is used to add or delete the favorite in the state
    const data = { movie_id: movieId, username: profile.username, update: isFavorite }
    await dispatch(updateFavoritesThunk(data))
    // await dispatch(profileThunk());
    setIsFavorite(!isFavorite);
  }
  return (
    <div className="container">
      {movie ? (
        <div className="row">
          <div className="col-md-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="img-fluid"
            />
          </div>
          <div className="col-md-8">
            <h1 className="mb-4">{movie.title}</h1>
            <p>{movie.overview}</p>
          </div>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}

      <hr />

      <h3>Comments</h3>
      {comments ? (
        <ul className="list-unstyled">
          {loading && <li> Loading... </li>}
          {!loading && comments.length > 0}
          {comments.comments.map((comment) => (
            <li key={comment.username}>
              <div>
                <strong>{comment.username}</strong> - {comment.rating}
              </div>
              <p>{comment.commentData}</p>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
      <h4>Add a Comment</h4>
      <form onSubmit={(e) => handleSubmitComment(e)}>
        <div className="form-group">
          <label>Your Rating:</label>
          <input type="number" className="form-control" onChange={(e) => setNewRating(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Your Comment:</label>
          <textarea
            className="form-control"
            rows="4"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Comment
        </button>
      </form>
      <button onClick={handleSubmitFavorites}>
        {isFavorite ? 'Add to Favorites' : 'Remove from Favorites'}
      </button>
    </div>
  );
};

export default MovieContent;
