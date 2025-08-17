let express = require('express');
const events = require("../data/event.data");
let app = express();

app.get('/:eventName', (req, res) => {
  const eventName = req.params.eventName.toLowerCase();
  const event = events.eventdetail.find(e => e.event_name?.toLowerCase().replace(/\s/g, "") === eventName);

  if (event) {
    res.render('dynamic/event', {event});
  } else {
    res.status(404).send('Event not found');
  }
});

module.exports = app