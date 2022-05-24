import { useHistory, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../AuthContext';

function DeleteSong() {
    const [title, setTitle] = useState('');
    const [length, setLength] = useState('');
    const [youTubeUrl, setYouTubeUrl] = useState('');
    const [spotifyUrl, setSpotifyUrl] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [init, setInit] = useState(false);

  
    const history = useHistory();
    const { id } = useParams();
    const authManager = useContext(AuthContext);


    useEffect(() => {
        fetch(`http://localhost:8080/api/song/${id}`)
          .then(response => {
            if (response.status === 200) {
              return response.json();
            }
    
            if (response.status === 404) {
              history.replace('/not-found');
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

      const handleSubmit = () => {

        const init = {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
          }
        }
        
        fetch(`http://localhost:8080/api/song/${id}`, init)
          .then(response => {
            if (response.status === 204) {
              history.push('/songs');
              return;
            } else if (response.status === 403) {
              authManager.logout();
              history.push('/login');
            }
    
            return Promise.reject('Something went wrong :)');
          })
          .catch(err => console.error(err));
      }
    
      return (
        <>
          {init ? (<>
            <h2>Song Delete</h2>
            <div className="alert alert-warning">
              <div>Are you sure you want to delete this song?</div>
              <div>Song: {title + " " + length + " " + releaseYear}</div>
              <div>youTubeUrl: {youTubeUrl}</div>
              <div>spotifyUrl: {spotifyUrl}</div>
            </div>
            <button className="btn btn-primary" type="button" onClick={handleSubmit}>Delete</button>
            &nbsp;
            <button className="btn btn-secondary" type="button" onClick={() => history.push('/songs')}>Cancel</button>
          </>) : null}
        </>
      );
    
    
    }
    
    export default DeleteSong;
    