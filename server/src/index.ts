import { GraphQLServer } from 'graphql-yoga'
import { formatError } from 'apollo-errors';
import {app_address, server_address, server_port} from "./consts";
import resolvers from './resolvers';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (req, res) => {
    const { response } = req;
    return { response };
  }
});

const options = {
  endpoint: '/graphql',
  port: server_port,
  playground: '/playground',
  formatError,
  cors: {
    credentials: true,
    origin: [app_address]
  }
};

server.start(options, () => console.log(`Server is running on ${server_address}`));