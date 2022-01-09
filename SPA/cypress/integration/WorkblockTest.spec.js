describe('Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.get('#email').type('dataadm@gmail.com')
        cy.get('#password').type('12345')
        cy.get('#login').click()
        cy.get('#btnWorkBlocks').click()
    })
    it('tries to submit with data', () => {
        cy.get('#dataHora').click('left').contains('»').click()
        cy.contains('30').click()
        cy.get('#startNode').click().contains("BALTR").click()
        cy.get('#endNode').click().contains("CRIST").click()
        cy.get('#vehicleDuty').click().first().click()
        cy.get('#trips').click().first().click()
        cy.get('#numMaxBlocks').type('3')
        cy.get('#blockDuration').type('10')
        cy.get('#btnSubmit').click()
    })
    it('tries to submit empty data',() => {
        cy.get('#btnSubmit').click()
        cy.contains('The total amount of time of workblocks exceeds 24 hours!')
    })
})