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
      cy.addExampleBlog();
    });

    it('A blog can be created', function() {
      cy.contains('Szymon Sz logged in');

      // Moved logic to beforeEach, test is still valid tho.
      cy.get('.positive')
        .should('contain', 'added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.contains('new blog');
      cy.contains('Dan Abramov');
      cy.visit('http://localhost:3000');
    });

    it('User can like a blog', function() {
      cy.contains('view').click();
      cy.contains('likes 0');
      cy.contains('like').click();
      cy.contains('likes 1');
    });

    it('User can delete blog that he created', function() {
      cy.visit('http://localhost:3000');
      cy.contains('view').click();
      cy.contains('Dan Abramov');
      cy.contains('remove').click();
      cy.contains('Dan Abramov').should('not.exist');
    });

    it.only('User can\'t delete blog that he didn\'t create', function() {
      cy.contains('log out').click();

      const user = {
        name: 'John Smith',
        username: 'john',
        password: 'passwd'
      };
      cy.request('POST', 'http://localhost:3003/api/users/', user);

      cy.login('john', 'passwd');

      // There is a strange bug that happens only with cypress that after adding a new blog the blog.user is not an object but an ID
      // after refreshing with cy.visit everything is fine, blog.user is an object populated with mongoose. I have no idea why tho.
      cy.wait(1000);
      cy.visit('http://localhost:3000');

      cy.contains('view').click();
      cy.contains('Szymon Sz');
      cy.contains('remove').should('not.exist');
    });
  });
});