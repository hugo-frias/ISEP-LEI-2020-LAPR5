describe('Form', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.contains('Login').click()
        cy.get('#email').type(Cypress.env('dataAdminUser'))
        cy.get('#password').type(Cypress.env('dataAdminPassword'))
        cy.get('#login').click()
        cy.contains('Drivers').click()
    })

    it('tries to submit with data', () => {
        cy.get('#mechanographicNumber').type('1180782DD')
        cy.get('#name').type('Diogo')
        cy.get('[id="dateBirth"]').click().contains('«').click()
        cy.contains('30').click()
        cy.get('#citizenCardNumber').type('12345678')
        cy.get('#NIF').type('123456789')
        cy.get('#drivingLicenseNumber').type('123456789')
        cy.get('[id="licenseExp"]').click().contains('31').click()
        cy.get('#driverTypes').click().contains("DriverType:1").click()
        cy.get('[id="entryDate"]').click().contains('10').click()
        cy.contains('Submit').click()
        cy.contains('Driver successfully created.')
    })

    it('tries to submit with empty data', () => {
        cy.get('#mechanographicNumber').type('1180782D')
        cy.contains('Submit').click()
        cy.contains("Mechanographic number shouldn't be null and have to match the criteria.")
    })
})