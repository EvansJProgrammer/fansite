import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";

function Gossip() {

  const [gossip, setGossip] = useState([]);

  const history = useHistory();

  const authManager = useContext(AuthContext);

  const getGossip = () => {
    fetch('http://localhost:8080/api/gossip')
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }

        return Promise.reject('Something went wrong on the server :)');
      })
      .then(body => {
        setGossip(body);
      })
      .catch(err => console.error(err));
  }

  useEffect(() =>{
    getGossip();
  }, []);

  const handleAddSelect = () => {
    history.push('/gossips/add');
  }

  const handleEditSelect = (gossip) => {
    history.push(`/gossips/edit/${gossip.id}`);
  }

  const handleDeleteSelect = (gossip) => {
    history.push(`/gossips/delete/${gossip.id}`);
  }

  return (
    <>
      <h2 className="mt-5">Gossip List</h2>
      {authManager.user ? <button className="btn btn-primary mb-3 mt-4" type="button" onClick={handleAddSelect}>Add Gossip</button> : null}
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Deets</th>
          </tr>
        </thead>
        <tbody>
          {gossip.map((fa, i) => (
            <tr key={fa.id} className="card mb-4">
              <td>
                {fa.deets}
              </td>
              <td>
              &nbsp;
                {authManager.user ? (<>
                  {authManager.hasRole('admin') ? <button className="btn btn-danger float-right" type="button" onClick={() => handleDeleteSelect(fa)} >Delete</button> : null }
                  <button className="btn btn-warning float-right" type="button" onClick={() => handleEditSelect(fa)} >Edit</button>
                  &nbsp;
                  
                </>) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )

}

export default Gossip;