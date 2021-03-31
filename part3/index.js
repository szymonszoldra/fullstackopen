const { response } = require('express');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

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

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, response) => {
  const time = new Date();
  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${time.toGMTString()}</p>`);
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

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const newPersons = persons.filter(person => person.id !== id);

  if (newPersons.length === persons.length) {
    response.status(404).end();
  } else {
    persons = newPersons;
    response.json(persons);
  }
});

app.post('/api/persons', (request, response) => {
  const id = Math.floor(Math.random() * 1000000);
  const {name, number} = request.body;
  const userExists = persons.filter(person => person.name.toLowerCase() === name.toLowerCase()).length;

  if (!name || !name?.length || !number || !number?.length) {
    response.status(404).send({ error: 'parameter missing' })
  } else if (userExists) {
    response.status(404).send({ error: 'user already in phonebook' })
  } else {
    persons.push({id, name, number});
    response.json(persons);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});