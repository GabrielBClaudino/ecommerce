import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://192.168.0.100:3000/graphql',
    }),
    cache: new InMemoryCache(),
});

export default client;