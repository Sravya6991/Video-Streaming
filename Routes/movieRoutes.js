const express = require("express");
const router = express.Router();
const moviesController = require("../controller/movieController");
const showController = require('../controller/showController');

router.get("/", showController.home);
router.get("/moviesList", moviesController.movies);
router.get("/showsList", showController.allShows);

router.get("/:id", moviesController.selectedMovie);
router.get("/showsList/:id", showController.metaData);
router.get("/video/:id", showController.videoStream);


module.exports = router