const express = require('express'); //import express
const router = express.Router(); //import the router
const sequenceGenerator = require('./sequenceGenerator'); //import sequence gen

const Recipe = require('../models/recipe'); //import recipe model

//utility function to return errors
function returnError(res, error) {
  res.status(500).json({
    message: 'An error occurred',
    error: error
  });
}

//GET the list of recipes in the recipes collection in the database.
router.get('/', (req, res, next) => {
  //retrieve all recipes
  Recipe.find()
    .then(recipes => {
      //send scucessful response with mssage and recipes
      res.status(200).json(
        recipes
      );

    })
    .catch(error => {
      //return error if something happens
      returnError(res, error);
    });
}
);

//POST route to adding a recipe to database
router.post('/', (req, res, next) => {
  //call sequence generator to get unique id
  const maxRecipeId = sequenceGenerator.nextId("recipes");

  //create new recipe
  const recipe = new Recipe({
    id: maxRecipeId,
    foodName: req.body.foodName,
    country: req.body.country,
    foodImg: req.body.foodImg,
    subject: req.body.subject,
    ingredients: req.body.ingredients,
    description: req.body.description,
  });

  //save recipe to database
  recipe.save()
    .then(createdRecipe => {
      //send successful response with message and new recipe added
      res.status(201).json({
        message: 'Recipe added successfully',
        recipe: createdRecipe
      });
    })
    .catch(error => {
      //return error if something happens
      returnError(res, error);
    });
});

//Route to UPDATE a recipe in the database
router.put('/:id', (req, res, next) => {
  //find recipe with specific id passed on parameter
  Recipe.findOne({ id: req.params.id })
    .then(recipe => {
      //re assign values with those coming from request
      recipe.foodName = req.body.foodName;
      recipe.country = req.body.country;
      recipe.foodImg = req.body.foodImg;
      recipe.subject = req.body.subject;
      recipe.ingredients = req.body.ingredients;
      recipe.description = req.body.description;

      //update entire recipe
      Recipe.updateOne({ id: req.params.id }, recipe)
        .then(result => {
          //send successful response
          res.status(204).json({
            message: 'Recipe updated successfully'
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
        message: 'Recipe not found.',
        error: { recipe: 'Recipe not found' }
      });
    });
});

//Route to DELETE recipe from database
router.delete("/:id", (req, res, next) => {
  //find recipe by id
  Recipe.findOne({ id: req.params.id })
    .then(recipe => {
      //delete such recipe
      Recipe.deleteOne({ id: req.params.id })
        .then(result => {
          //response with succesful message
          res.status(204).json({ message: "Recipe deleted successfully" });
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
