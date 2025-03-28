let express = require('express');
let app = express();
const { isLoggedIn } = require("../middleware/isLoggedIn");

app.get('/coding',isLoggedIn, (req, res) => {
  res.render('Coding club', { title: 'Coding Club Page' });
});
  
app.get('/Quiz',isLoggedIn, (req, res) => {
  res.render('Anwesha Event/Technical Quiz ', { title: 'Quiz Page' });
})
  
  // Drone Club route
app.get('/drone',isLoggedIn, (req, res) => {
  res.render('drone club',{ title: 'Drone Club Page' });
});
  
  // Media Fusion route
  app.get('/media',isLoggedIn, (req, res) => {
    res.render('mediafusion', { title: 'Media Fusion Page' });
  });
  
  // Cultural Club route
  app.get('/Cultrul',isLoggedIn, (req, res) => {
    res.render('Cultrul', { title: 'Cultural Club Page' });
  });
  
  // Robotics Club route
  app.get('/Robotics',isLoggedIn, (req, res) => {
    res.render('Robotics', { title: 'Robotics Club Page' });
  });
  
  // Entrepreneurship Club route
  app.get('/entrepreneurship',isLoggedIn, (req, res) => {
    res.render('entrepreneurship club', { title: 'Entrepreneurship Club Page' });
  });
  
  // Literary Club route
  app.get('/Literary',isLoggedIn, (req, res) => {
    res.render('Literary club', { title: 'Literary Club Page' });
  });
  
  // Renewable Energy route
  app.get('/Renewable',isLoggedIn, (req, res) => {
    res.render('Renewable energy', { title: 'Renewable Energy Page' });
  });
  
  // Discipline Club route
  app.get('/Disipline',isLoggedIn, (req, res) => {
    res.render('Disipline club', { title: 'Discipline Club Page' });
  });
  
  // Alumni Relation Club route
  app.get('/Alimni',isLoggedIn, (req, res) => {
    res.render('Alimni relation club', { title: 'Alumni Relation Club Page' });
  });
  
  // Tech Wizards route
  app.get('/Tech',isLoggedIn, (req, res) => {
    res.render('Tech wizards', { title: 'Tech Wizards Club Page' });
  });
  
  // EV Club route
  app.get('/EV',isLoggedIn, (req, res) => {
    res.render('EV',{ title: 'EV Club Page' });
  });
  
  // Music Club route
  app.get('/music',isLoggedIn, (req, res) => {
    res.render('music', { title: 'Music Club Page' });
  });
  
  // Dance Club route
  app.get('/Dance',isLoggedIn, (req, res) => {
    res.render('Dance', { title: 'Dance Club Page' });
  });
  
  // IEEE Student Chapter route
  app.get('/IEEE',isLoggedIn, (req, res) => {
    res.render('IEEE Student chapter', { title: 'IEEE Student Chapter Page' });
  });

  module.exports=app;