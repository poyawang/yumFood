const express = require('express'); //import express
const router = express.Router(); //import the router
const sequenceGenerator = require('./sequenceGenerator'); //import sequence gen

const Shop = require('../models/shop'); //import shop model

//utility function to return errors
function returnError(res, error) {
  res.status(500).json({
    message: 'An error occurred',
    error: error
  });
}

//GET the list of shops in the shops collection in the database.
router.get('/', (req, res, next) => {
  //retrieve all shops
  Shop.find()
    .then(shops => {
      //send scucessful response with mssage and shops
      res.status(200).json(
        shops
      );

    })
    .catch(error => {
      //return error if something happens
      returnError(res, error);
    });
}
);

//POST route to adding a shop to database
router.post('/', (req, res, next) => {
  //call sequence generator to get unique id
  const maxShopId = sequenceGenerator.nextId("shops");

  //create new shop
  const shop = new Shop({
    id: maxShopId,
    foodName: req.body.foodName,
    foodImg: req.body.foodImg,
    subject: req.body.subject,
    price: req.body.price,
    location: req.body.location,
    size: req.body.size,
  });

  //save shop to database
  shop.save()
    .then(createdShop => {
      //send successful response with message and new shop added
      res.status(201).json({
        message: 'Shop added successfully',
        shop: createdShop
      });
    })
    .catch(error => {
      //return error if something happens
      returnError(res, error);
    });
});

//Route to UPDATE a shop in the database
router.put('/:id', (req, res, next) => {
  //find shop with specific id passed on parameter
  Shop.findOne({ id: req.params.id })
    .then(shop => {
      //re assign values with those coming from request
      shop.foodName = req.body.foodName;
      shop.foodImg = req.body.foodImg;
      shop.subject = req.body.subject;
      shop.price = req.body.price;
      shop.location = req.body.location;
      shop.size = req.body.size;

      //update entire shop
      Shop.updateOne({ id: req.params.id }, shop)
        .then(result => {
          //send successful response
          res.status(204).json({
            message: 'Shop updated successfully'
          })
        })
        .catch(error => {
          //return error in case something happens
          returnError(res, error);
        });
    })
    .catch(error => {
      //respnse with error if not found
      res.status(500).json({
        message: 'Shop not found.',
        error: { shop: 'Shop not found' }
      });
    });
});

//Route to DELETE shop from database
router.delete("/:id", (req, res, next) => {
  //find shop by id
  Shop.findOne({ id: req.params.id })
    .then(shop => {
      //delete such shop
      Shop.deleteOne({ id: req.params.id })
        .then(result => {
          //response with succesful message
          res.status(204).json({ message: "Shop deleted successfully" });
        })
        .catch(error => {
          //return error if something happened
          returnError(res, error);
        })
    })
    .catch(error => {
      //return error if something happened
      returnError(res, error);
    });
});

module.exports = router;
