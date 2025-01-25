const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('./public'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
})

app.get('/api/quotes/random', (req, res, next) => {
    res.send(getRandomElement(quotes));
});

app.get('/api/quotes', (req, res, next) => {
    if (req.query.person) {
        const quoteToReturn = quotes.filter((quote) => quote.person === req.query.person);
        res.send(quoteToReturn);
    } else {
        res.send(quotes);
    }
});

app.post('/api/quotes', (req, res, next) => {
    const objToCreate = req.query;

    if (objToCreate) {
        quotes.push(objToCreate);
        res.send(objToCreate);
    } else {
        res.status(400);
    }
});