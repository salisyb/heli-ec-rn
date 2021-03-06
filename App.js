import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {gql, useQuery} from '@apollo/client';
import RootComponent from './app/RootComponent';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'https://graphqltr.herokuapp.com/graphql',
  cache,
  defaultOptions: {watchQuery: {fetchPolicy: 'cache-and-network'}},
});

const App = () => (
  <ApolloProvider client={client}>
    <RootComponent />
  </ApolloProvider>
);

export default App;
