import NavBar from "./component/Navbar";
import FieldAgents from "./component/Song";
import Add from "./component/AddSong";
import Update from "./component/UpdateSong";
import Delete from "./component/DeleteSong";
import NotFound from "./component/NotFound";
import Login from "./component/Login";
import AuthContext from "./AuthContext";

import { Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

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
            <Route exact path="/about">
              <About />
            </Route>

            <Route exact path="/songs" >
              <FieldAgents />
            </Route>
            <Route exact path="/songs/add" >
              {authManager.user ? <Add /> : <Redirect to="/login" /> }
            </Route>
            <Route exact path="/songs/edit/:id" >
              {authManager.user ? <Update />  : <Redirect to="/login" /> }
            </Route>
            <Route exact path="/songs/delete/:id" >
              {authManager.hasRole('admin')  ? <Delete />  : <Redirect to="/login" /> }
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

function Home() {
  return (
    <>
      <h2>Home</h2>
      <div>
        <p>This is the anything Taylor Swift Fan Page!.</p>
      </div>
    </>
  )
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
