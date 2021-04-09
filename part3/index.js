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

app.get('/api/persons/:id', async (request, response, next) => {
  try {
    const person = await Person.findById(request.params.id );
    response.json(person);
  } catch (e) {
    next(e);
  }
});

app.delete('/api/persons/:id', async (request, response, next) => {
  try {
    await Person.findByIdAndRemove(request.params.id);
    const persons = await Person.find({});
    response.json(persons);
  } catch (e) {
    next(e)
  }
});

app.post('/api/persons', async (request, response, next) => {
  const {name, number} = request.body;

  if (!name || !name?.length || !number || !number?.length) {
    return response.status(400).send({ error: 'parameter missing' })
  };

  try {
    const person = new Person({ name, number });
    await person.save();
    const persons = await Person.find({});
    response.json(persons);  
  } catch (e) {
    next(e);
  }
});

app.put('/api/persons/:id', async (request, response, next) => {
  try {
    const {name, number} = request.body;

    if (!number.length) {
      return response.status(400).send({error: 'parameter missing' });
    }

    const person = {name, number};

    await Person.findByIdAndUpdate(request.params.id, person, {new: true, runValidators: true, context: 'query'});

    const persons = await Person.find({});
    response.json(persons);
  } catch (e) {
    next(e);
  }
  response.status(401).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});