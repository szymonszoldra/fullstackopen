// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('setup', function() {
  cy.request('POST', 'http://localhost:3003/api/testing/reset');
  const user = {
    name: 'Szymon Sz',
    username: 'szymon',
    password: 'passwd'
  };
  cy.request('POST', 'http://localhost:3003/api/users/', user);
});

Cypress.Commands.add('addExampleBlog', function() {
  cy.contains('new blog').click();

  cy.get('input[name="Title"]').type('Overreacted');
  cy.get('input[name="Author"]').type('Dan Abramov');
  cy.get('input[name="Url"]').type('http://overreacted.io');

  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('login', function(username, password) {
  cy.get('input[name="Username"]').type(username);
  cy.get('input[name="Password"]').type(password);
  cy.contains('login').click();
});