const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Hymn {
    number: String
    title: String
    titleWithHymnNumber: String
    verses: [String]
    chorus: String
    sound: String
    category: String
  }
  type Category {
    name: String
    hymns: [Hymn]
  }
  type Query {
    hymn(number: String!): Hymn
    hymnsInCategory(category: String!): [Hymn]
    allCategories: [Category]
    searchHymn(term: String!): [Hymn]
  }
`;

module.exports = typeDefs;
