// custom commands can be found on /cypress/support/commands.js
describe('Blog app', function() {
  beforeEach(function () {
    cy.setup();
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.login('szymon', 'passwd');
      cy.contains('Szymon Sz logged in');
    });

    it('fails with wrong credentials', function() {
      cy.login('szymon', 'wrongpassword');

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login('szymon', 'passwd');
    });

    it('A blog can be created', function() {
      cy.contains('Szymon Sz logged in');

      cy.addExampleBlog();
      cy.get('.positive')
        .should('contain', 'added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.contains('new blog');
      cy.contains('Dan Abramov');
      cy.visit('http://localhost:3000');
    });
  });
});