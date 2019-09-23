import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const FEED_QUERY = gql`
  {
    users(where: {name: "eude"}) {
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

class Test extends Component<{key: Number, name: String}> {
  render() {
    return (
      <div>
        <div>
          {this.props.name}
        </div>
      </div>
    )
  }
}

interface User {
  id: String,
  name: String,
  xp: Number,
  email: String,
  activities: Array<{title: String}>
}

interface Data {
  users: Array<User>
}

class TestList extends Component {
  render() {
    return (
      <Query<Data> query={FEED_QUERY}>
        {({ loading, error, data}) => {
          if (loading) return <div>Fetching</div>
          if (error || data === undefined) return <div>Error</div>

          const renderList = data.users

          return (
            <div>
              {renderList.map((test, index) => <Test key={index} name={test.email} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

const App: React.FC = () => {
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
        <TestList/>
        </header>
    </div>
  );
}

export default App;
