const express = require('express');
const expressHandlebars = require('express-handlebars');

const app = express();

app.engine('handlebars', expressHandlebars(
    {defaultLayout: 'main'}
));
app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('Home page');
});

app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('About page');
});

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.use((req, res, next, err) => {
    console.error(err.message);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(port, () => console.log(`Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`));