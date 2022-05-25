import AuthContext from "../AuthContext";
import Errors from "./Errors";

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function UpdateSong() {
  const [title, setTitle] = useState('');
  const [length, setLength] = useState('');
  const [youTubeUrl, setYouTubeUrl] = useState('');
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [errors, setErrors] = useState([]);
  const [init, setInit] = useState(false);

  const history = useHistory();
  const authManager = useContext(AuthContext);
  const { id } = useParams();
  
  // Variable Handling
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleLengthChange = (event) => {
    setLength(event.target.value);
  }

  const handleYouTubeUrlChange = (event) => {
    setYouTubeUrl(event.target.value);
  }

  const handleSpotifyUrlChange = (event) => {
    setSpotifyUrl(event.target.value);
  }

  const handleReleaseYearChange = (event) => {
    setReleaseYear(event.target.value);
  }
  // End of Variable Handling


    useEffect(() => {
        fetch(`http://localhost:8080/api/song/${id}`)
          .then(response => {
            if (response.status === 200) {
              return response.json();
            }
    
            if (response.status === 404) {
              history.update('/not-found');
              return null;
            }
    
            return Promise.reject('Something went wrong on the server :)');
          })
          .then(body => {
            if (body) {
              setInit(true);
              setTitle(body.title);
              setLength(body.length);
              setYouTubeUrl(body.youTubeUrl);
              setSpotifyUrl(body.spotifyUrl);
              setReleaseYear(body.releaseYear);
            }
          })
          .catch(err => console.error(err));
      }, []);
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        const updateSong = {
            id: id,
            title,
            length,
            youTubeUrl,
            spotifyUrl,
            releaseYear
        };
    
        const init = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
          },
          body: JSON.stringify(updateSong)
        };
    
        fetch(`http://localhost:8080/api/song/${id}`, init)
          .then(response => {
            switch (response.status) {
              case 204:
                return null;
              case 400:
                return response.json();
              case 403:
                authManager.logout();
                history.push('/login');
                break;
              default:
                return Promise.reject('Something went wrong on the server :)');
            }
          })
          .then(body => {
            if (!body) {
              history.push('/songs');
              return;
            }
    
            setErrors(body);
          })
          .catch(err => console.error(err));
      }

  return (
      <>
      {init ?  (<> 
      <h2 className="mt-5">Update Song</h2>
      <form>
        <div className="form-group">
          <label htmlFor="title">Song Name:</label>
          <input className="form-control" type="text" id="title" name="title" value={title} onChange={handleTitleChange} ></input>
          <label htmlFor="length">Song length:</label>
          <input className="form-control" type="text" id="length" name="length" value={length} onChange={handleLengthChange} ></input>
          <label htmlFor="youTubeUrl">Song youTubeUrl:</label>
          <input className="form-control" type="text" id="lyouTubeUrl" name="youTubeUrl" value={youTubeUrl} onChange={handleYouTubeUrlChange} ></input>
          <label htmlFor="spotifyUrl">Song spotifyUrl:</label>
          <input className="form-control" type="text" id="spotifyUrl" name="spotifyUrl" value={spotifyUrl} onChange={handleSpotifyUrlChange} ></input>
          <label htmlFor="releaseYear">Song releaseYear:</label>
          <input className="form-control" type="number" id="releaseYear" name="releaseYear" value={releaseYear} onChange={handleReleaseYearChange} ></input>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Add Song</button>
          &nbsp;
          <button className="btn btn-secondary" type="button" onClick={() => history.push('/songs')}>Cancel</button>
        </div>
      </form>
      <Errors errors={errors}/>
      </>) : null}
    </>
  )

}

export default UpdateSong;