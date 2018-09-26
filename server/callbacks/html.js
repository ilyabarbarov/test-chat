let pug = require("pug");

module.exports = {
    main: (request, response) => {
        if (!request.session.username)
            response.redirect("/sign-in");
        else
            response.send(pug.renderFile(__dirname + "/../templates/index.pug", {}, null));
    },
    signIn: (request, response) => {
        response.send(pug.renderFile(__dirname + "/../templates/index.pug", {}, null));
    },
    notFound: (request, response) => {
        response.status(404).send(pug.renderFile(__dirname + "/../templates/errors/404.pug", {}, null));
    }
};