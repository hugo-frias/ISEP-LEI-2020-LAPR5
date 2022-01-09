describe('Form', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.contains('Login').click()
        cy.get('#email').type(Cypress.env('dataAdminUser'))
        cy.get('#password').type(Cypress.env('dataAdminPassword'))
        cy.get('#login').click()
        cy.contains('Line Paths').click()
    })

    it('tries to write with data', () => {
        cy.get('#code').type('LinePath:1000')
        cy.contains('Check Code').click()
        cy.get('#path').click().contains('Path:3').click()
        cy.get('#line').click().contains('Paredes_Gandra').click()
        cy.contains('Add to Line').click()
        cy.contains('Line Path criado com sucesso!')
    })

    it('tries to submit empty data', () => {
        cy.get('#code').type('LinePath:1000')
        cy.contains('Check Code').click()
        cy.contains('Code inválido!')
    })

})