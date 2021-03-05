const express = require('express');
const router = express.Router();
const controller = require('../../controllers');
const passport = require('passport')
const multer = require('multer');
const upload = multer();

router.get('/', (req, res) => {
  console.log('route / req session >>> ', req.session);
  res.render('index');
});

router.post('/login', upload.none(), (req, res, next) => {
  
  passport.authenticate('local', function(err, user) {
    if (err) { return next(err); }
    if (!user) { return res.send('incorrect email or password!'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send('adm_OK');
    });
  })(req, res, next);
});

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/');
  }
}

router.get('/admin', auth, (req, res) => {
  res.render('admin');
})

router.get('/logout', auth, (req, res) => {
  console.log('LOGOUT>>');
  req.logOut();
  res.redirect('/');
})


module.exports = router;  