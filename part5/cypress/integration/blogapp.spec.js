describe('Blog app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Szymon Sz',
      username: 'szymon',
      password: 'passwd'
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
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
      cy.get('input[name="Username"]').type('szymon');
      cy.get('input[name="Password"]').type('passwd');
      cy.contains('login').click();

      cy.contains('Szymon Sz logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type('szymon');
      cy.get('input[name="Password"]').type('wrongpassword');
      cy.contains('login').click();

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
    });
  });
});