const http = require("http");
const express = require("express");
const session = require("express-session");
const validation = require("express-validation");
const compression = require("compression");
const bodyParser = require("body-parser");

const validators = require("./library/validators");

const html = require("./callbacks/html");
const json = require("./callbacks/json");
const auth = require("./callbacks/auth");
const messages = require("./callbacks/messages");

const errors = require("./constants/errors");

let app = express();
let api = express();

app.use(compression());
app.use(bodyParser.json());
app.use(session(
    {
        secret: "secret",
        resave: true,
        rolling: true,
        saveUninitialized: false,
        unset: "destroy",
        cookie: {
            path: "/",
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        }
    }
));

app.get("/", html.main);
app.get("/sign-in", html.signIn);
app.use("/static", express.static(__dirname + "/static"));

app.use("/api", api);

api.post("/login", validation(validators.login), auth.login);

api.use((request, response, next) => {
    if (!request.session.username) {
        response.status(403).send(errors.FORBIDDEN);
    } else {
        next();
    }
});

api.get("/messages", validation(validators.messagesList), messages.list);
api.get("/messages/:id", validation(validators.messageGet), messages.get);
api.post("/messages", validation(validators.messageCreate), messages.create);

api.use((error, request, response, next) => {
    response.status(error.status).json({error: error.errors[0].messages[0]});
});

api.use(json.notFound);
app.use(html.notFound);

http.createServer(app).listen(8081);