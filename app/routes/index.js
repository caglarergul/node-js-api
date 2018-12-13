const articleRoutes = require("./article_routes");

module.exports = function(app, db) {
  articleRoutes(app, db);
};
