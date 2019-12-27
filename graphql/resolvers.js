const {
  getHymnByNumber,
  getCategories,
  getHymnsInCategory,
  searchHymn
} = require("../utils/APIFunctions");

const resolvers = {
  Query: {
    hymn: (root, { number }) => getHymnByNumber(number),
    hymnsInCategory: (root, { category }) => getHymnsInCategory(category),
    allCategories: () => getCategories(),
    searchHymn: (root, { term }) => searchHymn(term)
  }
};

module.exports = resolvers;
