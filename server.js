var app = require("./app");
var port = process.env.PORT || 3000;
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typedefs");

const defaultQuery = `#Get a hymn by it's number
  {
    hymn(number: "1") {
      title
      category
      sound
      verses
      chorus
    }
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    tabs: [
      {
        endpoint: `/graphql`,
        query: defaultQuery
      }
    ]
  }
});
server.applyMiddleware({ app });

app.listen({ port }, function() {
  console.log(
    "Express server listening on port" + port,
    `Graphql path is ${server.graphqlPath}`,
    `Build something awesome!!`
  );
});
