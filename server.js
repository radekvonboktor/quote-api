const express = require('express');
const app = express();
const {updateElement} = require('./utils.js');

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('./public'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
})

app.get('/api/quotes/random', (req, res, next) => {
    res.send({quote: getRandomElement(quotes)});
});

app.get('/api/quotes', (req, res, next) => {
    if (req.query.person) {
        const quoteToReturn = quotes.filter((quote) => quote.person === req.query.person);
        res.send({quotes: quoteToReturn});
    } else {
        res.send({quotes: quotes});
    }
});

app.post('/api/quotes', (req, res, next) => {
    const objToCreate = req.query;

    if (objToCreate) {
        quotes.push(objToCreate);
        res.send({quote: objToCreate});
    } else {
        res.status(400);
    }
});

app.put('/api/quotes/:id', (req, res, next) => {
    const idToUpdate = req.params.id;
    if (idToUpdate <= quotes.length - 1 && idToUpdate >= 0) {
        res.send({quote: updateElement(idToUpdate, req.query, quotes)});
    } else {
        res.status(404).send(`Quote with ID: ${req.params.id} not found!`);
    }
})

app.delete('/api/quotes/:id', (req, res, next) => {
    const getIndexToDelete = quotes.findIndex((quote) => quote.id === Number(req.params.id));
    if (getIndexToDelete !== -1) {
        quotes.splice(getIndexToDelete, 1);
        res.status(204).send();
    } else {
        res.status(404).send(`Quote with ID: ${req.params.id} not found!`);
    }
})