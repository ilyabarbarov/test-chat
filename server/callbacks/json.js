const errors = require("../constants/errors");

module.exports = {
    notFound: (request, response) => {
        response.status(404).json(errors.ROUTE_NOT_FOUND);
    }
};