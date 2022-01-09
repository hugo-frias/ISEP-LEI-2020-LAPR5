describe('Form', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.contains('Login').click()
        cy.get('#email').type(Cypress.env('dataAdminUser'))
        cy.get('#password').type(Cypress.env('dataAdminPassword'))
        cy.get('#login').click()
        cy.contains('Path Nodes').click()
    })

    it('tries to submit with data', () => {
        cy.get('#duration').type(120)
        cy.get('#distance').type(12333)
        cy.get('#node').click().contains('CRIST').click()
        cy.contains('Submit').click()
        cy.contains('Path Node created successfully.')
    })

    it('tries to submit with invalid data', () => {
      cy.get('#duration').type(-10)
        cy.contains('Submit').click()
      cy.contains('Error creating Path Node.')
    })
})