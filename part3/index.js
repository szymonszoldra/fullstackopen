require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person');

const app = express();

app.use(cors());
app.use(express.json());
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '));

app.use(express.static('build'));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-53223523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-2345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  },
];

app.get('/api/persons', async (request, response, next) => {
  try {
    const persons = await Person.find({});
    response.json(persons);
  } catch (e) {
    next(e);
  }
});

app.get('/info', async (request, response, next) => {
  try {
    const time = new Date();
    const length = await Person.countDocuments({});
    response.send(`<p>Phonebook has info for ${length} people</p><p>${time.toGMTString()}</p>`);
  } catch (e) {
    next(e);
  }
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', async (request, response) => {
  try {
    await Person.findByIdAndRemove(request.params.id);
    const persons = await Person.find({});
    response.json(persons);
  } catch (e) {
    console.log(error, e);
  }
});

app.post('/api/persons', async (request, response) => {
  const {name, number} = request.body;

  if (!name || !name?.length || !number || !number?.length) {
    response.status(404).send({ error: 'parameter missing' })
  } else {
    const person = new Person({ name, number });
    await person.save();
    const persons = await Person.find({});
    response.json(persons);  
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } 

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});