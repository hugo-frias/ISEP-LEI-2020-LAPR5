describe('Form', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.contains('Login').click()
        cy.get('#email').type(Cypress.env('dataAdminUser'))
        cy.get('#password').type(Cypress.env('dataAdminPassword'))
        cy.get('#login').click()
        cy.contains('Driver Duties').click()
    })

    it('tries to submit with data', () => {
        cy.get('#code').type('DriverDuty:1000');
        cy.get('#name').type('Codigo');
        cy.get(("div[class='circle-picker ']")).get("div[title='#f44336']").click();
        cy.get('#workblocks').click().select().click();
        cy.contains('Submit').click();
    })


    it('tries to submit with empty data', () => {
        cy.get('#name')
            .type('empty')
        cy.contains('Submit').click()
        cy.contains('This name is incorrect or it already exists.')
    })
})