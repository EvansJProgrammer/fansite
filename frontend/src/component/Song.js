import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../AuthContext";

function Song() {

  const [song, setSong] = useState([]);

  const history = useHistory();

  const authManager = useContext(AuthContext);

  const getSong = () => {
    fetch('http://localhost:8080/api/song')
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }

        return Promise.reject('Something went wrong on the server :)');
      })
      .then(body => {
        setSong(body);
      })
      .catch(err => console.error(err));
  }

  useEffect(() =>{
    getSong();
  }, []);

  const handleAddSelect = () => {
    history.push('/songs/add');
  }

  const handleEditSelect = (song) => {
    history.push(`/songs/edit/${song.id}`);
  }

  const handleDeleteSelect = (song) => {
    history.push(`/songs/delete/${song.id}`);
  }

  return (
    <>
      <h2 className="mt-5">Song List</h2>
      {authManager.user ? <button className="btn btn-primary mb-3 mt-4" type="button" onClick={handleAddSelect}>Add Song</button> : null}
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Length</th>
            <th scope="col">Modify</th>
          </tr>
        </thead>
        <tbody>
          {song.map((fa, i) => (
            <tr key={fa.id}>
              <td>
                {fa.title + " " + fa.length + " " + fa.releaseYear}
              </td>
              <td>
                {fa.youTubeUrl}
              </td>
              <td>
              &nbsp;
                {authManager.user ? (<>
                  <button className="btn btn-warning" type="button" onClick={() => handleEditSelect(fa)} >Edit</button>
                  &nbsp;
                  {authManager.hasRole('admin') ? <button className="btn btn-danger" type="button" onClick={() => handleDeleteSelect(fa)} >Delete</button> : null }
                </>) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )

}

export default Song;