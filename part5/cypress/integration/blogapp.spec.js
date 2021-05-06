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

    it('User can\'t delete blog that he didn\'t create', function() {
      cy.contains('log out').click();

      const user = {
        name: 'John Smith',
        username: 'john',
        password: 'passwd'
      };
      cy.request('POST', 'http://localhost:3003/api/users/', user);

      cy.login('john', 'passwd');

      // There is a strange bug that happens only with cypress. After adding a new blog the blog.user is not an object but an ID.
      // After refreshing with cy.visit everything is fine, blog.user is an object populated with mongoose. I have no idea why tho.
      cy.wait(1000);
      cy.visit('http://localhost:3000');

      cy.contains('view').click();
      cy.contains('Szymon Sz');
      cy.contains('remove').should('not.exist');
    });

    it('Blogs are ordered according to likes, with the blog with the most likes being first', function() {
      // wait to make sure that user is created
      cy.wait(2000);
      cy.newBlog({ title: 'Example Blog1', author: 'Example Author1', url: 'https://google1.com', likes: 37 });
      cy.newBlog({ title: 'Example Blog2', author: 'Example Author2', url: 'https://google2.com', likes: 13 });
      cy.newBlog({ title: 'Example Blog3', author: 'Example Author3', url: 'https://google3.com', likes: 88 });
      cy.visit('http://localhost:3000');

      const likesArray = [];

      const arraysMatch = (arr1, arr2) => {

        // Check if the arrays are the same length
        if (arr1.length !== arr2.length) return false;

        // Check if all items exist and are in the same order
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) return false;
        }

        // Otherwise, return true
        return true;
      };

      cy.get('.blog').each(blog => {
        cy.wrap(blog)
          .contains('view')
          .click();
      });

      cy.get('.number-of-likes').then((jQueryElement) => {
        for (const element of jQueryElement) {
          likesArray.push(Number(element.innerHTML));
        }

        const result = arraysMatch(
          likesArray,
          likesArray.sort((a, b) => b - a)
        );

        expect(result).equals(true);
      });
    });
  });
});