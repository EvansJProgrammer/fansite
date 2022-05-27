import AuthContext from "../AuthContext";
import Errors from "./Errors";

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

function UpdateGossip() {
  const [deets, setDeets] = useState('');
  const [errors, setErrors] = useState([]);
  const [init, setInit] = useState(false);

  const history = useHistory();
  const authManager = useContext(AuthContext);
  const { id } = useParams();
  
  // Variable Handling
  const handleDeetsChange = (event) => {
    setDeets(event.target.value);
  }

  // End of Variable Handling


    useEffect(() => {
        fetch(`http://localhost:8080/api/gossip/${id}`)
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
              setDeets(body.deets);
            }
          })
          .catch(err => console.error(err));
      }, []);
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        const updateGossip = {
            id: id,
            deets
        };
    
        const init = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
          },
          body: JSON.stringify(updateGossip)
        };
    
        fetch(`http://localhost:8080/api/gossip/${id}`, init)
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
              history.push('/gossips');
              return;
            }
            setErrors(body);
          })
          .catch(err => console.error(err));
      }

  return (
      <>
      {init ?  (<> 
      <h2 className="mt-5">Update Gossip</h2>
      <form>
        <div className="form-group">
          <label htmlFor="deets">Gossip Name:</label>
          <input className="form-control" type="text" id="deets" name="deets" value={deets} onChange={handleDeetsChange} ></input>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Save Deets</button>
          &nbsp;
          <button className="btn btn-secondary" type="button" onClick={() => history.push('/gossips')}>Cancel</button>
        </div>
      </form>
      <Errors errors={errors}/>
      </>) : null}
    </>
  )

}

export default UpdateGossip;