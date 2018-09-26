let joi = require("joi");

module.exports = {
    login: {
        body: {
            username: joi.string().max(32).required()
        }
    },
    messagesList: {
        query: {
            last_id: joi.number()
        }
    },
    messageGet: {
        params: {
            id: joi.number().required()
        }
    },
    messageCreate: {
        body: {
            message: joi.string().max(255).required()
        }
    }
};