const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  const allBeers = punkAPI.getBeers()
  allBeers.then(beer => {
  res.render('beers', {beer});
  })
  allBeers.catch((err => {
    res.send('Error');
  }))
});

app.get('/random-beer', (req, res) => {
  const randomBeer = punkAPI.getRandom()
  randomBeer.then(random => {
    res.render('random-beer', {random});
  })
  randomBeer.catch((err => {
    res.send('Error');
  }))
})


app.get('/beers/:id', (req, res) => {
  const beerId = req.params.id;
  const beerData = punkAPI.getBeer(beerId);
  beerData.then(theBeer => {
  res.render('beer-id', {theBeer})
  })
  beerData.catch((err => {
    res.send('Error')
  }))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
