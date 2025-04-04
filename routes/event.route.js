let express = require('express');
const events = require("../data/event.data");
let app = express();

app.get('/:eventName', (req, res) => {
  const eventName = req.params.eventName.toLowerCase();
  const event = events.eventdetail.find(e => e.event_name?.toLowerCase() === eventName);

  if (event) {
    res.render('event', { event });
  } else {
    res.status(404).send('Event not found');
  }
});

// app.get('/:eventName', (req, res) => {
//   const eventName = req.params.eventName.toLowerCase();
//   const event = events.find(event => event.name.toLowerCase() === eventName);
//   if (event) {
//     res.render('event', { event });
//   } else {
//     res.status(404).send('Events not found');
//   }
// });


app.get('/events',  (req, res) => {
    res.render('Anwesha Event/Carnival', { title: 'Event Page' });
  });
  
  // Event details route
  app.get('/eventcoding',  (req, res) => {
    res.render('Anwesha Event/codeclash', { title: 'Event Page' });
  });
  
  // Event details dance route
  
  app.get('/eventdance',  (req, res) => {
    res.render('Anwesha Event/flash Mob', { title: 'Event Page' });
  });
  
  app.get('/event',(req,res)=>{
      res.render('Events');
  })
  
  // Event details renewable route
  
  // Blog route (placeholder)
  app.get('/blog',  (req, res) => {
    res.send('Blog page coming soon!');
  });
  
  app.get('/hackthon',  (req, res) => {
    res.render('Anwesha Event/UIovate(Hackthon)', { title: 'Hackthon Page' });
  });
  
  // musical chair route
  app.get('/chair',  (req, res) => {
    res.render('Anwesha Event/Musical Chair', { title: 'Musical Chair Page' });
  });
  
  app.get('/race',  (req, res) => {
    res.render('Anwesha Event/roborace', { title: 'race Page' });
  });
  
  app.get('/war',  (req, res) => {
    res.render('Anwesha Event/robowar', { title: 'war Page' });
  });
  
  app.get('/presentation',  (req, res) => {
    res.render('Anwesha Event/technical presentation', { title: 'Presentation Page' });
  })
  
  //Anwesha Event/Renewable Model Showcase.ejs route
  
  app.get('/modelshowcase',  (req, res) => {
    res.render('Anwesha Event/Renewable Model Showcase', { title: 'Model Showcase Page' });
  });
  
  app.get('/TEASERQUEST',  (req, res) => {
    res.render('Anwesha Event/Treasure Hunt', { title: 'TEASERQUEST Page' });
  })
  
  
  // Dumb Charades route
  
  app.get('/dumb', (req, res) => {
    res.render('Anwesha Event/Dumb Charades', { title: 'Dumb Charades Page' });
  });
  
  // open mic route
  
  app.get('/mic',  (req, res) => {
    res.render('Anwesha Event/Mic Drop', { title: 'Open Mic Page' });
  });
  
  //corporte event route
  
  app.get('/corporate',  (req, res) => {
    res.render('Anwesha Event/CORPORATE CHALLENGE SHOWDOWN', { title: 'Corporate Event Page' });
  });
  
  //stall route
  
  // app.get('/stall',  (req, res) => {
  //   res.render('Anwesha Event/ENTERPRENEURSHIP SALES STALL', { title: 'Stall Page' });
  // });
  
  // Escape Room Business Crisis route
  
  // running route
  
  app.get('/RelayRace',  (req, res) => {
    res.render('Anwesha Event/RelayRace', { title: 'Running Page' });
  });
  
  app.get('/tug',  (req, res) => {
    res.render('Anwesha Event/ArmWrestling', { title: 'Tug of War Page' });
  });
  
  //bgmi routes
  
  app.get('/bgmi',  (req, res) => {
    res.render('Anwesha Event/BGMI', { title: 'BGMI Page' });
  });
  
  // freefire route
  
  app.get('/freefire',  (req, res) => {
    res.render('Anwesha Event/Free Fire', { title: 'Freefire Page' });
  });

  app.get('/QalaSangam',  (req, res) => {
    res.render('Anwesha Event/Qala Sangam', { title: 'Freefire Page' });
  });

  app.get('/stall', (req, res) => {
    res.render('Anwesha Event/ENTERPRENEURSHIP SALES STALL', { title: 'Stall Page' });
  })


  

app.get('/ScreenToSpeech', (req, res) => {
  res.render('Anwesha Event/ScreenToSpeech', { title: 'ScreenToSpeech Page' });
})

app.get('/meme', (req, res) => {
  res.render('Anwesha Event/ENTERPRENEURSHIP SALES STALL', { title: 'ScreenToSpeech Page' });
})

app.get('/hoverhunt', (req, res) => {
  res.render('Anwesha Event/HoverHunt', { title: 'ScreenToSpeech Page' });
})

app.get('/SkyHighSnapandSolve', (req, res) => {
  res.render('Anwesha Event/SkyHighSnapandSolve', { title: 'SkyHigh Snap and Solve' });
})

app.get('/JammingSession', (req, res) => {
  res.render('Anwesha Event/Jamming Session', { title: 'Jamming Session' });
})

app.get('/BounceAndBurst', (req, res) => {
  res.render('Anwesha Event/Bounce&Burst', { title: 'Bounce and Burst' });
})

app.get('/PitchoPlay', (req, res) => {
  res.render('Anwesha Event/Pitch-o-Play', { title: 'Pitch-o-Play' });
})

app.get('/ArtByte', (req, res) => {
  res.render('Anwesha Event/ArtByte', { title: 'Art Byte' });
})

app.get('/TechnocratsGotTalent', (req, res) => {
  res.render('Anwesha Event/Technocrats Got Talent', { title: 'Technocrats Got Talent' });
})

app.get('/FunWithThingsAndThink', (req, res) => {
  res.render('Anwesha Event/Fun With Things', { title: 'Fun With Things And Think' });
})

app.get('/FilmyFrenzy', (req, res) => {
  res.render('Anwesha Event/Filmy Frenzy', { title: 'Filmy Frenzy' });
})

app.get('/FashionFusion', (req, res) => {
  res.render('Anwesha Event/Fashion Fusion', { title: 'Fashion Fusion' });
})

app.get('/SpinTheSpotlight', (req, res) => {
  res.render('Anwesha Event/Spin The Spotlight', { title: 'Spin The Spotlight' });
})

app.get('/BuzzQuest', (req, res) => {
  res.render('Anwesha Event/BuzzQuest', { title: 'Buzz Quest' });
})

app.get('/ChineseWishper', (req, res) => {
  res.render('Anwesha Event/ChineseWhisper', { title: 'Chinese Wishper' });
})

app.get('/Hackathon', (req, res) => {
  res.render('Anwesha Event/Hackathon', { title: 'Hackathon' });
})

app.get('/PixelPerfect', (req, res) => {
  res.render('Anwesha Event/PixelPerfect', { title: 'Pixel Perfect' });
})

app.get('/BattleOfWitz', (req, res) => {
  res.render('Anwesha Event/BattleOfWits', { title: 'Battle Of Witz' });
})

app.get('/MemeMania', (req, res) => {
  res.render('Anwesha Event/MemeMania', { title: 'Meme Mania' });
})

app.get('/MindGame', (req, res) => {
  res.render('Anwesha Event/MindGame', { title: 'Mind Game' });
})

app.get('/IGI2CovertStrike', (req, res) => {
  res.render('Anwesha Event/Igi', { title: 'IGI 2 - Covert Strike' });
})
module.exports = app