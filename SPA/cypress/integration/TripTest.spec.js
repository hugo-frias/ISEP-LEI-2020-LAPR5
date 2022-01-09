describe('Form', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.contains('Login').click()
        cy.get('#email').type(Cypress.env('dataAdminUser'))
        cy.get('#password').type(Cypress.env('dataAdminPassword'))
        cy.get('#login').click()
        cy.get('#btnTrips').click()
    })

    it('tries to submit one trip', () => {
        cy.get('#Code').type('Trip:1000')
        cy.get('#Line').click().contains("Paredes_Gandra").click()
        cy.get('#Path').click().contains("Path:8").click()
        cy.get('#leavingHourDate').click().contains('»').click()
        cy.contains('30').click()
        cy.get('#btnSubmit').click()
    })

    it('tries to submit many trips', () => {
        cy.contains('Add Trips').click()
        cy.get('#Line2').click().contains('Paredes_Gandra').click()
        cy.get('#hora').click().contains('»').click()
        cy.contains('30').click()
        cy.get('#Frequence').type("120")
        cy.get('#NrViagens').type('3')
        cy.get('#GoPath').click().contains("Path:8").click()
        cy.get('#PathVolta').click().contains("Path:8").click()
        cy.get('#btnSubmit2').click()
    })

    it('tries to submit with empty data', () => {
        cy.contains('Submit').click()
    })
})
