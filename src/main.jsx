import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { InMemoryCache, ApolloProvider, ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://6w2pl813-8000.inc1.devtunnels.ms/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  
  const token = localStorage.getItem('token') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiZmFyYXpzaGFoMTEwQG1haWwuY29tIiwicm9sZSI6ImVtcGxveWVlIiwiaWF0IjoxNzMxMzQ2NzU4fQ.-inMrxhBdbBAOkYMhweZt9y8qcPj3zMRlIzSpU9LBb4";
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token: token ? `${token}` : "",
    }
  }
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <BrowserRouter >
      <App />
    </BrowserRouter>,
  </ApolloProvider>

)
