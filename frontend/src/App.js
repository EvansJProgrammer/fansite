import NavBar from "./component/Navbar";
import Home from "./component/Home";
import Photos from"./component/Photos";
import Song from "./component/Song";
import AddSong from "./component/AddSong";
import UpdateSong from "./component/UpdateSong";
import DeleteSong from "./component/DeleteSong";
import Gossip from "./component/Gossip";
import AddGossip from "./component/AddGossip"
import UpdateGossip from "./component/UpdateGossip";
import DeleteGossip from "./component/DeleteGossip";
import NotFound from "./component/NotFound";
import Login from "./component/Login";
import AuthContext from "./AuthContext";

import { Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import YouTubePlaylist from "./component/YouTubePlaylist";

const TOKEN = 'jwt_token';

function App() {
  const [init, setInit] = useState(false);
  const [authManager, setAuthManager] = useState({
    user: null,
    roles: null,
    login(token) {
      if (!this.user) {
        const userData = jwtDecode(token);
        localStorage.setItem(TOKEN, token);
        setAuthManager((prevState) => ({...prevState, user: userData.sub, roles: userData.authorities}));
      }
    },
    logout() {
      if (this.user) {
        localStorage.removeItem(TOKEN);
        setAuthManager((prevState) => ({...prevState, user: null, roles: null}));
      }
    },
    hasRole(role) {
      return this.roles && this.roles.split(',').includes(`ROLE_${role.toUpperCase()}`);
    }
  });

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      authManager.login(token);
    }
    setInit(true);
  }, []);

  return (
    <div className="App">
      {init ? 
      (<AuthContext.Provider value={authManager} >
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/photos">
              <Photos />
            </Route>

            <Route exact path="/videos">
              <YouTubePlaylist />
            </Route>

            <Route exact path="/gossips" >
              <Gossip />
            </Route>
            <Route exact path="/gossips/add" >
              {authManager.user ? <AddGossip /> : <Redirect to="/login" /> }
            </Route>
            <Route exact path="/gossips/edit/:id" >
              {authManager.user ? <UpdateGossip />  : <Redirect to="/login" /> }
            </Route>
            <Route exact path="/gossips/delete/:id" >
              {authManager.hasRole('admin')  ? <DeleteGossip />  : <Redirect to="/login" /> }
            </Route>

            <Route exact path="/songs" >
              <Song />
            </Route>
            <Route exact path="/songs/add" >
              {authManager.user ? <AddSong /> : <Redirect to="/login" /> }
            </Route>
            <Route exact path="/songs/edit/:id" >
              {authManager.user ? <UpdateSong />  : <Redirect to="/login" /> }
            </Route>
            <Route exact path="/songs/delete/:id" >
              {authManager.hasRole('admin')  ? <DeleteSong />  : <Redirect to="/login" /> }
            </Route>

            <Route exact path="/login" >
              {authManager.user ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>   
        </div>
      </AuthContext.Provider>) : null}
    </div>
  );
}

function About() {
  return (
    <>
      <h2>About</h2>
      <div>
        <p>About the Creator</p>
        <ul>
          <li>Everything you need to know about our main girl!.</li>
        </ul>
      </div>
    </>
  )
}





export default App;


