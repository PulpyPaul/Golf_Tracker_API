const models = require('../models');
const GolfCard = models.GolfCard;

const makerPage = (req, res) => {
  GolfCard.GolfCardModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), golfCards: docs });
  });
};

const makeGolfCard = (req, res) => {
  if (!req.body.courseName || !req.body.score) {
    return res.status(400).json({ error: 'Both course name and score are required' });
  }

  const golfCardData = {
    courseName: req.body.courseName,
    score: req.body.score,
    owner: req.session.account._id,
  };

  const newGolfCard = new GolfCard.GolfCardModel(golfCardData);

  const golfCardPromise = newGolfCard.save();

  golfCardPromise.then(() => res.json({ redirect: '/maker' }));

  golfCardPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Card already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return golfCardPromise;
};

module.exports.makerPage = makerPage;
module.exports.make = makeGolfCard;
