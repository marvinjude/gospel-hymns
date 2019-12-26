const db = require("../content/db.json");

function getCategories() {
  return db.categories;
}
function getHymnByNumber(number) {
  return db.hymns[number] ? db.hymns[number] : false;
}
function getHymnsInCategory(category) {
  return db.categories[category] ? db.categories[category] : false;
}
function searchHymn(searchTerm) {
  return Object.values(db.hymns).filter(({ title }) => {
    return title.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1;
  });
}

module.exports = {
  getCategories,
  getHymnByNumber,
  getHymnsInCategory,
  searchHymn
};
