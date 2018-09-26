module.exports = {
    login: (request, response) => {
        request.session.username = request.body.username;
        response.send();
    }
};