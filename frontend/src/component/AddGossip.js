import AuthContext from "../AuthContext";
import Errors from "./Errors";

import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

function AddGossip() {
  const [deets, setDeets] = useState('');
  const [errors, setErrors] = useState([]);

  const history = useHistory();
  const authManager = useContext(AuthContext);
  
  // Variable Handling
  const handleDeetsChange = (event) => {
    setDeets(event.target.value);
  }

  // End of Variable Handling

  const handleSubmit = (event) => {
    event.preventDefault();

    const newSong = {
        deets
    };

    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
      },
      body: JSON.stringify(newSong)
    };

    fetch('http://localhost:8080/api/gossip', init)
      .then(response => {
        switch (response.status) {
          case 201:
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
      .then(json => {
        if (json.id) {
          history.push('/gossips');
        } else {
          setErrors(json);
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <>
      <h2 className="mt-5">Add Gossip:</h2>
      <form>
        <div className="form-group">
          <label htmlFor="deets">Add Gossip:</label>
          <input className="form-control" type="text" id="deets" name="deets" value={deets} onChange={handleDeetsChange} ></input>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Add Gossip</button>
          &nbsp;
          <button className="btn btn-secondary" type="button" onClick={() => history.push('/agents')}>Cancel</button>
        </div>
      </form>
      <Errors errors={errors}/>
    </>
  )

}

export default AddGossip;