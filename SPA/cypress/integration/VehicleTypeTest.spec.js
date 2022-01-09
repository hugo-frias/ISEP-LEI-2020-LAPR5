describe('Form', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.contains('Login').click()
        cy.get('#email').type(Cypress.env('dataAdminUser'))
        cy.get('#password').type(Cypress.env('dataAdminPassword'))
        cy.get('#login').click()
        cy.get('#btnVehicleTypes').click()
    })

    it('tries to submit data', () => {
        cy.get('#name').type('VehicleDuty:1')
        cy.get('#autonomy').type(12)
        cy.get('#avgSpeed').type(100)
        cy.get('#consumption').type(20)
        cy.get('#cost').type(1000)
        cy.get('#energy').select("Gasolina")
        cy.get('#energy').select("Gasóleo")
        cy.get('#emission').type(32)
        cy.contains('Submit').click()
        cy.contains('Tipo de Viatura criado com sucesso!')
    })

    it('tries to submit with empty data', () => {

        cy.contains('Submit').click()
        cy.contains('Erro ao criar o tipo de viatura!')
    })
})