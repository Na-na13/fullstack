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

  describe('When a blog is created,', function() {
    beforeEach(function() {
      cy.get('form').within(() => {
        cy.get('#username').type('testuser')
        cy.get('#password').type('password')
        cy.get('#login-button').click()
      })
      cy.contains('new blog').click()
      cy.get('form').within(() => {
        cy.get('#title').type('On Test Automation')
        cy.get('#author').type('Bas Dijkstra')
        cy.get('#url').type('https://www.ontestautomation.com/')
        cy.contains('create').click()
      })
    })
    it('it can be liked', function() {
      cy.contains('view').click()
      cy.contains('0 likes')
      cy.get('button').contains('like').click()
      cy.contains('1 like')
    })
    it('user who created the blog can remove the blog', function() {
      cy.reload()
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.on('window:confirm', () => true)
      cy.wait(5000) // wait for Notification not to exist
      //cy.get('.notification', { timeout: 5000 }).should('not.exist')
      cy.contains('On Test Automation').should('not.exist')
    })
    it('the remove button is visible only for user who created the blog', function() {
      cy.get('button'). contains('logout').click()
      cy.get('form').within(() => {
        cy.get('#username').type('anotherUser')
        cy.get('#password').type('password')
        cy.get('#login-button').click()
      })
      cy.contains('view').click()
      cy.get('button').contains('remove').should('not.exist')
    })
    it('blogs are sorted by the number of likes', function() {
      cy.contains('new blog').click()
      cy.get('form').within(() => {
        cy.get('#title').type('DevelopSense')
        cy.get('#author').type('Michael Bolton')
        cy.get('#url').type('https://developsense.com/')
        cy.contains('create').click()
      })
      cy.get('.blog').eq(0).contains('On Test Automation')
      cy.get('.blog').eq(1).contains('DevelopSense')

      cy.get('.blog').eq(1).within(() => {
        cy.contains('view').click()
        cy.get('button').contains('like').click()
      })
      cy.get('.blog').eq(0).contains('DevelopSense')
      cy.get('.blog').eq(1).contains('On Test Automation')

    })
  })
})
