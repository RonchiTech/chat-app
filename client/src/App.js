import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './graphql/client';
import { getLoggedInUser, logout } from './auth';
import Chat from './Chat';
import Login from './Login';
import NavBar from './NavBar';

const App = () => {
  const [user, setUser] = useState(getLoggedInUser());

  const handleLogin = (newUser) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }
  return (
    <ApolloProvider client={client}>
      <NavBar onLogout={handleLogout} />
      <Chat user={user} />
    </ApolloProvider>
  );
};

export default App;
