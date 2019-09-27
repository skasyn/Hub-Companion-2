import React/*, { Component }*/ from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

require('dotenv').config()

const LOGIN: any = gql`
  query LOGIN($code: String) {
    login(code: $code) {
      id
      name
      xp
      email
      activities {
        title
      }
    }
  }
`

interface User {
  id: String,
  name: String,
  xp: Number,
  email: String,
  activities: Array<{title: String}>
}

interface UserData {
  login: User
}

interface UserVars {
  code: String
}

const PageNotLogged: React.FC = () => {
  let query = new URLSearchParams(window.location.search);
  let code = "";
  if (query.get('code')) {
    let get = query.get('code');
    if (get == null) {
      code = ""
    } else {
      code = get
    }
  }
  const { loading, data } = useQuery<UserData, UserVars>(
    LOGIN,
    { variables: { code: code }}
  )
  if (data === undefined) {
    return (
      <div><p>....</p></div>
    )
  }
  return (
    <div>
      <h3>User : </h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <div><a>Hello {data.login.name} </a></div>
      )}
    </div>
  )
}

const App: React.FC = () => {
  console.log(process.env.REACT_APP_OFFICELINK)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a href={process.env.REACT_APP_OFFICELINK}> CLick here </a>
        <PageNotLogged/>
        </header>
    </div>
  );
}

export default App;
