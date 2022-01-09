describe('Form', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.contains('Login').click()
        cy.get('#email').type(Cypress.env('dataAdminUser'))
        cy.get('#password').type(Cypress.env('dataAdminPassword'))
        cy.get('#login').click()
        cy.contains('Driver Types').click()
    })

    it('tries to submit with data', () => {
        cy.get('#code').type('DriverType:2')
        cy.get('#description').type('One driver type')
        cy.contains('Submit').click()
        cy.contains('Driver type successfully created.')
    })

    it('tries to sumbit empty data', () => {
        cy.contains('Submit').click()
        cy.contains('The code already exists.')
    })

    it('tries to sumbit same code', () => {
        cy.get('#code').type('DriverType:1')
        cy.get('#description').type('One driver type')       
        cy.contains('Submit').click()
        cy.contains('The code already exists.')
    })

})