const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const _ = require('underscore');

let GolfCardModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const GolfCardSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  holes: {
    type: Object,
    required: true,
    number: [
      {
        par: Number,
        score: Number,
        yards: Number,
      },
    ],
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

GolfCardSchema.statics.toAPI = (doc) => ({
  courseName: doc.courseName,
  holes: doc.holes,
});

GolfCardSchema.statics.findByOwner = (ownerID, callback) => {
  const search = {
    owner: convertId(ownerID),
  };

  return GolfCardModel.find(search).select('courseName holes').exec(callback);
};

GolfCardModel = mongoose.model('GolfCard', GolfCardSchema);

module.exports.GolfCardModel = GolfCardModel;
module.exports.GolfCardSchema = GolfCardSchema;
