const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/maker', mid.requiresLogin, controllers.GolfCard.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.GolfCard.make);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.get('/cards', mid.requiresLogin, controllers.GolfCard.cardPage);
  app.get('/info', mid.requiresSecure, controllers.GolfCard.infoPage);
  app.get('/*', mid.requiresSecure, mid.requiresLogout, controllers.Account.notFoundPage);
};

module.exports = router;
