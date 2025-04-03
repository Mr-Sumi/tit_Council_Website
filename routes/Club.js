let express = require('express');
let app = express();
const clubs = require("../data/club.data").clubs; // Access the clubs array
const { isLoggedIn } = require("../middleware/isLoggedIn");

app.get('/:clubName', (req, res) => {
  const clubName = req.params.clubName.toLowerCase();
  console.log(clubName);

  const club = clubs.find(club => club.name.toLowerCase() === clubName); // Find the club by name
  console.log(club);

  if (club) {
    res.render('club', { club });
  } else {
    res.status(404).send('Club not found');
  }
});

module.exports = app;