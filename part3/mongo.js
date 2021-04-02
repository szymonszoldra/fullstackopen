const mongoose = require('mongoose');

if (process.argv.length != 5 && process.argv.length !== 3) {
  console.log('If you want to add number to the phonebook : node mongo.js <password> <name> <number>');
  console.log('If you just want to display the phonebook : node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen:${password}@cluster0.j1vjf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model('Contact', contactSchema);

if (process.argv.length === 3) {
  Contact.find({}).then( result => {
    console.log('phonebook:');

    result.forEach(({ name, number }) => {
      console.log(name, number);
    })

    mongoose.connection.close();
  })
} else {
  const name = process.argv[3];
  const number = process.argv[4];
  
  const contact = new Contact({ name, number });
  
  contact.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}

