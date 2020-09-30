import "reflect-metadata"
import { ApolloServer } from "apollo-server"
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { UserResolver } from './resolvers/user.resolver'



const main = async () => {

  await createConnection()

  const schema = await buildSchema({
    resolvers: [UserResolver]

  })

  const apolloServer = new ApolloServer({schema})

  // The `listen` method launches a web server.
  apolloServer.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });


}

main()