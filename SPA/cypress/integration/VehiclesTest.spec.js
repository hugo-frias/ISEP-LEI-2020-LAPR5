describe('Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.get('#email').type('dataadm@gmail.com')
        cy.get('#password').type('12345')
        cy.get('#login').click()
        cy.contains('Vehicles').click()
    })
    it('tries to submit with data', () => {
        cy.get('#matricula').type('66-ZY-51')
        cy.get('#vin').type('12345678998765433')
        cy.get('#vehicleTypes').click().contains("teste").click()
        cy.get('#entryDate').click().contains('«').click()
        cy.contains('30').click()
        cy.contains('Submit').click()
    })
    it('tries to submit with empty data', () => {
        
        cy.contains('Submit').click()
        cy.contains('Error while creating Vehicle.')
    })
})