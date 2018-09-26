const _ = require("lodash");

const errors = require("../constants/errors");

let lastId = 0;
let messages = [];

module.exports = {
    list: (request, response) => {
        let result = messages;
        if (request.query.last_id)
            result = _.takeRightWhile(messages, message => message.id > request.query.last_id);
        response.json(result);
    },
    get: (request, response) => {
        let message = _.find(messages, message => message.id === request.params.id);
        if (!message)
            return response.status(404).json(errors.MESSAGE_NOT_FOUND);

        response.json(message);
    },
    create: (request, response) => {
        messages.push({
            id: ++lastId,
            username: request.session.username,
            message: request.body.message
        });

        response.status(201).append("Location", request.originalUrl + "/" + lastId).send();
    }
};