import { useHistory, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../AuthContext';

function DeleteGossip() {
    const [deets, setDeets] = useState('');
    const [init, setInit] = useState(false);

  
    const history = useHistory();
    const { id } = useParams();
    const authManager = useContext(AuthContext);


    useEffect(() => {
        fetch(`http://localhost:8080/api/gossip/${id}`)
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
              setDeets(body.deets);
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
        
        fetch(`http://localhost:8080/api/gossip/${id}`, init)
          .then(response => {
            if (response.status === 204) {
              history.push('/gossips');
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
            <h2>Gossip Delete</h2>
            <div className="alert alert-warning">
              <div>Are you sure you want to delete this Gossip?</div>
              <div>Gossip: {deets}</div>
            </div>
            <button className="btn btn-primary" type="button" onClick={handleSubmit}>Delete</button>
            &nbsp;
            <button className="btn btn-secondary" type="button" onClick={() => history.push('/gossips')}>Cancel</button>
          </>) : null}
        </>
      );
    
    
    }
    
    export default DeleteGossip;
    