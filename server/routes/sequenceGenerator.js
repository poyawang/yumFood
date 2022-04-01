var Sequence = require('../models/sequence');

var maxRecipeId;
var maxShopId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .exec(function(err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      sequenceId = sequence._id;
      maxRecipeId = sequence.maxRecipeId;
      maxShopId = sequence.maxShopId;
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'recipes':
      maxRecipeId++;
      updateObject = {maxRecipeId: maxRecipeId};
      nextId = maxRecipeId;
      break;
    case 'shops':
      maxShopId++;
      updateObject = {maxShopId: maxShopId};
      nextId = maxShopId;
      break;
    default:
      return -1;
  }

  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();
