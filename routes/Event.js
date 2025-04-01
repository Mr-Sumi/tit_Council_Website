let express= require('express');

let app= express();

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
  
  app.get('/stall',  (req, res) => {
    res.render('Anwesha Event/ENTERPRENEURSHIP SALES STALL', { title: 'Stall Page' });
  });
  
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


    
app.get('/Quiz', (req, res) => {
  res.render('Anwesha Event/Technical Quiz', { title: 'Quiz Page' });
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

module.exports = app