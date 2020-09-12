let router = require('express').Router();
let homepageController = require('../controllers/HomepageController');
let authController = require('../controllers/AuthController');
let authValidator = require('../validators/AuthValidators');
let passport = require('passport');
let permits = require('../validators/permits');
let userController = require ('../controllers/userController');

router.get('/', homepageController.index);

// Authentication routes
router.get('/login', authController.login);
router.get('/register', authController.register);

router.get('/users', permits.Auth, permits.userAccess, userController.users);
router.get('/dashboard', permits.Auth, permits.dashboardAcc, userController.dashboard);



router.post('/register', authValidator.store, authController.store);

router.post('/login', passport.authenticate('local', { failureRedirect: '/login-fail', successRedirect: '/protected' }));
router.get('/protected', (req, res) => {
  res.send('Success');
});
router.get('/login-fail', (req, res) => {
  res.redirect("/register");
  //res.send('Failed');

});

module.exports = router;
