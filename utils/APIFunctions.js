const db = require("../content/db.json");

function getCategories() {
  return Object.entries(db.categories).map(([category, hymnIds]) => ({
    name: category,
    hymns: hymnIds.map(id => getHymnByNumber(id))
  }));
}
function getHymnByNumber(number) {
  return db.hymns[number] ? db.hymns[number] : false;
}
function getHymnsInCategory(category) {
  return Object.values(db.hymns).filter(hymn => {
    return category.toLowerCase() === hymn.category.toLowerCase();
  });
}
function searchHymn(searchTerm) {
  return Object.values(db.hymns).filter(({ title }) => {
    return title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
  });
}

module.exports = {
  getCategories,
  getHymnByNumber,
  getHymnsInCategory,
  searchHymn
};
