const express = require('express');
const expressHandlebars = require('express-handlebars');
const handlers = require("./lib/handlers");
const bodyParser = require('body-parser');

const app = express();

app.disable('x-powered-by');

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get('/', handlers.home);

app.get('/newsletter-signup', handlers.newsletterSignup);
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess);
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou);

app.use(handlers.notFound);

app.use(handlers.serverError);

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Express started on http://localhost:${port}; ` + `press Ctrl-C to terminate.`);
    });
} else {
    module.exports = app;
}