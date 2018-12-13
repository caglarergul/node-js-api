const customerRoutes = require('./customer_routes');

module.exports = function(app, db) {
    customerRoutes(app, db);
    // Other route groups could go here, in the future
};