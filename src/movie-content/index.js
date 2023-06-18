import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieContent = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState('');
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

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`API_URL/comments/${movieId}`);
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [movieId]);

  // Submit a new comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    // Assuming you have a comment object with rating and commentText properties
    const commentData = {
      rating: newRating,
      commentText: newComment,
      movieId: movieId, // Assuming you have the movieId available in the component
    };

    try {
      // Make an API call to your backend API to submit the comment data
      const response = await axios.post('your-comment-api-endpoint', commentData);

      // Handle the response and update the comment list accordingly
      if (response.status === 200) {
        // Update the comment list by adding the new comment to the existing comments array
        setComments((prevComments) => [...prevComments, response.data]);
        setNewRating('');
        setNewComment('');
      } else {
        // Handle error case
      }
    } catch (error) {
      console.error(error);
    }
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
              {comment.replies.length > 0 && (
                <ul className="list-unstyled ml-4">
                  {comment.replies.map((reply) => (
                    <li key={reply.id}>
                      <div>
                        <strong>{reply.user}</strong>
                      </div>
                      <p>{reply.comment}</p>
                    </li>
                  ))}
                </ul>
              )}
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