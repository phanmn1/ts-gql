import { ApolloServer, gql } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { UserResolver } from './user.resolver';
import {
  ApolloServerTestClient,
  createTestClient,
} from 'apollo-server-testing';

let testserver: ApolloServerTestClient;
beforeAll(async () => {
  // create a test server to test against, using our production typeDefs,
  // resolvers, and dataSources.
  await createConnection();

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({ schema });
  // mock the dataSource's underlying fetch methods

  // use the test server to create a query function
  testserver = createTestClient(server);
});

test('should return zero users', async () => {
  // run query against the server and snapshot the output

  const GET_EMPTY_USERS = gql`
    query {
      users {
        id
      }
    }
  `;

  const res = await testserver.query({ query: GET_EMPTY_USERS });

  expect(res?.data).toEqual({
    users: [],
  });
});
