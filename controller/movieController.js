const MovieModel = require("../Models/movieModel")

async function movies(req,res) {
    const moviesList = await MovieModel.find({})
    return res.json(moviesList)
    // console.log(moviesList)
}

async function selectedMovie(req, res) {
    const movieId = req.params.id
    try{
        if(movieId) {
            const movieById = await MovieModel.find({id: movieId})
            return res.json(movieById)
        } 
    } catch(err) {
        throw err
    }
}

module.exports = {
    movies: movies,
    selectedMovie: selectedMovie
}