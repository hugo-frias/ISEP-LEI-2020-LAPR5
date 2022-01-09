describe('Form', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.contains('Login').click()
        cy.get('#email').type(Cypress.env('dataAdminUser'))
        cy.get('#password').type(Cypress.env('dataAdminPassword'))
        cy.get('#login').click()
    })

    it('tries to submit with data', () => {
        cy.contains('Lines').click()
        cy.get('#code').type('Line:1000')
        cy.contains('Check code').click()
        cy.contains('Código disponivel!').should('be.visible')
        cy.get('#name').type('line 1000')
        cy.get(("div[class='circle-picker ']")).get("div[title='#f44336']").click()
        cy.contains('Submit').click()
        cy.contains('Linha criada com sucesso!')
    })
})