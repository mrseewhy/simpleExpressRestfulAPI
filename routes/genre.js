const express = require('express');
const router = express.Router()
const Joi = require("@hapi/joi")

const genres = [{id:1,genre:"Action"}, {id:2,genre:"Horror"}, {id:3,genre:"Thriller"}]

router.get('/', (req,res) =>{
    res.send(genres)
})

router.get("/:id", (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(genre) return res.send(genre)
    else return res.status(404).send("<h1 style='text-align:center'>Page Not Found</h1>")
})

router.post('/', (req, res) => {
    // const result = validateInput(req.body.genre)
    const { error } = validateInput(req.body.genre)
    if(error) return res.send(error.details[0].message)

    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }
    genres.push(genre)
    res.send(genre)
})

router.put("/:id", (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("<h1 style='text-align:center'>Page Not Found</h1>")
    const { error } = validateInput(req.body.genre)
    if(error) return res.send(error.details[0].message)
    genre.genre = req.body.genre;
    res.send(genre)

})

router.delete("/:id", (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("<h1 style='text-align:center'>Page Not Found</h1>")
    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    res.send(genre)
})

function validateInput(genre){
    const schema = Joi.object({
        genre: Joi.string().alphanum().min(3).max(10).required()
    })
    return schema.validate({genre})
}

module.exports = router