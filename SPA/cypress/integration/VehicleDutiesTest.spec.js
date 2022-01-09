describe('Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.get('#email').type('dataadm@gmail.com')
        cy.get('#password').type('12345')
        cy.get('#login').click()
        cy.contains('Vehicle Duties').click()
    })
    it('tries to submit with data', () => {
        cy.get('#code').type('12345678900987654321')
        cy.get('#name').type('serviço de viatura 15')
        cy.get(("div[class='circle-picker ']")).get("div[title='#f44336']").click();
        cy.contains('Submit').click()
    })
    it('tries to submit with empty data', () => {
        cy.get('#code').type('12345678900987654321')
        cy.contains('Submit').click()
        cy.contains('Error while creating Vehicle Duty.')
    })
})