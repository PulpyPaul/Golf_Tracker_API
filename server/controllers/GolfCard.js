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
  if (!req.body.courseName) {
    return res.status(400).json({ error: 'Course Name is required' });
  }

  for (let i = 1; i < 2; i++) {
    if (!`req.body.hole${i}Yards`) {
      return res.status(400).json({ error: 'All yard measurements are requried' });
    }
    if (!`req.body.hole${i}Score`) {
      return res.status(400).json({ error: 'All scores are requried' });
    }
  }

  const holesObj = {
    number: [],
  };

  for (let i = 0; i < 18; i++) {
    holesObj.number.push({
      par: `req.body.hole${i}Par`,
      yards: `req.body.hole${i}Yards`,
      score: `req.body.hole${i}Score`,
    });
  }

  const golfCardData = {
    courseName: req.body.courseName,
    holes: holesObj,
    owner: req.session.account._id,
  };

  const newGolfCard = new GolfCard.GolfCardModel(golfCardData);
    
  console.dir(newGolfCard);

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
