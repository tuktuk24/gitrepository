const express = require('express')
const router = express.Router()
const Joi = require('joi')

const persons = [
    {
        id:1,
        name:'Raj'
    },
    {
        id:2,
        name:'Shyam'
    },
    {
        id:3,
        name:'Mohan'
    },
]

const validateInfo = (person) => {
    const schema = Joi.object(
        {
        name: Joi.string().min(3).required()
        }
    )
    const { error } = schema.validate(person)
    if (error) return res.status(400).send(error.details[0].message)
}

// define the home page route
router.get('/', (req, res) => {
  res.send(persons)
})
// define the about route
router.get('/:id', (req, res) => {
  const person = persons.find(c => c.id === parseInt(req.params.id))
  if (!person) return res.status(404).send("No Person of this name!")
  res.send(person)
})

router.post('/', (req,res) => {
    validateInfo(req.body)

    const person = {
        id : persons.length +1,
        name: req.body.name
    }
    persons.push(person)
    res.send(person)
})

router.put('/:id', (req,res) => {
    const person = persons.find(c => c.id === parseInt(req.params.id))
    if (!person) return res.status(404).send("Person Not Found!")
    
    validateInfo(req.body)

    person.name = req.body.name
    res.send(person)
})

router.delete('/:id', (req,res) => {
    const person = persons.find(c => c.id === parseInt(req.params.id))
    if (!person) return res.status(404).send("Person Not Found!")

    const index = persons.indexOf(person)
    persons.splice(index,1)

    res.send(person)
})

module.exports = router