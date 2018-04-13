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

const cardPage = (req, res) => {
  GolfCard.GolfCardModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('cardData', { csrfToken: req.csrfToken(), golfCards: docs });
  });
};

const infoPage = (req, res) => res.render('info', { csrfToken: req.csrfToken() });

const makeGolfCard = (req, res) => {
  if (!req.body.courseName) {
    return res.status(400).json({ error: 'Course Name is required' });
  }

  for (let i = 1; i < 19; i++) {
    if (!`req.body.hole${i}Yards`) {
      return res.status(400).json({ error: 'All yard measurements are requried' });
    }
    if (!`req.body.hole${i}Score`) {
      return res.status(400).json({ error: 'All scores are requried' });
    }
  }

  const holesObj = {
    number: [],
    parTotal: 0,
    yardsTotal: 0,
    scoreTotal: 0,
  };

  for (let i = 1; i < 19; i++) {
    const parIndex = `hole${i}Par`;
    const yardsIndex = `hole${i}Yards`;
    const scoreIndex = `hole${i}Score`;

    holesObj.parTotal += parseInt(`${req.body[parIndex]}`, 10);
    holesObj.yardsTotal += parseInt(`${req.body[yardsIndex]}`, 10);
    holesObj.scoreTotal += parseInt(`${req.body[scoreIndex]}`, 10);

    holesObj.number.push({
      par: `${req.body[parIndex]}`,
      yards: `${req.body[yardsIndex]}`,
      score: `${req.body[scoreIndex]}`,
    });
  }

  const golfCardData = {
    courseName: req.body.courseName,
    holes: holesObj,
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
module.exports.cardPage = cardPage;
module.exports.infoPage = infoPage;
