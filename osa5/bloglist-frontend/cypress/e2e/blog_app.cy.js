describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('form').within(() => {
      cy.contains('username')
      cy.contains('password')
      cy.get('button').contains('login')
    })
  })

  describe('Login', function() {
    it('success with correct credentials', function() {
      cy.get('form').within(() => {
        cy.get('#username').type('testuser')
        cy.get('#password').type('password')
        cy.get('#login-button').click()
      })
      cy.contains('testuser is logged in')
    })

    it('fails with incorrect credentials', function() {
      cy.get('form').within(() => {
        cy.get('#username').type('aapeli')
        cy.get('#password').type('salasana')
        cy.get('#login-button').click()
      })
      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('form').within(() => {
        cy.get('#username').type('testuser')
        cy.get('#password').type('password')
        cy.get('#login-button').click()
      })
    })
    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('form').within(() => {
        cy.get('#title').type('On Test Automation')
        cy.get('#author').type('Bas Dijkstra')
        cy.get('#url').type('https://www.ontestautomation.com/')
        cy.contains('create').click()
      })
      cy.contains('new blog').should('be.visible')
      cy.contains('On Test Automation')
    })
  })
})