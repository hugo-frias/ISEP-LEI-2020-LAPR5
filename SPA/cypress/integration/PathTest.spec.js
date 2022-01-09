describe('Form', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.contains('Login').click()
      cy.get('#email').type(Cypress.env('dataAdminUser'))
      cy.get('#password').type(Cypress.env('dataAdminPassword'))
      cy.get('#login').click()
      cy.get('#btnPaths').click()
      
    })

    it('tries to submit with data', () => {
        cy.get('#isEmpty').click()
        cy.get('#pathNodes').click().contains("PathNode:11").click()
        cy.get('#pathNodes').click().contains("PathNode:15").click()
        cy.contains('Submit').click()
        cy.contains('Path created successfully.')
    })

    it('tries to submit with empty data', () => {
  
      cy.contains('Submit').click()
      cy.contains('Error creating Path.')
    })
})