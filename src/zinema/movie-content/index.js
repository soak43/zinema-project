import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentThunk, findCommentsThunk, updateCommentThunk } from '../services/movie-thunks';

const MovieContent = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  // const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState('');
  const { comments, loading } = useSelector(state => state.movie)
  const dispatch = useDispatch();
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
    const findComments = () => {
      dispatch(findCommentsThunk(movieId))
    }
    findComments();
  }, [dispatch, movieId])

  // Submit a new comment
  const handleSubmitComment = () => {
    if (comments.length === 0) {
      dispatch(createCommentThunk(movieId, newComment));
    } else {
      dispatch(updateCommentThunk(movieId, newComment));
    }
    setNewComment("");
  };

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
      {comments.length > 0 ? (
        <ul className="list-unstyled">
          {comments.map((comment) => (
            <li key={comment.id}>
              <div>
                <strong>{comment.user}</strong> - {comment.rating}
              </div>
              <p>{comment.comment}</p>
              {/* {comment.replies.length > 0 && ( */}
              {/*   <ul className="list-unstyled ml-4"> */}
              {/*     {comment.replies.map((reply) => ( */}
              {/*       <li key={reply.id}> */}
              {/*         <div> */}
              {/*           <strong>{reply.user}</strong> */}
              {/*         </div> */}
              {/*         <p>{reply.comment}</p> */}
              {/*       </li> */}
              {/*     ))} */}
              {/*   </ul> */}
              {/* )} */}
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
      <h4>Add a Comment</h4>
      <form onSubmit={handleSubmitComment}>
        <div className="form-group">
          <label>Your Rating:</label>
          <input type="number" className="form-control" />
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
    </div>
  );
};

export default MovieContent;
